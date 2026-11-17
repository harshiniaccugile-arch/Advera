/**
 * Policy content for /policies/[slug].
 *
 * Inline markup supported inside any text string:
 *   **bold**            -> <strong>
 *   [label](https://x)  -> link (external links open in a new tab)
 *   [label](mailto:x@y) -> mail link
 *
 * REPLACE the COMPANY values below with Advera's real details before publishing.
 */

export const COMPANY = {
    name: 'Advera',
    legalName: 'Advera Brands', // TODO: registered legal entity name
    website: 'www.advera.com', // TODO: confirm production domain
    privacyEmail: 'privacy@advera.example', // TODO
    supportEmail: 'hello@advera.example', // TODO
    address: 'Your registered business address', // TODO
    phone: '+91 99437 98451', // TODO
    jurisdiction: 'Tamil Nadu, India', // TODO: e.g. "Tamil Nadu, India"
    lastUpdated: 'November 17, 2026',
} as const;

export type Block =
    | { type: 'p'; text: string }
    | { type: 'h3'; text: string }
    | { type: 'ul'; items: string[] }
    | {
        type: 'callout';
        tone: 'green' | 'grey';
        title: string;
        text?: string;
        items?: string[];
    };

export type Section = {
    id: string;
    heading: string;
    blocks: Block[];
};

export type Policy = {
    slug: string;
    title: string;
    /** Label used in the sidebar */
    label: string;
    description: string;
    intro: string[];
    sections: Section[];
};

const contactCallout = (
    title: string,
    email: string,
    includeAddress = true,
): Block => ({
    type: 'callout',
    tone: 'grey',
    title,
    items: [
        `**${COMPANY.legalName}**`,
        `Website: [${COMPANY.website}](https://${COMPANY.website})`,
        `Email: [${email}](mailto:${email})`,
        ...(includeAddress ? [`Business Address: ${COMPANY.address}`] : []),
    ],
});

/* -------------------------------------------------------------------------- */
/*  PRIVACY POLICY                                                            */
/* -------------------------------------------------------------------------- */

const privacy: Policy = {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    label: 'Privacy Policy',
    description: `How ${COMPANY.name} collects, uses, shares and protects your personal information.`,
    intro: [
        `At **${COMPANY.legalName}**, we believe that trust is the foundation of every successful relationship. We are committed to protecting your privacy and ensuring that your personal information is handled responsibly, transparently, and securely.`,
        `This Privacy Policy explains how ${COMPANY.legalName} ("we," "our," or "us") collects, uses, stores, and protects information when you visit our website, communicate with us, or engage with our branding, design, and creative services.`,
        'By using our website, you acknowledge the practices described in this Privacy Policy.',
    ],
    sections: [
        {
            id: 'information-we-collect',
            heading: '1. Information We Collect',
            blocks: [
                {
                    type: 'p',
                    text: 'We may collect personal information that you voluntarily provide when contacting us, submitting an inquiry, requesting a quotation, or engaging our services.',
                },
                { type: 'p', text: 'This information may include:' },
                {
                    type: 'ul',
                    items: [
                        'Full name and business name',
                        'Email address and telephone number',
                        'Company information and website details',
                        'Project requirements, creative briefs, and design preferences',
                        'Billing and payment-related information',
                        'Other information you choose to share with us',
                    ],
                },
                {
                    type: 'p',
                    text: 'We may also automatically collect certain technical information, including your IP address, browser type, device information, operating system, referring website, pages visited, and general website usage patterns.',
                },
            ],
        },
        {
            id: 'how-we-use-your-information',
            heading: '2. How We Use Your Information',
            blocks: [
                {
                    type: 'p',
                    text: 'We collect and process information to provide a seamless, personalized, and professional experience.',
                },
                { type: 'p', text: 'Your information may be used to:' },
                {
                    type: 'ul',
                    items: [
                        'Respond to inquiries and communicate about potential projects',
                        'Provide branding, graphic design, packaging design, and other creative services',
                        'Prepare quotations, proposals, contracts, and invoices',
                        'Manage ongoing client relationships and project communications',
                        'Improve our website, services, and overall user experience',
                        'Send relevant business updates or marketing communications where permitted',
                        'Maintain website security and prevent unauthorized activity',
                        'Comply with applicable legal and regulatory obligations',
                    ],
                },
                {
                    type: 'p',
                    text: 'We do not sell your personal information to third parties.',
                },
            ],
        },
        {
            id: 'legal-basis',
            heading: '3. Legal Basis for Processing Information',
            blocks: [
                {
                    type: 'p',
                    text: 'Where applicable data protection laws require a legal basis, we process personal information based on one or more of the following:',
                },
                {
                    type: 'ul',
                    items: [
                        'Your consent',
                        'The performance of a contract or steps taken before entering into a contract',
                        'Compliance with legal obligations',
                        'Our legitimate business interests, provided these do not override your rights and freedoms',
                    ],
                },
            ],
        },
        {
            id: 'sharing-of-information',
            heading: '4. Sharing of Information',
            blocks: [
                {
                    type: 'p',
                    text: `${COMPANY.legalName} respects the confidentiality of your information.`,
                },
                {
                    type: 'p',
                    text: 'We may share relevant information with trusted third-party service providers who assist us with website hosting, analytics, business communications, payment processing, project management, and other essential operations.',
                },
                {
                    type: 'p',
                    text: 'Such providers are expected to handle information appropriately and in accordance with applicable data protection requirements.',
                },
                {
                    type: 'p',
                    text: 'We may also disclose information when required by law, legal proceedings, or legitimate regulatory requests.',
                },
            ],
        },
        {
            id: 'data-security',
            heading: '5. Data Security',
            blocks: [
                {
                    type: 'p',
                    text: 'We take reasonable technical and organizational measures to protect personal information against unauthorized access, alteration, disclosure, loss, or misuse.',
                },
                {
                    type: 'p',
                    text: 'Although we strive to maintain appropriate security standards, no internet-based transmission or electronic storage system can be guaranteed to be completely secure.',
                },
            ],
        },
        {
            id: 'data-retention',
            heading: '6. Data Retention',
            blocks: [
                {
                    type: 'p',
                    text: 'We retain personal information only for as long as reasonably necessary to fulfill the purposes outlined in this Privacy Policy, maintain business records, resolve disputes, or comply with applicable legal obligations.',
                },
                {
                    type: 'p',
                    text: 'Retention periods may vary depending on the nature of the information, our contractual relationships, and legal requirements.',
                },
            ],
        },
        {
            id: 'cookies-and-tracking',
            heading: '7. Cookies and Tracking Technologies',
            blocks: [
                {
                    type: 'p',
                    text: 'Our website may use cookies and similar technologies to improve functionality, understand visitor interactions, and enhance the browsing experience.',
                },
                {
                    type: 'p',
                    text: 'For additional information about the types of cookies we use and how to manage your preferences, please refer to our [Cookie Policy](/policies/cookies-policy).',
                },
            ],
        },
        {
            id: 'your-privacy-rights',
            heading: '8. Your Privacy Rights',
            blocks: [
                {
                    type: 'p',
                    text: 'Depending on your location and applicable laws, you may have the right to:',
                },
                {
                    type: 'ul',
                    items: [
                        'Request access to personal information we hold about you',
                        'Request correction of inaccurate or incomplete information',
                        'Request deletion of personal information',
                        'Object to or restrict certain processing activities',
                        'Withdraw consent where processing is based on consent',
                        'Request portability of your information where applicable',
                        'Lodge a complaint with a relevant data protection authority',
                    ],
                },
                {
                    type: 'p',
                    text: 'To exercise your rights, please contact us using the details provided below. We will respond in accordance with applicable legal requirements.',
                },
            ],
        },
        {
            id: 'third-party-websites',
            heading: '9. Third-Party Websites',
            blocks: [
                {
                    type: 'p',
                    text: 'Our website may contain links to third-party websites, platforms, or services.',
                },
                {
                    type: 'p',
                    text: `${COMPANY.legalName} is not responsible for the privacy practices, content, or security of external websites. We encourage visitors to review the privacy policies of third-party websites before sharing personal information.`,
                },
            ],
        },
        {
            id: 'childrens-privacy',
            heading: "10. Children's Privacy",
            blocks: [
                {
                    type: 'p',
                    text: 'Our website and services are intended primarily for businesses and individuals seeking professional branding and creative services.',
                },
                {
                    type: 'p',
                    text: 'We do not knowingly collect personal information from children in violation of applicable laws. If we become aware that such information has been collected improperly, we will take appropriate steps to delete it.',
                },
            ],
        },
        {
            id: 'changes',
            heading: '11. Changes to This Privacy Policy',
            blocks: [
                {
                    type: 'p',
                    text: 'We may update this Privacy Policy periodically to reflect changes in our business operations, website functionality, or legal requirements.',
                },
                {
                    type: 'p',
                    text: 'Any updates will be published on this page with a revised effective date.',
                },
            ],
        },
        {
            id: 'contact',
            heading: '12. Contact Us',
            blocks: [
                {
                    type: 'p',
                    text: 'If you have questions about this Privacy Policy or how your information is handled, please contact:',
                },
                contactCallout('Privacy enquiries', COMPANY.privacyEmail),
            ],
        },
    ],
};

/* -------------------------------------------------------------------------- */
/*  TERMS & CONDITIONS                                                        */
/* -------------------------------------------------------------------------- */

const terms: Policy = {
    slug: 'terms-and-conditions',
    title: 'Terms & Conditions',
    label: 'Terms and Conditions',
    description: `The terms that govern your use of the ${COMPANY.name} website and services.`,
    intro: [
        `Welcome to **${COMPANY.legalName}**.`,
        'We are a creative branding and design company dedicated to transforming ideas into distinctive, meaningful, and memorable brand experiences.',
        'These Terms & Conditions govern your use of our website and, where applicable, your engagement with our branding, graphic design, packaging design, brand strategy, and other creative services.',
        `By accessing our website or engaging our services, you agree to comply with these Terms & Conditions, subject to any separate written agreement between you and ${COMPANY.legalName}.`,
    ],
    sections: [
        {
            id: 'our-services',
            heading: '1. Our Services',
            blocks: [
                {
                    type: 'p',
                    text: `${COMPANY.legalName} provides creative and branding solutions that may include:`,
                },
                {
                    type: 'ul',
                    items: [
                        'Brand strategy and brand positioning',
                        'Logo design and visual identity development',
                        'Packaging and product design',
                        'Graphic design and marketing collateral',
                        'Brand guidelines and creative direction',
                        'Digital branding and social media design',
                        'Other customized creative and design services',
                    ],
                },
                {
                    type: 'p',
                    text: 'The specific scope, deliverables, timeline, and pricing of each project will be communicated through a quotation, proposal, contract, or other written agreement.',
                },
            ],
        },
        {
            id: 'project-engagement',
            heading: '2. Project Engagement',
            blocks: [
                {
                    type: 'p',
                    text: 'A project is considered formally accepted when both parties agree to the relevant scope, commercial terms, and project requirements.',
                },
                {
                    type: 'p',
                    text: `Depending on the nature of the engagement, ${COMPANY.legalName} may require a signed agreement, written approval, or advance payment before commencing work.`,
                },
                {
                    type: 'p',
                    text: 'Any additional services or modifications outside the agreed scope may be subject to revised pricing and timelines.',
                },
            ],
        },
        {
            id: 'client-responsibilities',
            heading: '3. Client Responsibilities',
            blocks: [
                {
                    type: 'p',
                    text: 'Clients are expected to provide accurate, complete, and timely information necessary for the successful execution of their projects.',
                },
                {
                    type: 'p',
                    text: 'This may include brand information, content, references, logos, product details, design specifications, and feedback.',
                },
                {
                    type: 'p',
                    text: `Clients are responsible for ensuring that materials supplied to ${COMPANY.legalName} are lawfully owned or appropriately licensed for the intended use.`,
                },
                {
                    type: 'p',
                    text: 'Delays in providing necessary information, approvals, or feedback may affect the project schedule.',
                },
            ],
        },
        {
            id: 'payments-and-billing',
            heading: '4. Payments and Billing',
            blocks: [
                {
                    type: 'p',
                    text: 'Project fees, payment schedules, advance payments, and applicable taxes will be specified in the relevant quotation, invoice, or agreement.',
                },
                { type: 'p', text: 'Unless otherwise agreed in writing:' },
                {
                    type: 'ul',
                    items: [
                        'Work may commence only after the required advance payment is received.',
                        'Payments must be made according to the agreed schedule.',
                        'Additional work outside the approved scope may incur additional charges.',
                        'Final deliverables may be withheld until outstanding project payments are settled.',
                    ],
                },
                {
                    type: 'p',
                    text: 'Any late-payment charges, where applicable, will be governed by the relevant written agreement and applicable law.',
                },
            ],
        },
        {
            id: 'revisions-and-approvals',
            heading: '5. Revisions and Design Approvals',
            blocks: [
                {
                    type: 'p',
                    text: 'Our creative process is built around collaboration, thoughtful exploration, and clear communication.',
                },
                {
                    type: 'p',
                    text: 'The number of revisions included in a project will be outlined in the approved proposal or agreement.',
                },
                {
                    type: 'p',
                    text: 'Requests for substantial redesigns, new creative directions, or modifications beyond the agreed revision allowance may be treated as additional work and charged separately.',
                },
                {
                    type: 'p',
                    text: 'Once a design or deliverable has been formally approved, subsequent changes may require additional fees and adjustments to the delivery schedule.',
                },
            ],
        },
        {
            id: 'timelines-and-delivery',
            heading: '6. Project Timelines and Delivery',
            blocks: [
                {
                    type: 'p',
                    text: `${COMPANY.legalName} makes reasonable efforts to complete projects within the agreed timelines.`,
                },
                {
                    type: 'p',
                    text: 'However, delivery schedules may be affected by delayed client feedback, changes in project scope, third-party dependencies, technical issues, or circumstances beyond our reasonable control.',
                },
                {
                    type: 'p',
                    text: 'Any significant changes to the anticipated schedule will be communicated to the client.',
                },
            ],
        },
        {
            id: 'intellectual-property',
            heading: '7. Intellectual Property and Ownership',
            blocks: [
                {
                    type: 'p',
                    text: `All original concepts, preliminary designs, sketches, presentations, and creative materials developed by ${COMPANY.legalName} remain the intellectual property of ${COMPANY.legalName} unless otherwise agreed in writing.`,
                },
                {
                    type: 'p',
                    text: 'Upon receipt of full payment, the client will receive the ownership or usage rights expressly specified in the applicable project agreement.',
                },
                {
                    type: 'p',
                    text: `Unless explicitly included in the agreement, ownership of unused concepts, preliminary designs, working files, templates, design systems, and proprietary creative processes remains with ${COMPANY.legalName}.`,
                },
                {
                    type: 'p',
                    text: 'Third-party assets, including stock photography, fonts, illustrations, software, and licensed resources, remain subject to their respective licensing conditions.',
                },
                {
                    type: 'p',
                    text: 'Clients are responsible for obtaining any necessary trademark registration or legal clearance for their chosen brand names, logos, and identities unless those services are expressly included in the project scope.',
                },
            ],
        },
        {
            id: 'portfolio-and-promotional-usage',
            heading: '8. Portfolio and Promotional Usage',
            blocks: [
                {
                    type: 'p',
                    text: `Unless otherwise agreed in writing, ${COMPANY.legalName} may display completed and publicly released projects in its portfolio, website, social media channels, presentations, and promotional materials.`,
                },
                {
                    type: 'p',
                    text: 'We will respect written confidentiality obligations and any agreed restrictions concerning unpublished or commercially sensitive work.',
                },
            ],
        },
        {
            id: 'confidentiality',
            heading: '9. Confidentiality',
            blocks: [
                {
                    type: 'p',
                    text: 'We recognize the importance of protecting confidential business information, brand strategies, product concepts, and other sensitive materials shared during a project.',
                },
                {
                    type: 'p',
                    text: 'Both parties are expected to treat confidential information responsibly and avoid unauthorized disclosure, subject to applicable legal obligations and any separate confidentiality agreement.',
                },
            ],
        },
        {
            id: 'cancellation-and-refunds',
            heading: '10. Cancellation and Refunds',
            blocks: [
                {
                    type: 'p',
                    text: 'Project cancellation and refund eligibility will depend on the stage of work completed, the resources committed, and the terms agreed upon before commencement.',
                },
                { type: 'p', text: 'Unless otherwise specified in writing:' },
                {
                    type: 'ul',
                    items: [
                        'Clients may request cancellation through written communication.',
                        'Fees corresponding to completed work and non-cancellable commitments remain payable.',
                        'Any eligible refund will be calculated based on the agreed commercial terms and applicable law.',
                        'Completed or approved project stages may not qualify for refunds.',
                    ],
                },
                {
                    type: 'p',
                    text: 'Any statutory cancellation or refund rights will remain unaffected.',
                },
            ],
        },
        {
            id: 'website-content-and-copyright',
            heading: '11. Website Content and Copyright',
            blocks: [
                {
                    type: 'p',
                    text: `All original content published on the ${COMPANY.legalName} website, including text, graphics, visual identities, layouts, illustrations, images, and creative presentations, is owned by or licensed to ${COMPANY.legalName} unless otherwise stated.`,
                },
                {
                    type: 'p',
                    text: 'Unauthorized copying, reproduction, distribution, modification, or commercial use of protected website materials is prohibited without prior written permission, except where permitted by law.',
                },
            ],
        },
        {
            id: 'third-party-services',
            heading: '12. Third-Party Services',
            blocks: [
                {
                    type: 'p',
                    text: 'Certain projects may require third-party services such as printing, manufacturing, hosting, stock assets, or external software.',
                },
                {
                    type: 'p',
                    text: `${COMPANY.legalName} is not responsible for the independent actions, service interruptions, or performance of third-party providers beyond obligations expressly agreed upon in writing or imposed by applicable law.`,
                },
                {
                    type: 'p',
                    text: 'Additional third-party costs may apply and will be communicated where relevant.',
                },
            ],
        },
        {
            id: 'limitation-of-liability',
            heading: '13. Limitation of Liability',
            blocks: [
                {
                    type: 'p',
                    text: `${COMPANY.legalName} endeavors to provide professional, high-quality creative services.`,
                },
                {
                    type: 'p',
                    text: 'However, to the extent permitted by applicable law, we do not guarantee specific commercial outcomes, including increased sales, market recognition, customer acquisition, or business growth resulting from our design services.',
                },
                {
                    type: 'p',
                    text: 'Any contractual limitations of liability will be governed by the relevant written agreement and applicable law.',
                },
                {
                    type: 'p',
                    text: 'Nothing in these Terms excludes or limits liability that cannot legally be excluded or restricted.',
                },
            ],
        },
        {
            id: 'website-availability',
            heading: '14. Website Availability',
            blocks: [
                {
                    type: 'p',
                    text: 'We strive to maintain an accessible, secure, and functional website.',
                },
                {
                    type: 'p',
                    text: 'However, we do not guarantee uninterrupted availability or that all website content will be free from technical errors.',
                },
                {
                    type: 'p',
                    text: 'We reserve the right to modify, suspend, or discontinue website features when reasonably necessary.',
                },
            ],
        },
        {
            id: 'changes',
            heading: '15. Changes to Services and Terms',
            blocks: [
                {
                    type: 'p',
                    text: `${COMPANY.legalName} may update its website, service offerings, and these Terms & Conditions from time to time.`,
                },
                {
                    type: 'p',
                    text: 'Updated terms will be published on this page with a revised effective date.',
                },
                {
                    type: 'p',
                    text: 'Changes to an existing signed project agreement will require the approval or process specified in that agreement.',
                },
            ],
        },
        {
            id: 'governing-law',
            heading: '16. Governing Law and Dispute Resolution',
            blocks: [
                {
                    type: 'p',
                    text: `These Terms & Conditions will be governed by the laws of ${COMPANY.jurisdiction}, subject to mandatory legal protections that may apply.`,
                },
                {
                    type: 'p',
                    text: 'Any disputes arising from the use of our website or services will be addressed in accordance with applicable law and any agreed dispute-resolution provisions in the relevant contract.',
                },
            ],
        },
        {
            id: 'contact',
            heading: '17. Contact Information',
            blocks: [
                {
                    type: 'p',
                    text: 'For questions regarding these Terms & Conditions, our services, or project agreements, please contact:',
                },
                contactCallout('Questions about these Terms?', COMPANY.supportEmail),
            ],
        },
    ],
};

/* -------------------------------------------------------------------------- */
/*  COOKIES POLICY                                                            */
/* -------------------------------------------------------------------------- */

const cookies: Policy = {
    slug: 'cookies-policy',
    title: 'Cookies Policy',
    label: 'Cookies Policy',
    description: `How ${COMPANY.name} uses cookies and similar technologies, and how you can control them.`,
    intro: [
        `At ${COMPANY.legalName}, we are committed to delivering an intuitive, engaging, and efficient browsing experience. Our website may use cookies and similar technologies to support essential functionality, understand website performance, and improve how visitors interact with our content.`,
        'This Cookie Policy explains what cookies are, how we use them, and how you can manage your preferences.',
    ],
    sections: [
        {
            id: 'what-are-cookies',
            heading: '1. What Are Cookies?',
            blocks: [
                {
                    type: 'p',
                    text: 'Cookies are small text files stored on your computer, smartphone, or other device when you visit a website.',
                },
                {
                    type: 'p',
                    text: 'They help websites remember certain information, recognize returning visitors, maintain preferences, and understand how users interact with online content.',
                },
                {
                    type: 'p',
                    text: 'Cookies may be temporary, lasting only for the duration of your browsing session, or persistent, remaining on your device until they expire or are deleted.',
                },
            ],
        },
        {
            id: 'how-we-use-cookies',
            heading: '2. How We Use Cookies',
            blocks: [
                {
                    type: 'p',
                    text: `${COMPANY.legalName} may use cookies and similar technologies to:`,
                },
                {
                    type: 'ul',
                    items: [
                        'Ensure the website operates correctly and securely',
                        'Remember user preferences and settings',
                        'Understand website traffic and visitor behavior',
                        'Identify technical issues and improve performance',
                        'Enhance navigation and overall user experience',
                        'Evaluate the effectiveness of marketing activities, where applicable',
                    ],
                },
            ],
        },
        {
            id: 'types',
            heading: '3. Types of Cookies We May Use',
            blocks: [
                { type: 'h3', text: 'Essential Cookies' },
                {
                    type: 'p',
                    text: 'These cookies are necessary for the website to function properly. They support fundamental features such as security, navigation, and form functionality.',
                },
                {
                    type: 'p',
                    text: 'Disabling essential cookies may affect the operation of certain website features.',
                },
                { type: 'h3', text: 'Analytics and Performance Cookies' },
                {
                    type: 'p',
                    text: 'These cookies help us understand how visitors interact with our website, including which pages are visited, how visitors navigate between pages, and whether technical issues occur.',
                },
                {
                    type: 'p',
                    text: 'The information collected helps us evaluate and improve website performance.',
                },
                { type: 'h3', text: 'Functional Cookies' },
                {
                    type: 'p',
                    text: 'Functional cookies allow our website to remember certain choices or preferences, providing a more consistent and personalized experience.',
                },
                { type: 'h3', text: 'Marketing and Advertising Cookies' },
                {
                    type: 'p',
                    text: 'Where implemented, marketing cookies may help us measure advertising effectiveness, understand campaign performance, and deliver relevant promotional content.',
                },
                {
                    type: 'p',
                    text: 'These cookies may be placed by third-party advertising or analytics providers.',
                },
            ],
        },
        {
            id: 'third-party',
            heading: '4. Third-Party Cookies',
            blocks: [
                {
                    type: 'p',
                    text: 'Certain website features or integrations may involve cookies provided by external services.',
                },
                {
                    type: 'p',
                    text: 'These may include analytics platforms, embedded media, social media integrations, or marketing tools.',
                },
                {
                    type: 'p',
                    text: 'Third-party providers are responsible for their own cookie practices, subject to applicable laws and agreements.',
                },
            ],
        },
        {
            id: 'managing',
            heading: '5. Managing Your Cookie Preferences',
            blocks: [
                {
                    type: 'p',
                    text: 'You can manage or delete cookies through your browser settings.',
                },
                { type: 'p', text: 'Most browsers allow you to:' },
                {
                    type: 'ul',
                    items: [
                        'View stored cookies',
                        'Block specific categories of cookies',
                        'Delete existing cookies',
                        'Restrict cookies from particular websites',
                        'Receive notifications when cookies are being stored',
                    ],
                },
                {
                    type: 'p',
                    text: 'Please note that disabling certain cookies may affect website functionality or your browsing experience.',
                },
                {
                    type: 'p',
                    text: 'Where required by applicable law, we will request your consent before placing non-essential cookies and provide a means to manage or withdraw that consent.',
                },
            ],
        },
        {
            id: 'retention',
            heading: '6. Cookie Retention',
            blocks: [
                {
                    type: 'p',
                    text: 'The duration for which cookies remain on your device depends on their purpose and configuration.',
                },
                {
                    type: 'p',
                    text: 'Session cookies generally expire when you close your browser, while persistent cookies remain until their specified expiration date or until you delete them.',
                },
            ],
        },
        {
            id: 'changes',
            heading: '7. Updates to This Cookie Policy',
            blocks: [
                {
                    type: 'p',
                    text: 'We may revise this Cookie Policy periodically to reflect changes in website technologies, third-party integrations, or applicable privacy regulations.',
                },
                {
                    type: 'p',
                    text: 'The latest version will always be available on this page.',
                },
            ],
        },
        {
            id: 'contact',
            heading: '8. Contact Us',
            blocks: [
                {
                    type: 'p',
                    text: 'For questions about our use of cookies or related privacy practices, please contact:',
                },
                contactCallout('Questions about cookies?', COMPANY.privacyEmail, false),
            ],
        },
    ],
};

/* -------------------------------------------------------------------------- */

/** Order here is the order shown in the sidebar. */
export const POLICIES: Policy[] = [privacy, terms, cookies];

export const getPolicy = (slug: string): Policy | undefined =>
    POLICIES.find((p) => p.slug === slug);