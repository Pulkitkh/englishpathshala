import { faqs, programs } from '@/lib/content';
import { site } from '@/lib/site';

/**
 * Schema.org markup so Google can show the FAQ dropdown, the course list and
 * the business details in search results.
 */
export function StructuredData() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': `${site.url}#organization`,
        name: site.name,
        url: site.url,
        description: site.description,
        logo: `${site.url}/logo.svg`,
        telephone: site.phoneDisplay,
        email: site.email,
        sameAs: [site.socials.instagram, site.socials.youtube, site.socials.facebook].filter(Boolean),
        founder: { '@type': 'Person', name: site.founder, jobTitle: site.founderRole },
        areaServed: { '@type': 'Country', name: 'India' },
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}#website`,
        url: site.url,
        name: site.name,
        publisher: { '@id': `${site.url}#organization` },
        inLanguage: 'en-IN',
      },
      ...programs.map((program) => ({
        '@type': 'Course',
        name: program.title,
        description: program.blurb,
        provider: { '@id': `${site.url}#organization` },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          courseWorkload: program.duration,
        },
      })),
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Content is authored by us in lib/content.ts, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }}
    />
  );
}
