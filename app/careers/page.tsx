import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CareersView from '@/components/CareersView';

export const metadata: Metadata = {
  title: 'Careers | Advera Branding',
  description: 'Build brands and content people believe in, with people who care how it is done. Explore open creative, content and dev roles.',
  openGraph: {
    title: 'Careers | Advera Branding',
    description: 'Build brands and content people believe in, with people who care how it is done.',
  }
};

export default function CareersPage() {
  return (
    <>
      <a className="skip" href="#app">Skip to content</a>
      <Header isDark={false} />
      <main id="app" tabIndex={-1}>
        <CareersView />
      </main>
      <Footer />
    </>
  );
}

