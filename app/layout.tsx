import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0B0B0E",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://adverabranding.com"),
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
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Advera Branding Logo and Identity",
      },
      {
        url: "/logo.svg",
        width: 512,
        height: 512,
        alt: "Advera Branding Emblem",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Advera Branding | Branding and UGC Content Studio",
    description:
      "We build identities and websites, and produce UGC and social content with real creators so your brand is remembered and believed.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
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
  const themeInitScript = `
    (function() {
      var DARK_START = 18, DARK_END = 6;
      function wantsDark() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return true;
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return false;
        var h = new Date().getHours();
        return h >= DARK_START || h < DARK_END;
      }
      function applyTheme() {
        document.documentElement.setAttribute('data-theme', wantsDark() ? 'dark' : 'light');
      }
      applyTheme();
      if (window.matchMedia) {
        var mq = window.matchMedia('(prefers-color-scheme: dark)');
        if (mq.addEventListener) {
          mq.addEventListener('change', applyTheme);
        } else if (mq.addListener) {
          mq.addListener(applyTheme);
        }
      }
    })();
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
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
