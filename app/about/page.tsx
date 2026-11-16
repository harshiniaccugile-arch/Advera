import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutView from '@/components/AboutView';

export const metadata: Metadata = {
  title: 'About | Advera Branding',
  description: 'A compact studio of strategists, designers and creators dedicated to bringing out the full potential of your brand.',
  openGraph: {
    title: 'About | Advera Branding',
    description: 'A compact studio of strategists, designers and creators dedicated to bringing out the full potential of your brand.',
  }
};

export default function AboutPage() {
  return (
    <>
      <a className="skip" href="#app">Skip to content</a>
      <Header isDark={true} />
      <main id="app" tabIndex={-1}>
        <AboutView />
      </main>
      <Footer />
    </>
  );
}

