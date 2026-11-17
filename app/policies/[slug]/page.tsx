import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { COMPANY, POLICIES, getPolicy } from '@/lib/policies-data';
import PolicyBody from '../PolicyBody';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return POLICIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const policy = getPolicy(slug);
    if (!policy) return {};
    return {
        title: `${policy.title} | ${COMPANY.name}`,
        description: policy.description,
    };
}

export default async function PolicyPage({ params }: Props) {
    const { slug } = await params;
    const policy = getPolicy(slug);
    if (!policy) notFound();

    return (
        <>
            <a className="skip" href="#app">Skip to content</a>
            <Header isDark={false} />
            <main id="app" className="pol-page">
                <header className="pol-hero">
                    <div className="pol-hero-inner">
                        <span className="pol-tag">Legal &amp; Policies</span>
                        <h1 className="pol-title">{policy.title}</h1>
                        <p className="pol-updated">Last updated: {COMPANY.lastUpdated}</p>
                    </div>
                </header>

                <div className="pol-layout">

                    <aside className="pol-sidebar">
                        <div className="pol-nav-card">
                            <p className="pol-nav-label">All policies</p>
                            <nav className="pol-nav" aria-label="Policies">
                                {POLICIES.map((p) => (
                                    <Link
                                        key={p.slug}
                                        href={`/policies/${p.slug}`}
                                        className={`pol-nav-link${p.slug === policy.slug ? ' pol-nav-link--active' : ''}`}
                                        aria-current={p.slug === policy.slug ? 'page' : undefined}
                                    >
                                        {p.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        <div className="pol-questions">
                            <strong>Questions?</strong>
                            <p>Have enquiries regarding our terms or legal policies?</p>
                            <a href={`mailto:${COMPANY.privacyEmail}`}>{COMPANY.privacyEmail} →</a>
                        </div>
                    </aside>

                    <PolicyBody policy={policy} />
                </div>
            </main>
            <Footer />
        </>
    );
}
