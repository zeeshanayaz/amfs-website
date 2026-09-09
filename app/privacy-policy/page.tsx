import type { Metadata } from 'next'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { PageHeading } from '@/components/ui/page-heading'
import { ScrollToTop } from '@/components/scroll-to-top'

export const metadata: Metadata = {
    title: 'Privacy Policy | Al Musleh Foundation School',
    description: 'Learn how Al Musleh Foundation School collects, uses, and protects information shared through its website.',
}

const sections = [
    {
        title: '1. About this policy',
        paragraphs: [
            'Al Musleh Foundation School ("AMFS", "we", "our", or "us") respects the privacy of students, parents and guardians, staff, applicants, and website visitors. This Privacy Policy explains how we handle information collected through the AMFS website and related online forms.',
            'By using this website, you acknowledge the practices described in this policy. This policy applies to information collected online; additional notices may apply to information collected as part of school admission, enrolment, employment, or other on-campus processes.',
        ],
    },
    {
        title: '2. Information we collect',
        paragraphs: [
            'We may collect information that you choose to provide, including your name, email address, telephone number, message details, admission enquiries, job application information, and any documents or other information you submit through the website.',
            'We may also collect limited technical information when you visit the website, such as your IP address, browser type, device information, pages viewed, and general usage data. This information helps us operate, secure, and improve the website.',
        ],
    },
    {
        title: '3. How we use information',
        paragraphs: [
            'We use information to respond to enquiries, process admissions and employment applications, provide requested services, communicate school updates where appropriate, maintain website security, understand website usage, and meet our legal and administrative responsibilities.',
            'We only use personal information for purposes connected with the reason it was provided or for another legitimate school purpose that is reasonably compatible with that reason.',
        ],
    },
    {
        title: '4. When we share information',
        paragraphs: [
            'We do not sell or rent personal information. We may share information with trusted service providers that help us operate the website, manage forms, host content, or provide technical services. These providers may process information only as needed to perform their services for AMFS.',
            'We may also disclose information when required by law, to protect the rights and safety of our students and community, or to prevent fraud, abuse, or a security threat.',
        ],
    },
    {
        title: '5. Cookies and analytics',
        paragraphs: [
            'This website may use cookies or similar technologies to remember preferences, support essential functionality, and understand how visitors use the website. Where analytics services are enabled, the resulting information is used in aggregated or otherwise appropriate form to improve the website.',
            'You can manage cookies through your browser settings. Disabling some cookies may affect the availability or functionality of parts of the website.',
        ],
    },
    {
        title: '6. Retention and security',
        paragraphs: [
            'We retain personal information only for as long as reasonably necessary for the purpose for which it was collected, to maintain appropriate records, or to meet legal and operational requirements.',
            'We use reasonable administrative, technical, and organisational safeguards to protect personal information. No online transmission or storage system can be guaranteed to be completely secure, so please take care when sharing information online.',
        ],
    },
    {
        title: '7. Children\'s information',
        paragraphs: [
            'Because AMFS is a school, we may process information about students as part of admissions, education, safeguarding, and school administration. Where a student is under the applicable age of consent, information should be submitted by a parent or legal guardian or with their involvement.',
            'Please contact us if you believe a child has submitted personal information through the website without appropriate permission so that we can review and address the request.',
        ],
    },
    {
        title: '8. Your choices and rights',
        paragraphs: [
            'Depending on applicable law, you may have the right to ask what personal information we hold about you, request correction of inaccurate information, ask us to delete information where appropriate, or withdraw consent for a particular use. Some records may need to be retained for legal or school administration purposes.',
            'To make a privacy request, please email contact@amfs.edu.pk. We may need to verify your identity before completing a request.',
        ],
    },
    {
        title: '9. External links',
        paragraphs: [
            'The website may link to third-party websites or services. Those websites have their own privacy practices, and AMFS is not responsible for their content or handling of personal information. We encourage you to review their privacy notices before providing information.',
        ],
    },
    {
        title: '10. Updates to this policy',
        paragraphs: [
            'We may update this Privacy Policy when our practices, services, or legal obligations change. The updated version will be posted on this page with a revised effective date. Please review this page periodically for the latest information.',
        ],
    },
]

export default function PrivacyPolicy() {
    return (
        <>
            <Navbar />
            <main id="main-content" className="bg-brand-off-white text-brand-navy">
                <PageHeading
                    eyebrow="Your privacy matters"
                    title="Privacy Policy"
                    description="How Al Musleh Foundation School collects, uses, and protects information shared through our website."
                />
                <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
                    <div className="w-full">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Effective date: September 9, 2026</p>
                        {/* <h2 className="mt-3 font-serif text-4xl font-bold">A simple admissions process</h2>
                        <p className="mt-4 text-brand-dark-gray leading-7">Our team is here to make each step clear, personal, and welcoming.</p> */}
                        <div className="mt-8 grid gap-9">
                            {sections.map((section) => (
                                <article key={section.title}>
                                    <h2 className="mt-3 font-serif text-4xl font-bold">{section.title}</h2>
                                    <div className="mt-3 grid gap-3 text-base leading-7 text-brand-dark-gray">
                                        {section.paragraphs.map((paragraph) => (
                                            <p key={paragraph}>{paragraph}</p>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                        <div className="mt-10 border-t border-brand-border pt-6 text-sm leading-6 text-brand-dark-gray">
                            <p className="font-bold text-brand-navy">Al Musleh Foundation School</p>
                            <a className="text-brand-royal hover:text-brand-navy" href="mailto:contact@amfs.edu.pk">contact@amfs.edu.pk</a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <ScrollToTop />
        </>
    )
}