import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0B0B0E",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Advera Branding | Branding and UGC Content Studio",
  description:
    "Advera Branding is a brand and content studio. We build identities and websites, and produce UGC and social content with real creators so your brand is remembered and believed.",
  keywords: [
    "Advera Branding",
    "branding studio",
    "UGC content",
    "creator campaigns",
    "web design",
    "creative agency",
    "social content",
    "Coimbatore branding agency"
  ],
  authors: [{ name: "Advera Branding" }],
  creator: "Advera Branding",
  publisher: "Advera Branding",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "Advera Branding | Branding and UGC Content Studio",
    description:
      "We build identities and websites, and produce UGC and social content with real creators so your brand is remembered and believed.",
    type: "website",
    locale: "en_US",
    siteName: "Advera Branding",
  },
  twitter: {
    card: "summary_large_image",
    title: "Advera Branding | Branding and UGC Content Studio",
    description:
      "We build identities and websites, and produce UGC and social content with real creators so your brand is remembered and believed.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Instrument+Sans:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
