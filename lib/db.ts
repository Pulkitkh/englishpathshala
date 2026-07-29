/**
 * Lead storage.
 *
 * Two drivers, picked automatically:
 *   1. Postgres  — used when DATABASE_URL is set (Neon, Supabase, Railway,
 *                  Vercel Postgres…). This is what you want in production,
 *                  because serverless hosts have a read-only filesystem.
 *   2. JSON file — the zero-config fallback, at ./data/leads.json. Great for
 *                  local development and for a normal VPS. On Vercel/Netlify
 *                  it degrades gracefully: the write fails silently, the lead
 *                  is still emailed / sent to your webhook, and the visitor is
 *                  still handed off to WhatsApp.
 */

import { promises as fs } from 'fs';
import path from 'path';
import type { Pool } from 'pg';

export type LeadStatus = 'new' | 'contacted' | 'enrolled' | 'dropped';

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  program: string;
  level: string;
  goal: string | null;
  preferredTime: string | null;
  source: string | null;
  status: LeadStatus;
  notes: string | null;
  createdAt: string;
};

export type NewLead = Omit<Lead, 'id' | 'status' | 'notes' | 'createdAt'>;

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

export const usingPostgres = Boolean(process.env.DATABASE_URL);

/* ------------------------------------------------------------------ */
/* Postgres driver                                                     */
/* ------------------------------------------------------------------ */

let poolPromise: Promise<Pool> | null = null;

async function getPool(): Promise<Pool> {
  if (!poolPromise) {
    poolPromise = (async () => {
      const { Pool: PgPool } = await import('pg');
      const pool = new PgPool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DATABASE_SSL === 'disable' ? false : { rejectUnauthorized: false },
        max: 3,
      });
      await pool.query(`
        CREATE TABLE IF NOT EXISTS leads (
          id             TEXT PRIMARY KEY,
          name           TEXT NOT NULL,
          phone          TEXT NOT NULL,
          email          TEXT,
          program        TEXT NOT NULL,
          level          TEXT NOT NULL,
          goal           TEXT,
          preferred_time TEXT,
          source         TEXT,
          status         TEXT NOT NULL DEFAULT 'new',
          notes          TEXT,
          created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);
      await pool.query(`CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);`);
      return pool;
    })();
  }
  return poolPromise;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function rowToLead(row: any): Lead {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    program: row.program,
    level: row.level,
    goal: row.goal,
    preferredTime: row.preferred_time,
    source: row.source,
    status: row.status as LeadStatus,
    notes: row.notes,
    createdAt: new Date(row.created_at).toISOString(),
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/* ------------------------------------------------------------------ */
/* JSON file driver                                                    */
/* ------------------------------------------------------------------ */

async function readFileLeads(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(LEADS_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Lead[]) : [];
  } catch {
    return [];
  }
}

async function writeFileLeads(leads: Lead[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8');
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

function newId(): string {
  return `lead_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export async function createLead(input: NewLead): Promise<Lead> {
  const lead: Lead = {
    ...input,
    id: newId(),
    status: 'new',
    notes: null,
    createdAt: new Date().toISOString(),
  };

  if (usingPostgres) {
    const pool = await getPool();
    await pool.query(
      `INSERT INTO leads (id, name, phone, email, program, level, goal, preferred_time, source, status, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [
        lead.id,
        lead.name,
        lead.phone,
        lead.email,
        lead.program,
        lead.level,
        lead.goal,
        lead.preferredTime,
        lead.source,
        lead.status,
        lead.createdAt,
      ],
    );
    return lead;
  }

  const leads = await readFileLeads();
  leads.unshift(lead);
  await writeFileLeads(leads);
  return lead;
}

export async function listLeads(): Promise<Lead[]> {
  if (usingPostgres) {
    const pool = await getPool();
    const { rows } = await pool.query('SELECT * FROM leads ORDER BY created_at DESC LIMIT 1000');
    return rows.map(rowToLead);
  }
  return readFileLeads();
}

export async function updateLead(
  id: string,
  patch: { status?: LeadStatus; notes?: string | null },
): Promise<Lead | null> {
  if (usingPostgres) {
    const pool = await getPool();
    const { rows } = await pool.query(
      `UPDATE leads
          SET status = COALESCE($2, status),
              notes  = COALESCE($3, notes)
        WHERE id = $1
        RETURNING *`,
      [id, patch.status ?? null, patch.notes ?? null],
    );
    return rows[0] ? rowToLead(rows[0]) : null;
  }

  const leads = await readFileLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return null;
  leads[index] = {
    ...leads[index],
    status: patch.status ?? leads[index].status,
    notes: patch.notes !== undefined ? patch.notes : leads[index].notes,
  };
  await writeFileLeads(leads);
  return leads[index];
}

export async function deleteLead(id: string): Promise<boolean> {
  if (usingPostgres) {
    const pool = await getPool();
    const res = await pool.query('DELETE FROM leads WHERE id = $1', [id]);
    return (res.rowCount ?? 0) > 0;
  }

  const leads = await readFileLeads();
  const next = leads.filter((l) => l.id !== id);
  if (next.length === leads.length) return false;
  await writeFileLeads(next);
  return true;
}
