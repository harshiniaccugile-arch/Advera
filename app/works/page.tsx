import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WorksView from '@/components/WorksView';

export const metadata: Metadata = {
  title: 'Works | Advera Branding',
  description: 'Identities, creator campaigns and websites built for businesses that wanted to be remembered and believed.',
  openGraph: {
    title: 'Works | Advera Branding',
    description: 'Identities, creator campaigns and websites built for businesses that wanted to be remembered and believed.',
  }
};

export default function WorksPage() {
  return (
    <>
      <a className="skip" href="#app">Skip to content</a>
      <Header isDark={false} />
      <main id="app" tabIndex={-1}>
        <WorksView />
      </main>
      <Footer />
    </>
  );
}

