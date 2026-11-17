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
    tagline: 'Branding & Creative Design',
    website: 'www.advera.com', // TODO: confirm production domain
    privacyEmail: 'privacy@adverabranding.com', // TODO
    supportEmail: 'hello@adverabranding.com', // TODO
    address: 'Your registered business address', // TODO
    country: 'India', // TODO: country of registration
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

/**
 * Contact block. `full` adds the tagline, registered address and country
 * (used by Privacy and Terms). The Cookies policy uses the short version.
 */
const contactCallout = (
    title: string,
    email: string,
    full = true,
): Block => ({
    type: 'callout',
    tone: 'grey',
    title,
    items: [
        `**${COMPANY.legalName}**`,
        ...(full ? [COMPANY.tagline] : []),
        `Website: [${COMPANY.website}](https://${COMPANY.website})`,
        `Email: [${email}](mailto:${email})`,
        ...(full
            ? [
                `Registered Address: ${COMPANY.address}`,
                `Country: ${COMPANY.country}`,
            ]
            : []),
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
        `${COMPANY.legalName} ("${COMPANY.legalName}," "we," "us," or "our") recognizes the importance of protecting the privacy, confidentiality, and personal information of individuals who visit our website, communicate with our team, or engage with our professional services.`,
        `As a branding and creative design company, we work with businesses, entrepreneurs, organizations, and individuals to develop distinctive brand identities, visual communications, packaging solutions, and creative experiences. Throughout these interactions, we may receive information relating to our clients, prospective clients, collaborators, suppliers, job applicants, and website visitors.`,
        'We are committed to handling this information responsibly, maintaining appropriate safeguards, and providing transparency regarding how personal information is collected, processed, stored, used, and disclosed.',
        `This Privacy Policy explains our practices concerning personal information collected through our website, digital communication channels, business relationships, and other interactions with ${COMPANY.legalName}.`,
        'We encourage you to read this Privacy Policy carefully to understand our approach to privacy and the choices available to you regarding your personal information.',
    ],
    sections: [
        {
            id: 'scope',
            heading: '1. Scope of This Privacy Policy',
            blocks: [
                {
                    type: 'p',
                    text: `This Privacy Policy applies to personal information collected or processed by ${COMPANY.legalName} in connection with:`,
                },
                {
                    type: 'ul',
                    items: [
                        'Visits to and interactions with our official website.',
                        'Inquiries submitted through website contact forms, email, telephone, or other communication channels.',
                        'Requests for proposals, quotations, consultations, and creative services.',
                        'Existing and prospective client relationships.',
                        'Branding, graphic design, packaging design, and other creative projects.',
                        'Communications with business partners, vendors, contractors, and collaborators.',
                        'Applications for employment, internships, or freelance opportunities.',
                        'Subscriptions to newsletters, promotional communications, or other updates, where offered.',
                        'Participation in meetings, presentations, consultations, and business events.',
                    ],
                },
                {
                    type: 'p',
                    text: 'This Privacy Policy does not govern websites, applications, platforms, or services operated independently by third parties, even where links to those services appear on our website.',
                },
                {
                    type: 'p',
                    text: 'Certain engagements may also be governed by separate contracts, confidentiality agreements, or data processing arrangements. Where such agreements establish specific obligations concerning personal information, those obligations will apply alongside this Privacy Policy, subject to applicable law.',
                },
            ],
        },
        {
            id: 'who-we-are',
            heading: '2. Who We Are and Our Responsibility for Personal Information',
            blocks: [
                {
                    type: 'p',
                    text: `${COMPANY.legalName} is a creative branding and design company providing professional services in brand strategy, visual identity, packaging design, graphic design, digital design, and related creative disciplines.`,
                },
                {
                    type: 'p',
                    text: `For personal information collected directly through our website and our own business operations, ${COMPANY.legalName} generally determines the purposes and means of processing that information.`,
                },
                {
                    type: 'p',
                    text: `In certain client engagements, we may process personal information on behalf of a client. In those circumstances, the client may determine the purposes and means of processing, while ${COMPANY.legalName} processes the information in accordance with the client's documented instructions and the applicable agreement.`,
                },
                {
                    type: 'p',
                    text: 'For questions concerning our privacy practices or the exercise of applicable privacy rights, you may contact us using the details provided at the end of this Policy.',
                },
            ],
        },
        {
            id: 'categories-of-information',
            heading: '3. Categories of Personal Information We Collect',
            blocks: [
                {
                    type: 'p',
                    text: `Depending on the nature of your interaction with ${COMPANY.legalName}, we may collect, receive, or process the following categories of information.`,
                },
                { type: 'h3', text: '3.1 Identity Information' },
                {
                    type: 'p',
                    text: 'Identity information may include your full name, professional title, designation, employer, company name, and other identifying details voluntarily provided during business communications.',
                },
                { type: 'h3', text: '3.2 Contact Information' },
                {
                    type: 'p',
                    text: 'Contact information may include your email address, telephone number, business address, mailing address, and preferred method of communication.',
                },
                {
                    type: 'p',
                    text: 'We generally collect this information when you contact us, submit an inquiry, request a quotation, or establish a business relationship.',
                },
                { type: 'h3', text: '3.3 Business and Professional Information' },
                {
                    type: 'p',
                    text: 'We may collect information relating to your organization, industry, products, services, business objectives, target audience, existing brand identity, and professional responsibilities.',
                },
                {
                    type: 'p',
                    text: 'This information enables us to understand the nature of your business and evaluate how our creative services may support your requirements.',
                },
                { type: 'h3', text: '3.4 Project and Creative Information' },
                {
                    type: 'p',
                    text: 'When you engage our services, we may collect information relevant to the planning, development, and execution of creative projects.',
                },
                {
                    type: 'p',
                    text: 'Such information may include project briefs, design references, brand guidelines, product specifications, marketing materials, visual assets, written content, business presentations, and feedback.',
                },
                {
                    type: 'p',
                    text: 'Some project materials may contain personal information relating to individuals represented in photographs, testimonials, advertising materials, or other client-provided content.',
                },
                { type: 'h3', text: '3.5 Financial and Transaction Information' },
                {
                    type: 'p',
                    text: 'Where relevant to our business relationship, we may process billing details, invoice information, payment records, transaction references, applicable tax information, and details concerning services purchased.',
                },
                {
                    type: 'p',
                    text: `Where payments are processed through third-party providers, payment information may also be handled in accordance with those providers' privacy and security practices.`,
                },
                { type: 'h3', text: '3.6 Technical Information' },
                {
                    type: 'p',
                    text: 'When you access our website, certain technical information may be collected automatically by our website infrastructure or authorized service providers.',
                },
                {
                    type: 'p',
                    text: 'This may include your Internet Protocol (IP) address, browser type and version, operating system, device type, language preferences, approximate location derived from technical information, and other diagnostic data.',
                },
                { type: 'h3', text: '3.7 Website Usage Information' },
                {
                    type: 'p',
                    text: 'We may collect information concerning how visitors access, navigate, and interact with our website.',
                },
                {
                    type: 'p',
                    text: 'This may include pages viewed, time spent on particular pages, referral sources, interactions with website features, navigation patterns, and general website performance information.',
                },
                { type: 'h3', text: '3.8 Marketing and Communication Preferences' },
                {
                    type: 'p',
                    text: 'Where we provide newsletters, updates, or promotional communications, we may collect information about your subscription status, communication preferences, and interactions with those communications.',
                },
                { type: 'h3', text: '3.9 Recruitment Information' },
                {
                    type: 'p',
                    text: 'If you apply for an employment, internship, or freelance opportunity, we may collect information such as your résumé, portfolio, work experience, qualifications, professional references, and other materials submitted as part of your application.',
                },
                {
                    type: 'p',
                    text: 'We request that individuals avoid submitting sensitive personal information unless it is necessary and specifically requested through an appropriate process.',
                },
            ],
        },
        {
            id: 'how-we-collect',
            heading: '4. How We Collect Personal Information',
            blocks: [
                {
                    type: 'p',
                    text: `${COMPANY.legalName} may collect personal information through several methods.`,
                },
                { type: 'h3', text: '4.1 Information You Provide Directly' },
                {
                    type: 'p',
                    text: 'We receive information when you voluntarily interact with us, including when you complete a contact form, send an email, participate in a consultation, request a proposal, provide a creative brief, or communicate with our team.',
                },
                {
                    type: 'p',
                    text: 'We may also receive information when you submit project feedback, share business documentation, participate in a client meeting, or apply for a professional opportunity.',
                },
                { type: 'h3', text: '4.2 Information Collected Automatically' },
                {
                    type: 'p',
                    text: 'When you interact with our website, technical systems may automatically collect information concerning your device, browser, network connection, and website activity.',
                },
                {
                    type: 'p',
                    text: 'Such information may be collected through server logs, cookies, analytics technologies, or similar mechanisms, depending on the technologies implemented on our website.',
                },
                { type: 'h3', text: '4.3 Information Received from Third Parties' },
                {
                    type: 'p',
                    text: `We may receive information from clients, business partners, professional referrals, collaborators, publicly accessible business directories, social media platforms, and other legitimate sources.`,
                },
                {
                    type: 'p',
                    text: `For example, a business representative may refer your organization to ${COMPANY.legalName} or provide your professional contact details for the purpose of discussing a potential project.`,
                },
                {
                    type: 'p',
                    text: 'We process information obtained from third parties in accordance with applicable legal requirements.',
                },
            ],
        },
        {
            id: 'how-we-use',
            heading: '5. How We Use Personal Information',
            blocks: [
                {
                    type: 'p',
                    text: 'We use personal information for legitimate business purposes connected with operating our website, providing professional creative services, and maintaining effective business relationships.',
                },
                { type: 'h3', text: '5.1 Responding to Inquiries' },
                {
                    type: 'p',
                    text: 'We may use your contact and business information to respond to questions, provide information about our services, arrange consultations, and communicate regarding potential collaborations.',
                },
                { type: 'h3', text: '5.2 Providing Branding and Design Services' },
                {
                    type: 'p',
                    text: 'Information supplied by clients may be used to understand project objectives, conduct creative research, develop concepts, prepare design presentations, execute approved work, and deliver agreed creative assets.',
                },
                { type: 'h3', text: '5.3 Managing Client Relationships' },
                {
                    type: 'p',
                    text: 'We may process information to coordinate meetings, maintain project records, communicate progress, obtain feedback, manage approvals, and provide ongoing support.',
                },
                { type: 'h3', text: '5.4 Preparing Proposals and Commercial Documents' },
                {
                    type: 'p',
                    text: 'We may use relevant information to prepare quotations, statements of work, contracts, invoices, project estimates, and other business documentation.',
                },
                { type: 'h3', text: '5.5 Improving Our Website and Services' },
                {
                    type: 'p',
                    text: 'Technical and usage information may be analyzed to understand website performance, identify navigation issues, improve accessibility, evaluate visitor engagement, and develop better digital experiences.',
                },
                { type: 'h3', text: '5.6 Marketing and Business Communications' },
                {
                    type: 'p',
                    text: 'Where permitted by applicable law, we may use contact information to share updates about our services, creative work, company announcements, or relevant professional opportunities.',
                },
                {
                    type: 'p',
                    text: 'Where consent is required, we will seek it before sending marketing communications. You may opt out of promotional emails using the unsubscribe mechanism provided or by contacting us.',
                },
                { type: 'h3', text: '5.7 Security and Legal Compliance' },
                {
                    type: 'p',
                    text: 'We may process information to protect our website and systems, investigate suspected misuse, prevent fraud, maintain business records, comply with legal obligations, and establish or defend legal claims.',
                },
                { type: 'h3', text: '5.8 Recruitment and Professional Collaboration' },
                {
                    type: 'p',
                    text: 'Information submitted by prospective employees, interns, freelancers, or collaborators may be used to evaluate qualifications, communicate regarding opportunities, and administer relevant recruitment processes.',
                },
            ],
        },
        {
            id: 'legal-grounds',
            heading: '6. Legal Grounds for Processing Personal Information',
            blocks: [
                {
                    type: 'p',
                    text: `Where applicable privacy legislation requires a lawful basis for processing personal information, ${COMPANY.legalName} may rely on one or more of the following grounds.`,
                },
                { type: 'h3', text: 'Performance of a Contract' },
                {
                    type: 'p',
                    text: 'Processing may be necessary to enter into or fulfill an agreement with you, including the delivery of branding, design, or other professional services.',
                },
                { type: 'h3', text: 'Legitimate Business Interests' },
                {
                    type: 'p',
                    text: 'We may process information where reasonably necessary to operate and improve our business, maintain professional relationships, protect our systems, and manage commercial activities, provided such interests are not overridden by applicable individual rights.',
                },
                { type: 'h3', text: 'Compliance with Legal Obligations' },
                {
                    type: 'p',
                    text: 'Certain information may be processed to satisfy applicable accounting, taxation, regulatory, contractual, or other legal requirements.',
                },
                { type: 'h3', text: 'Consent' },
                {
                    type: 'p',
                    text: 'Where required, we may seek your consent before processing information for particular purposes, such as certain marketing activities or non-essential website tracking.',
                },
                {
                    type: 'p',
                    text: 'Where processing is based on consent, you may withdraw that consent in accordance with applicable law.',
                },
            ],
        },
        {
            id: 'disclosure-and-sharing',
            heading: '7. Disclosure and Sharing of Personal Information',
            blocks: [
                {
                    type: 'p',
                    text: `${COMPANY.legalName} does not sell personal information in exchange for monetary compensation.`,
                },
                {
                    type: 'p',
                    text: 'We may disclose personal information to third parties where reasonably necessary for the purposes described in this Privacy Policy, including the following categories.',
                },
                { type: 'h3', text: 'Service Providers' },
                {
                    type: 'p',
                    text: 'We may engage external providers for website hosting, cloud storage, business communications, analytics, payment processing, IT support, and other operational services.',
                },
                { type: 'h3', text: 'Creative Collaborators and Contractors' },
                {
                    type: 'p',
                    text: 'Where necessary to deliver agreed services, we may share relevant project information with authorized designers, developers, photographers, illustrators, production specialists, printers, or other professional collaborators.',
                },
                {
                    type: 'p',
                    text: 'Access to personal information should be limited to what is reasonably necessary for their assigned responsibilities.',
                },
                { type: 'h3', text: 'Professional Advisers' },
                {
                    type: 'p',
                    text: 'Information may be shared with accountants, legal advisers, auditors, insurers, or other professional advisers where necessary for legitimate business or legal purposes.',
                },
                { type: 'h3', text: 'Legal and Regulatory Authorities' },
                {
                    type: 'p',
                    text: 'We may disclose information where required by applicable law, a valid legal process, or an enforceable request from a competent authority.',
                },
                { type: 'h3', text: 'Business Transfers' },
                {
                    type: 'p',
                    text: 'In the event of a merger, acquisition, restructuring, or transfer of business assets, relevant information may be disclosed to parties involved in the transaction, subject to applicable confidentiality and data protection requirements.',
                },
            ],
        },
        {
            id: 'international-transfers',
            heading: '8. International Data Transfers',
            blocks: [
                {
                    type: 'p',
                    text: `${COMPANY.legalName} may engage service providers, collaborators, or technology platforms that operate in different countries.`,
                },
                {
                    type: 'p',
                    text: 'As a result, personal information may be transferred to, stored in, or accessed from jurisdictions outside your country of residence.',
                },
                {
                    type: 'p',
                    text: 'Where international transfers occur, we will take steps required by applicable law to protect personal information, which may include contractual safeguards, approved transfer mechanisms, or other recognized legal protections.',
                },
                {
                    type: 'p',
                    text: 'Privacy laws and regulatory standards may differ between jurisdictions.',
                },
            ],
        },
        {
            id: 'data-security',
            heading: '9. Data Security',
            blocks: [
                {
                    type: 'p',
                    text: 'We recognize that confidentiality and information security are essential to maintaining the trust of our clients, collaborators, and website visitors.',
                },
                {
                    type: 'p',
                    text: `${COMPANY.legalName} seeks to implement reasonable technical, administrative, and organizational safeguards appropriate to the nature and sensitivity of the information processed.`,
                },
                {
                    type: 'p',
                    text: 'Such measures may include access controls, appropriate authentication practices, secure communication methods, restricted access to confidential project materials, and oversight of service providers.',
                },
                {
                    type: 'p',
                    text: 'Access to personal information should be limited to individuals who require it for legitimate business purposes.',
                },
                {
                    type: 'p',
                    text: 'Despite reasonable security measures, no website, digital platform, electronic communication system, or storage environment can be guaranteed to be completely secure.',
                },
            ],
        },
        {
            id: 'data-retention',
            heading: '10. Data Retention',
            blocks: [
                {
                    type: 'p',
                    text: 'We retain personal information only for as long as reasonably necessary to fulfill the purposes for which it was collected, subject to applicable legal, regulatory, and contractual requirements.',
                },
                {
                    type: 'p',
                    text: 'The appropriate retention period depends on factors such as the nature of the information, the purpose of processing, the duration of a business relationship, legal recordkeeping requirements, and the need to resolve disputes or protect legitimate interests.',
                },
                {
                    type: 'p',
                    text: 'Client correspondence, contractual records, invoices, and project documentation may be retained for appropriate business and legal purposes.',
                },
                {
                    type: 'p',
                    text: 'Where information is no longer required, we will take reasonable steps to delete, anonymize, or otherwise securely dispose of it in accordance with applicable obligations.',
                },
            ],
        },
        {
            id: 'cookies-and-similar-technologies',
            heading: '11. Cookies and Similar Technologies',
            blocks: [
                {
                    type: 'p',
                    text: 'Our website may use cookies and comparable technologies to support essential functionality, remember preferences, analyze website performance, and improve visitor experiences.',
                },
                {
                    type: 'p',
                    text: 'Some cookies may be placed by third-party services integrated into our website.',
                },
                {
                    type: 'p',
                    text: 'Where applicable law requires consent for non-essential cookies or tracking technologies, we will obtain that consent before activating them.',
                },
                {
                    type: 'p',
                    text: 'You may also manage certain cookies through your browser settings or any cookie preference controls made available on our website.',
                },
                {
                    type: 'p',
                    text: 'Additional information is provided in our [Cookie Policy](/policies/cookies-policy).',
                },
            ],
        },
        {
            id: 'third-party-websites',
            heading: '12. Third-Party Websites and External Platforms',
            blocks: [
                {
                    type: 'p',
                    text: 'Our website may contain links to external websites, social media platforms, online portfolios, video-hosting services, or other independently operated resources.',
                },
                {
                    type: 'p',
                    text: 'These third-party services may collect or process personal information according to their own privacy policies.',
                },
                {
                    type: 'p',
                    text: `${COMPANY.legalName} does not control the privacy practices of independent third-party websites and is not responsible for their content, security, or data processing activities.`,
                },
                {
                    type: 'p',
                    text: 'We encourage visitors to review the privacy information provided by those services before submitting personal information.',
                },
            ],
        },
        {
            id: 'your-privacy-rights',
            heading: '13. Your Privacy Rights',
            blocks: [
                {
                    type: 'p',
                    text: 'Depending on your location and applicable data protection legislation, you may have certain rights concerning your personal information.',
                },
                { type: 'p', text: 'These rights may include the following.' },
                { type: 'h3', text: 'Right of Access' },
                {
                    type: 'p',
                    text: 'You may request confirmation of whether we process personal information relating to you and, where applicable, request access to that information.',
                },
                { type: 'h3', text: 'Right to Rectification' },
                {
                    type: 'p',
                    text: 'You may request correction of personal information that is inaccurate, incomplete, or outdated.',
                },
                { type: 'h3', text: 'Right to Erasure' },
                {
                    type: 'p',
                    text: 'You may request deletion of personal information in circumstances where applicable law provides such a right.',
                },
                { type: 'h3', text: 'Right to Restrict Processing' },
                {
                    type: 'p',
                    text: 'You may request that certain processing activities be restricted where permitted by law.',
                },
                { type: 'h3', text: 'Right to Object' },
                {
                    type: 'p',
                    text: 'You may object to certain processing activities, including some uses based on legitimate interests or direct marketing.',
                },
                { type: 'h3', text: 'Right to Data Portability' },
                {
                    type: 'p',
                    text: 'Where applicable, you may request that certain personal information be provided in a structured, commonly used, machine-readable format.',
                },
                { type: 'h3', text: 'Right to Withdraw Consent' },
                {
                    type: 'p',
                    text: 'Where processing relies on your consent, you may withdraw that consent without affecting the lawfulness of processing carried out before withdrawal.',
                },
                { type: 'h3', text: 'Additional Regional Privacy Rights' },
                {
                    type: 'p',
                    text: 'Residents of certain jurisdictions may have additional rights, including rights concerning disclosures of personal information, certain forms of data sharing, automated decision-making, or protection against unlawful discrimination for exercising privacy rights.',
                },
                {
                    type: 'p',
                    text: 'These rights are subject to applicable eligibility criteria, legal exceptions, and verification requirements.',
                },
            ],
        },
        {
            id: 'exercising-your-rights',
            heading: '14. Exercising Your Rights',
            blocks: [
                {
                    type: 'p',
                    text: `To submit a privacy-related request, please contact ${COMPANY.legalName} using the contact information provided below.`,
                },
                {
                    type: 'p',
                    text: 'We may request information reasonably necessary to verify your identity, identify the relevant records, and protect personal information against unauthorized disclosure.',
                },
                {
                    type: 'p',
                    text: 'We will review and respond to valid requests within the timeframes required by applicable law.',
                },
                {
                    type: 'p',
                    text: 'Certain requests may be subject to lawful limitations or exceptions, including obligations to retain information for contractual, regulatory, security, or legal purposes.',
                },
            ],
        },
        {
            id: 'childrens-privacy',
            heading: "15. Children's Privacy",
            blocks: [
                {
                    type: 'p',
                    text: 'Our website and professional services are intended primarily for businesses, organizations, and adults seeking branding and creative services.',
                },
                {
                    type: 'p',
                    text: 'Our website is not directed toward children under the age of 13, and we do not knowingly solicit personal information directly from children under that age.',
                },
                {
                    type: 'p',
                    text: 'Where applicable law establishes a higher age threshold or additional protections, we will comply with those requirements.',
                },
                {
                    type: 'p',
                    text: 'If we become aware that personal information has been collected from a child in violation of applicable law, we will take appropriate steps to address the matter.',
                },
            ],
        },
        {
            id: 'confidential-information',
            heading: '16. Confidential Client and Project Information',
            blocks: [
                {
                    type: 'p',
                    text: `As part of our creative engagements, ${COMPANY.legalName} may receive confidential information relating to business strategies, product development, brand positioning, upcoming launches, unpublished campaigns, and proprietary creative concepts.`,
                },
                {
                    type: 'p',
                    text: 'We recognize the commercial importance of such information and seek to handle it with appropriate discretion.',
                },
                {
                    type: 'p',
                    text: 'Confidential project information will be used for legitimate purposes associated with the relevant engagement and disclosed only as permitted by applicable agreements or law.',
                },
                {
                    type: 'p',
                    text: 'Where a separate non-disclosure agreement or confidentiality clause applies, its specific provisions will govern the handling of covered information.',
                },
            ],
        },
        {
            id: 'changes',
            heading: '17. Changes to This Privacy Policy',
            blocks: [
                {
                    type: 'p',
                    text: `${COMPANY.legalName} may revise this Privacy Policy periodically to reflect changes in our operations, services, technologies, information practices, or applicable legal requirements.`,
                },
                {
                    type: 'p',
                    text: 'Any revised version will be made available on our website, accompanied by an updated revision date.',
                },
                {
                    type: 'p',
                    text: 'Where legally required, we will provide additional notice or obtain consent before implementing material changes affecting personal information.',
                },
                {
                    type: 'p',
                    text: 'We encourage visitors to review this page periodically to remain informed about our privacy practices.',
                },
            ],
        },
        {
            id: 'questions-and-complaints',
            heading: '18. Questions, Concerns, and Complaints',
            blocks: [
                {
                    type: 'p',
                    text: 'We welcome questions concerning our handling of personal information and aim to address legitimate privacy concerns responsibly.',
                },
                {
                    type: 'p',
                    text: 'If you believe that your personal information has been processed improperly, or if you wish to exercise a privacy right, please contact us.',
                },
                {
                    type: 'p',
                    text: 'Depending on your jurisdiction, you may also have the right to submit a complaint to an appropriate data protection or privacy regulatory authority.',
                },
            ],
        },
        {
            id: 'contact',
            heading: '19. Contact Information',
            blocks: [
                {
                    type: 'p',
                    text: 'For privacy-related inquiries, requests, or concerns, please contact:',
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
        `These Terms & Conditions ("Terms") govern access to and use of the ${COMPANY.legalName} website and establish certain general conditions applicable to our professional branding, design, and creative services.`,
        `${COMPANY.legalName} ("${COMPANY.legalName}," "Company," "we," "us," or "our") is a creative branding and design company providing strategic, conceptual, and visual communication solutions to businesses, organizations, entrepreneurs, and individuals.`,
        'Our work encompasses brand identity development, brand strategy, packaging design, graphic design, digital creative services, and other related design disciplines.',
        'By accessing or using our website, you agree to comply with these Terms to the extent permitted by applicable law.',
        `The provision of professional services may be subject to additional terms established through written proposals, quotations, statements of work, contracts, or other agreements between ${COMPANY.legalName} and its clients.`,
        'Where a separate written agreement expressly conflicts with these Terms regarding a particular project, the provisions of that agreement will prevail for that project.',
        'Please read these Terms carefully before using our website or engaging our services.',
    ],
    sections: [
        {
            id: 'definitions',
            heading: '1. Definitions and Interpretation',
            blocks: [
                {
                    type: 'p',
                    text: 'For the purposes of these Terms, the following expressions have the meanings described below.',
                },
                {
                    type: 'p',
                    text: `**Company:** Refers to ${COMPANY.legalName}, the branding and creative design company responsible for operating the website and providing the services described herein.`,
                },
                {
                    type: 'p',
                    text: `**Website:** Refers to the official ${COMPANY.legalName} website and its associated pages, content, features, and online resources.`,
                },
                {
                    type: 'p',
                    text: '**User or Visitor:** Refers to any individual or entity accessing, browsing, or interacting with the website.',
                },
                {
                    type: 'p',
                    text: `**Client:** Refers to an individual, business, organization, or other legal entity that engages ${COMPANY.legalName} to provide professional services.`,
                },
                {
                    type: 'p',
                    text: `**Services:** Refers to branding, brand strategy, visual identity development, packaging design, graphic design, digital design, creative direction, and other services offered by ${COMPANY.legalName}.`,
                },
                {
                    type: 'p',
                    text: `**Project:** Refers to a specific engagement undertaken by ${COMPANY.legalName} on behalf of a client.`,
                },
                {
                    type: 'p',
                    text: '**Deliverables:** Refers to the creative materials, designs, documents, files, or other agreed outputs produced as part of a project.',
                },
                {
                    type: 'p',
                    text: '**Proposal:** Refers to a quotation, project estimate, statement of work, or other written document describing the proposed services, scope, fees, and commercial arrangements.',
                },
                {
                    type: 'p',
                    text: '**Intellectual Property:** Refers to copyrights, trademarks, design rights, proprietary concepts, creative works, and other legally recognized intellectual property rights.',
                },
            ],
        },
        {
            id: 'acceptance-of-terms',
            heading: '2. Acceptance of Terms',
            blocks: [
                {
                    type: 'p',
                    text: `By accessing, browsing, or otherwise using the ${COMPANY.legalName} website, you acknowledge that you have read and understood these Terms and agree to comply with the provisions applicable to your use.`,
                },
                {
                    type: 'p',
                    text: 'If you are accessing the website or entering into an agreement on behalf of a company or organization, you represent that you have the authority to act on behalf of that entity.',
                },
                {
                    type: 'p',
                    text: 'If you do not agree with these Terms, you should discontinue use of the website.',
                },
                {
                    type: 'p',
                    text: 'Nothing in these Terms is intended to exclude or restrict rights that cannot lawfully be waived under applicable consumer protection or other mandatory laws.',
                },
            ],
        },
        {
            id: 'nature-and-scope-of-services',
            heading: '3. Nature and Scope of Our Services',
            blocks: [
                {
                    type: 'p',
                    text: `${COMPANY.legalName} provides professional creative and branding services designed to help businesses develop and communicate distinctive identities.`,
                },
                {
                    type: 'p',
                    text: 'Our services may include brand discovery, research, strategic positioning, brand naming, logo development, visual identity systems, packaging design, graphic design, marketing collateral, digital design, brand guidelines, and creative consulting.',
                },
                {
                    type: 'p',
                    text: 'The availability and scope of any particular service may vary depending on the requirements of the client, the complexity of the engagement, and the resources involved.',
                },
                {
                    type: 'p',
                    text: 'Descriptions of services published on our website are intended to provide general information about our capabilities. They do not constitute a binding commitment to provide a particular service, deliverable, timeline, or commercial outcome.',
                },
                {
                    type: 'p',
                    text: 'Specific project obligations will be established through an approved proposal or other written agreement.',
                },
            ],
        },
        {
            id: 'inquiries-and-proposals',
            heading: '4. Project Inquiries and Proposals',
            blocks: [
                {
                    type: 'p',
                    text: `Prospective clients may contact ${COMPANY.legalName} through our website, email, telephone, or other authorized communication channels to discuss potential projects.`,
                },
                {
                    type: 'p',
                    text: `Following an initial inquiry, we may request information regarding the client's business, objectives, project requirements, target audience, anticipated deliverables, budget, and expected timeline.`,
                },
                {
                    type: 'p',
                    text: 'Based on the information provided, we may prepare a proposal outlining the proposed scope of services, creative process, deliverables, fees, payment schedule, and estimated completion period.',
                },
                {
                    type: 'p',
                    text: 'Unless otherwise stated, proposals are provided for evaluation and discussion and do not create a binding obligation until accepted in accordance with their terms.',
                },
                {
                    type: 'p',
                    text: `${COMPANY.legalName} reserves the right to decline project inquiries that fall outside our expertise, available resources, professional standards, or business requirements.`,
                },
            ],
        },
        {
            id: 'project-commencement',
            heading: '5. Project Commencement and Client Engagement',
            blocks: [
                {
                    type: 'p',
                    text: 'A project will commence following completion of the acceptance requirements specified in the relevant proposal or agreement.',
                },
                {
                    type: 'p',
                    text: 'These requirements may include written approval of the project scope, acceptance of commercial terms, execution of a contract, submission of required project materials, or payment of an agreed advance fee.',
                },
                {
                    type: 'p',
                    text: `${COMPANY.legalName} is not obligated to begin work before the applicable commencement requirements have been satisfied.`,
                },
                {
                    type: 'p',
                    text: 'The client acknowledges that the accuracy and completeness of information supplied during the initial briefing process may materially influence the creative direction, scope, and estimated timeline of the project.',
                },
            ],
        },
        {
            id: 'client-responsibilities',
            heading: '6. Client Responsibilities and Cooperation',
            blocks: [
                {
                    type: 'p',
                    text: 'Successful creative projects depend on timely communication, constructive collaboration, and access to relevant information.',
                },
                {
                    type: 'p',
                    text: 'Clients are responsible for providing accurate and sufficiently detailed instructions, reference materials, brand information, product specifications, and other resources reasonably necessary to perform the agreed services.',
                },
                {
                    type: 'p',
                    text: 'Clients are also responsible for reviewing creative submissions, communicating feedback, and providing approvals within the timeframes agreed upon during the project.',
                },
                {
                    type: 'p',
                    text: 'Where the client supplies photographs, illustrations, trademarks, fonts, written content, or other materials, the client represents that it possesses the necessary rights, permissions, or licenses to authorize their use for the intended project.',
                },
                {
                    type: 'p',
                    text: `${COMPANY.legalName} will not be responsible for delays or additional costs arising directly from inaccurate instructions, incomplete materials, delayed approvals, or changes requested by the client, except to the extent otherwise agreed or required by law.`,
                },
            ],
        },
        {
            id: 'project-scope-and-changes',
            heading: '7. Project Scope and Changes',
            blocks: [
                {
                    type: 'p',
                    text: 'The agreed scope of a project will be defined in the applicable proposal, statement of work, or contract.',
                },
                {
                    type: 'p',
                    text: 'The scope may specify the creative services to be performed, number of concepts, included revisions, deliverable formats, production specifications, and expected project milestones.',
                },
                {
                    type: 'p',
                    text: 'Any request that materially changes the original requirements may constitute a change in scope.',
                },
                {
                    type: 'p',
                    text: 'Examples include introducing additional products or brands, requesting new design directions, adding deliverables, changing approved specifications, or expanding the project into additional creative disciplines.',
                },
                {
                    type: 'p',
                    text: `Where a requested change affects the required resources, cost, or timeline, ${COMPANY.legalName} may issue a revised quotation or change order for the client's approval before proceeding.`,
                },
                {
                    type: 'p',
                    text: `No additional charge will be imposed solely under this provision without an applicable contractual basis or the client's agreement.`,
                },
            ],
        },
        {
            id: 'creative-process',
            heading: '8. Creative Process and Design Development',
            blocks: [
                {
                    type: 'p',
                    text: `${COMPANY.legalName} approaches each project through a structured creative process intended to balance strategic thinking, visual exploration, and effective communication.`,
                },
                {
                    type: 'p',
                    text: 'Depending on the engagement, this process may involve discovery, research, concept development, creative presentations, design refinement, and preparation of final deliverables.',
                },
                {
                    type: 'p',
                    text: 'Preliminary concepts, exploratory designs, sketches, mockups, and presentation materials are developed for review and discussion.',
                },
                {
                    type: 'p',
                    text: 'Such materials should not be treated as final, production-ready deliverables unless expressly identified as such.',
                },
                {
                    type: 'p',
                    text: 'Creative recommendations reflect our professional judgment and the project objectives communicated by the client. Final decisions concerning the selection and implementation of approved designs remain subject to the agreed approval process.',
                },
            ],
        },
        {
            id: 'revisions-and-approvals',
            heading: '9. Revisions, Feedback, and Approvals',
            blocks: [
                {
                    type: 'p',
                    text: 'The number and nature of revisions included in a project will be specified in the applicable proposal or agreement.',
                },
                {
                    type: 'p',
                    text: 'Revisions are intended to refine work within the agreed creative direction and project scope.',
                },
                {
                    type: 'p',
                    text: 'Requests involving substantial changes to an approved concept, replacement of an established creative direction, or development of entirely new design alternatives may be treated as additional services.',
                },
                {
                    type: 'p',
                    text: 'Clients are encouraged to provide clear, consolidated, and timely feedback to support an efficient creative process.',
                },
                {
                    type: 'p',
                    text: 'Where an authorized client representative provides written approval of a design, concept, or project stage, that approval may establish the basis for proceeding to subsequent work.',
                },
                {
                    type: 'p',
                    text: 'Changes requested after approval may affect fees, deliverables, and project timelines.',
                },
            ],
        },
        {
            id: 'fees-and-payments',
            heading: '10. Fees, Payments, and Invoicing',
            blocks: [
                {
                    type: 'p',
                    text: `Fees for ${COMPANY.legalName}' services will be communicated through written quotations, proposals, invoices, or contractual agreements.`,
                },
                {
                    type: 'p',
                    text: 'The applicable payment structure may include an advance payment, milestone-based payments, or payment upon completion, depending on the nature of the project.',
                },
                {
                    type: 'p',
                    text: 'Unless otherwise agreed in writing, the client is responsible for paying all properly invoiced amounts according to the agreed payment schedule.',
                },
                {
                    type: 'p',
                    text: 'Fees for additional work, third-party services, or changes in scope will be communicated separately where applicable.',
                },
                {
                    type: 'p',
                    text: 'All applicable taxes, duties, or statutory charges will be handled in accordance with the relevant agreement and applicable law.',
                },
                {
                    type: 'p',
                    text: `${COMPANY.legalName} may suspend work or withhold deliverables where payment obligations remain unfulfilled, subject to any notice requirements, contractual limitations, and applicable law.`,
                },
            ],
        },
        {
            id: 'timelines-and-delivery',
            heading: '11. Project Timelines and Delivery',
            blocks: [
                {
                    type: 'p',
                    text: 'Estimated project schedules will be established based on the agreed scope, complexity of the work, availability of necessary materials, and anticipated client participation.',
                },
                {
                    type: 'p',
                    text: `${COMPANY.legalName} will make reasonable efforts to meet agreed deadlines and communicate material changes to project schedules.`,
                },
                {
                    type: 'p',
                    text: 'Timelines may be affected by factors such as delayed feedback, changes in scope, incomplete client information, third-party dependencies, or circumstances beyond our reasonable control.',
                },
                {
                    type: 'p',
                    text: 'Where delays occur, the parties may agree to revise the delivery schedule.',
                },
                {
                    type: 'p',
                    text: 'Unless expressly guaranteed in a written agreement, indicative timelines should not be interpreted as unconditional delivery guarantees.',
                },
            ],
        },
        {
            id: 'final-deliverables',
            heading: '12. Final Deliverables and File Formats',
            blocks: [
                {
                    type: 'p',
                    text: `Upon completion of the agreed services and satisfaction of applicable payment obligations, ${COMPANY.legalName} will provide the final deliverables specified in the project agreement.`,
                },
                {
                    type: 'p',
                    text: 'Deliverables may include approved logo files, visual identity assets, packaging artwork, brand guidelines, marketing graphics, digital design files, or other agreed materials.',
                },
                {
                    type: 'p',
                    text: 'The specific file formats, dimensions, resolutions, color profiles, and production specifications will depend on the requirements established for the project.',
                },
                {
                    type: 'p',
                    text: 'Editable source files, working documents, layered design files, unused concepts, and proprietary templates are not automatically included unless expressly identified as deliverables.',
                },
                {
                    type: 'p',
                    text: `Clients are responsible for reviewing delivered files and notifying ${COMPANY.legalName} of any apparent discrepancies within the review period specified in the agreement.`,
                },
            ],
        },
        {
            id: 'intellectual-property',
            heading: '13. Intellectual Property Rights',
            blocks: [
                {
                    type: 'p',
                    text: 'Intellectual property rights are an important component of our creative work and client relationships.',
                },
                {
                    type: 'p',
                    text: `Unless otherwise agreed in writing, ${COMPANY.legalName} retains ownership of its pre-existing intellectual property, proprietary methods, design processes, templates, working materials, preliminary concepts, and unused creative proposals.`,
                },
                {
                    type: 'p',
                    text: 'The ownership or licensing of final approved deliverables will be determined by the applicable project agreement.',
                },
                {
                    type: 'p',
                    text: 'Where an agreement provides for the transfer of specified intellectual property rights, such transfer will take effect in accordance with the agreed conditions, which may include receipt of full payment.',
                },
                {
                    type: 'p',
                    text: 'Any rights not expressly transferred or licensed remain with their respective owners.',
                },
                {
                    type: 'p',
                    text: 'Clients may not reproduce, distribute, modify, sublicense, or commercially exploit preliminary or rejected creative concepts without the necessary authorization.',
                },
            ],
        },
        {
            id: 'third-party-ip',
            heading: '14. Third-Party Intellectual Property',
            blocks: [
                {
                    type: 'p',
                    text: 'Creative projects may incorporate or require third-party materials, including fonts, stock photographs, illustrations, software, plugins, music, video, or other licensed assets.',
                },
                {
                    type: 'p',
                    text: 'Such materials remain subject to the intellectual property rights and license conditions established by their respective owners.',
                },
                {
                    type: 'p',
                    text: `Unless otherwise agreed, the transfer of rights in ${COMPANY.legalName}' original creative work does not automatically transfer ownership of third-party materials.`,
                },
                {
                    type: 'p',
                    text: 'Clients may be required to obtain or maintain appropriate licenses for the continued commercial use of certain assets.',
                },
                {
                    type: 'p',
                    text: `${COMPANY.legalName} will seek to identify material third-party licensing requirements relevant to the agreed deliverables.`,
                },
            ],
        },
        {
            id: 'trademark-availability',
            heading: '15. Trademark Availability and Brand Registration',
            blocks: [
                {
                    type: 'p',
                    text: 'Brand identity and naming projects may involve the development of names, logos, symbols, slogans, and other distinctive brand elements.',
                },
                {
                    type: 'p',
                    text: `Unless expressly included in the scope of services, ${COMPANY.legalName} does not provide legal opinions concerning trademark availability, registration eligibility, or freedom from infringement.`,
                },
                {
                    type: 'p',
                    text: 'Creative research, market observations, and preliminary name exploration should not be treated as substitutes for professional legal clearance.',
                },
                {
                    type: 'p',
                    text: 'Clients are encouraged to obtain appropriate trademark searches and legal advice before commercially adopting or registering a proposed brand identity.',
                },
                {
                    type: 'p',
                    text: `${COMPANY.legalName} does not guarantee that a proposed name, logo, or other creative element will be accepted for trademark registration in any jurisdiction.`,
                },
            ],
        },
        {
            id: 'confidentiality',
            heading: '16. Confidentiality and Proprietary Information',
            blocks: [
                {
                    type: 'p',
                    text: 'During the course of a professional engagement, either party may receive information that is confidential, commercially sensitive, or proprietary to the other party.',
                },
                {
                    type: 'p',
                    text: 'Such information may include business strategies, financial information, product concepts, unpublished campaigns, customer information, creative materials, and internal business documentation.',
                },
                {
                    type: 'p',
                    text: 'Each party agrees to handle information identified as confidential, or reasonably understood to be confidential, with appropriate care and to use it only for authorized purposes connected with the engagement.',
                },
                {
                    type: 'p',
                    text: 'Confidential information may be disclosed where required by law or where otherwise permitted under an applicable agreement.',
                },
                {
                    type: 'p',
                    text: 'Specific confidentiality obligations, exclusions, durations, and remedies may be established through a separate non-disclosure agreement or project contract.',
                },
            ],
        },
        {
            id: 'portfolio-and-promotional-use',
            heading: '17. Portfolio, Case Studies, and Promotional Use',
            blocks: [
                {
                    type: 'p',
                    text: `${COMPANY.legalName} values the opportunity to demonstrate its creative expertise through portfolios, case studies, presentations, and professional communications.`,
                },
                {
                    type: 'p',
                    text: `Subject to applicable intellectual property rights, confidentiality obligations, and any restrictions agreed with the client, ${COMPANY.legalName} may request permission to feature completed projects in its portfolio, website, social media channels, award submissions, and other promotional materials.`,
                },
                {
                    type: 'p',
                    text: `Where the relevant agreement authorizes portfolio use, ${COMPANY.legalName} may display the approved work in accordance with that authorization.`,
                },
                {
                    type: 'p',
                    text: 'Confidential, unpublished, or embargoed materials will remain subject to the applicable restrictions.',
                },
            ],
        },
        {
            id: 'printing-and-production',
            heading: '18. Printing, Manufacturing, and Production',
            blocks: [
                {
                    type: 'p',
                    text: 'Certain projects may involve designs intended for physical production, including packaging, printed marketing materials, signage, labels, or promotional merchandise.',
                },
                {
                    type: 'p',
                    text: `Unless expressly included in the agreed scope, ${COMPANY.legalName} is not responsible for independently managing printing, manufacturing, material procurement, or physical production.`,
                },
                {
                    type: 'p',
                    text: 'Variations in printed colors, materials, finishes, dimensions, or manufacturing outcomes may arise from production processes, equipment, substrates, and third-party specifications.',
                },
                {
                    type: 'p',
                    text: 'Clients should ensure that appropriate production proofs, technical specifications, and regulatory requirements are reviewed before authorizing mass production.',
                },
                {
                    type: 'p',
                    text: `Where ${COMPANY.legalName} is specifically engaged to manage production, its responsibilities will be defined in the applicable agreement.`,
                },
            ],
        },
        {
            id: 'regulatory-compliance',
            heading: '19. Regulatory Compliance of Client Products',
            blocks: [
                {
                    type: 'p',
                    text: 'Clients are responsible for ensuring that their products, packaging, advertising claims, labels, and commercial communications comply with applicable industry regulations and legal requirements.',
                },
                {
                    type: 'p',
                    text: 'This may include product labeling requirements, ingredient declarations, health claims, safety warnings, consumer disclosures, and other mandatory information.',
                },
                {
                    type: 'p',
                    text: `Unless expressly agreed, ${COMPANY.legalName}' design services do not include independent legal, scientific, or regulatory verification of client-provided claims or product information.`,
                },
                {
                    type: 'p',
                    text: 'The client remains responsible for the accuracy and lawful use of the content it approves for publication or production.',
                },
            ],
        },
        {
            id: 'suspension-cancellation-termination',
            heading: '20. Project Suspension, Cancellation, and Termination',
            blocks: [
                {
                    type: 'p',
                    text: 'Either party may request cancellation or termination of a project in accordance with the applicable written agreement and relevant law.',
                },
                {
                    type: 'p',
                    text: 'Where a project is cancelled after work has commenced, the client may remain responsible for fees relating to services performed, approved expenses, and non-cancellable third-party commitments.',
                },
                {
                    type: 'p',
                    text: 'Any refund or outstanding payment will be determined according to the agreed payment terms, the work completed, and applicable legal requirements.',
                },
                {
                    type: 'p',
                    text: `${COMPANY.legalName} may suspend or terminate an engagement where there is a material breach of contractual obligations, unlawful activity, persistent non-payment, or other grounds established in the agreement.`,
                },
                {
                    type: 'p',
                    text: 'Where required, reasonable notice and an opportunity to remedy the breach will be provided.',
                },
            ],
        },
        {
            id: 'website-content-and-ownership',
            heading: '21. Website Content and Ownership',
            blocks: [
                {
                    type: 'p',
                    text: `Unless otherwise stated, the original content available on the ${COMPANY.legalName} website, including written material, artwork, layouts, graphics, photographs, design presentations, and other creative elements, is owned by or licensed to ${COMPANY.legalName}.`,
                },
                {
                    type: 'p',
                    text: 'The website and its contents are protected by applicable intellectual property laws.',
                },
                {
                    type: 'p',
                    text: 'Visitors may access and view website materials for lawful personal or professional informational purposes.',
                },
                {
                    type: 'p',
                    text: 'Unauthorized commercial reproduction, redistribution, modification, publication, or exploitation of protected website content is prohibited without appropriate permission, except where permitted by law.',
                },
            ],
        },
        {
            id: 'acceptable-use',
            heading: '22. Acceptable Use of the Website',
            blocks: [
                {
                    type: 'p',
                    text: `Users agree to access and use the ${COMPANY.legalName} website only for lawful purposes.`,
                },
                {
                    type: 'p',
                    text: 'Users must not attempt to compromise website security, interfere with its operation, gain unauthorized access to systems or information, distribute malicious software, or use automated processes in a manner that unlawfully disrupts the website.',
                },
                {
                    type: 'p',
                    text: `Users must not misrepresent their identity, submit fraudulent inquiries, or use the website in a manner that infringes the rights of ${COMPANY.legalName} or third parties.`,
                },
                {
                    type: 'p',
                    text: 'We reserve the right to take reasonable measures to protect the website and its users against prohibited activities.',
                },
            ],
        },
        {
            id: 'external-links',
            heading: '23. External Links and Third-Party Services',
            blocks: [
                {
                    type: 'p',
                    text: 'Our website may contain links to external websites, creative platforms, social media services, or other third-party resources.',
                },
                {
                    type: 'p',
                    text: 'These links are provided for informational or functional purposes and do not necessarily imply endorsement or responsibility for the linked content.',
                },
                {
                    type: 'p',
                    text: `${COMPANY.legalName} does not control the availability, security, accuracy, or practices of independently operated third-party websites.`,
                },
                {
                    type: 'p',
                    text: 'Users should review the applicable terms and privacy policies before interacting with external services.',
                },
            ],
        },
        {
            id: 'professional-judgment',
            heading: '24. Professional Judgment and Creative Outcomes',
            blocks: [
                {
                    type: 'p',
                    text: `${COMPANY.legalName} provides creative recommendations and design services based on professional expertise, available information, and the objectives established during the project.`,
                },
                {
                    type: 'p',
                    text: 'The commercial performance of a brand or design may depend on factors beyond our control, including market conditions, product quality, pricing, distribution, customer preferences, competition, and business execution.',
                },
                {
                    type: 'p',
                    text: `Unless expressly agreed in writing, ${COMPANY.legalName} does not guarantee particular financial, marketing, sales, or brand recognition outcomes.`,
                },
                {
                    type: 'p',
                    text: 'Nothing in this provision limits any express contractual commitment or legal obligation concerning the standard of services provided.',
                },
            ],
        },
        {
            id: 'warranties-and-disclaimers',
            heading: '25. Warranties and Disclaimers',
            blocks: [
                {
                    type: 'p',
                    text: `${COMPANY.legalName} endeavors to maintain accurate website information and deliver professional services with reasonable skill and care.`,
                },
                {
                    type: 'p',
                    text: 'However, website content is provided for general informational purposes and may be updated without prior notice.',
                },
                {
                    type: 'p',
                    text: 'To the extent permitted by applicable law, we do not warrant that the website will always operate without interruption, technical errors, or security vulnerabilities.',
                },
                {
                    type: 'p',
                    text: 'Any warranties relating to specific professional services will be governed by the applicable project agreement and mandatory legal requirements.',
                },
                {
                    type: 'p',
                    text: 'Nothing in these Terms excludes warranties or protections that cannot lawfully be excluded.',
                },
            ],
        },
        {
            id: 'limitation-of-liability',
            heading: '26. Limitation of Liability',
            blocks: [
                {
                    type: 'p',
                    text: `To the maximum extent permitted by applicable law, ${COMPANY.legalName} will not be liable for indirect or consequential losses arising solely from use of the website where such liability may lawfully be excluded.`,
                },
                {
                    type: 'p',
                    text: 'Liability arising from professional services will be governed by the applicable project agreement, including any valid limitations or exclusions contained in that agreement.',
                },
                {
                    type: 'p',
                    text: 'Nothing in these Terms excludes or restricts liability for fraud, willful misconduct, or any other matter for which liability cannot legally be excluded or limited.',
                },
            ],
        },
        {
            id: 'indemnification',
            heading: '27. Indemnification',
            blocks: [
                {
                    type: 'p',
                    text: 'Where permitted by applicable law and subject to the relevant agreement, a client may be responsible for claims, losses, or reasonable expenses arising from materials supplied by the client that infringe third-party rights, contain unlawful content, or violate applicable regulations.',
                },
                {
                    type: 'p',
                    text: 'Any indemnification obligation will be interpreted in accordance with the applicable contract and will not extend beyond what is legally enforceable.',
                },
            ],
        },
        {
            id: 'force-majeure',
            heading: '28. Events Beyond Reasonable Control',
            blocks: [
                {
                    type: 'p',
                    text: 'Neither party will be responsible for delays or failures to perform contractual obligations to the extent caused by circumstances beyond its reasonable control, subject to applicable law and the terms of the relevant agreement.',
                },
                {
                    type: 'p',
                    text: 'Such circumstances may include natural disasters, widespread service interruptions, government restrictions, labor disruptions, or other extraordinary events.',
                },
                {
                    type: 'p',
                    text: 'The affected party should notify the other party within a reasonable period and take reasonable steps to reduce the resulting disruption.',
                },
            ],
        },
        {
            id: 'privacy-and-personal-information',
            heading: '29. Privacy and Personal Information',
            blocks: [
                {
                    type: 'p',
                    text: `Personal information collected through the ${COMPANY.legalName} website or business operations will be handled in accordance with our [Privacy Policy](/policies/privacy-policy) and applicable data protection laws.`,
                },
                {
                    type: 'p',
                    text: 'Users are encouraged to review the Privacy Policy for additional information concerning data collection, processing, security, retention, and individual rights.',
                },
            ],
        },
        {
            id: 'changes',
            heading: '30. Amendments to These Terms',
            blocks: [
                {
                    type: 'p',
                    text: `${COMPANY.legalName} may update these Terms periodically to reflect changes in our website, service offerings, operational practices, or applicable laws.`,
                },
                {
                    type: 'p',
                    text: 'Revised Terms will be published on the website with an updated revision date.',
                },
                {
                    type: 'p',
                    text: 'Changes will not automatically alter the commercial terms of an existing signed project agreement unless permitted by that agreement or otherwise accepted by the relevant parties.',
                },
            ],
        },
        {
            id: 'severability',
            heading: '31. Severability',
            blocks: [
                {
                    type: 'p',
                    text: 'If any provision of these Terms is determined by a competent authority to be invalid, unlawful, or unenforceable, that provision will be interpreted or limited to the extent legally permissible.',
                },
                {
                    type: 'p',
                    text: 'The remaining provisions will continue in effect to the extent permitted by applicable law.',
                },
            ],
        },
        {
            id: 'governing-law',
            heading: '32. Governing Law and Jurisdiction',
            blocks: [
                {
                    type: 'p',
                    text: `These Terms will be governed by the laws of ${COMPANY.jurisdiction}, subject to mandatory legal provisions that may apply.`,
                },
                {
                    type: 'p',
                    text: 'Any dispute concerning these Terms, the website, or professional services will be addressed in accordance with applicable law and any dispute-resolution arrangements established in the relevant written agreement.',
                },
            ],
        },
        {
            id: 'contact',
            heading: '33. Contact Information',
            blocks: [
                {
                    type: 'p',
                    text: 'For questions concerning these Terms, our website, or professional engagements, please contact:',
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