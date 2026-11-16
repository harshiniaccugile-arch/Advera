import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesView from '@/components/ServicesView';

export const metadata: Metadata = {
  title: 'Services | Advera Branding',
  description: 'Brand identity, UGC creator campaigns, social media, paid social and custom website development. One team, one unified plan.',
  openGraph: {
    title: 'Services | Advera Branding',
    description: 'Brand identity, UGC creator campaigns, social media, paid social and custom website development.',
  }
};

export default function ServicesPage() {
  return (
    <>
      <a className="skip" href="#app">Skip to content</a>
      <Header isDark={true} />
      <main id="app" tabIndex={-1}>
        <ServicesView />
      </main>
      <Footer />
    </>
  );
}

