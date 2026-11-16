import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomeView from '@/components/HomeView';

export const metadata: Metadata = {
  title: 'Advera Branding | Branding and UGC Content Studio',
  description: 'Advera Branding is a brand and content studio. We build identities and websites, and produce UGC and social content with real creators so your brand is remembered and believed.',
  openGraph: {
    title: 'Advera Branding | Branding and UGC Content Studio',
    description: 'We build identities and websites, and produce UGC and social content with real creators so your brand is remembered and believed.',
  }
};

export default function HomePage() {
  return (
    <>
      <a className="skip" href="#app">Skip to content</a>
      <Header isDark={false} />
      <main id="app" tabIndex={-1}>
        <HomeView />
      </main>
      <Footer />
    </>
  );
}
