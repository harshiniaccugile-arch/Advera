import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactView from '@/components/ContactView';

export const metadata: Metadata = {
  title: 'Contact | Advera Branding',
  description: 'Let us talk about your project. Start a conversation with our branding, UGC and web studio in Coimbatore, India.',
  openGraph: {
    title: 'Contact | Advera Branding',
    description: 'Start a conversation with our branding, UGC and web studio.',
  }
};

export default function ContactPage() {
  return (
    <>
      <a className="skip" href="#app">Skip to content</a>
      <Header isDark={true} />
      <main id="app" tabIndex={-1}>
        <ContactView />
      </main>
      <Footer />
    </>
  );
}

