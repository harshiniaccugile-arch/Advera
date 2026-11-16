import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WorkDetailView from '@/components/WorkDetailView';
import { PROJECTS, lum } from '@/lib/advera-data';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PROJECTS.map(p => ({
    slug: p.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find(p => p.slug === slug);
  if (!project) return { title: 'Project Not Found | Advera Branding' };

  return {
    title: `${project.name} | Advera Branding`,
    description: project.blurb,
    openGraph: {
      title: `${project.name} | Advera Branding`,
      description: project.blurb,
    }
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find(p => p.slug === slug);
  if (!project) notFound();

  const isDark = lum(project.pal[0]) < 0.36;

  return (
    <>
      <a className="skip" href="#app">Skip to content</a>
      <Header isDark={isDark} />
      <main id="app" tabIndex={-1}>
        <WorkDetailView slug={slug} />
      </main>
      <Footer />
    </>
  );
}

