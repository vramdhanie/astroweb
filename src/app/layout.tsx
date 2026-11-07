import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeScript from "@/components/ThemeScript";
import SideNavigation from "@/components/SideNavigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vincentramdhanie.com'),
  title: {
    default: "Vincent Ramdhanie",
    template: "%s · Vincent Ramdhanie",
  },
  description:
    "Personal website of Vincent Ramdhanie — software engineer, writer, and builder of small apps.",
  icons: {
    icon: [
      { url: '/favicon-16x16-new.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32-new.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon-new.ico',
    apple: '/apple-touch-icon-new.png',
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Vincent Ramdhanie',
  },
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vincentramdhanie.com',
    title: 'Vincent Ramdhanie',
    description: 'Personal website of Vincent Ramdhanie — software engineer, writer, and builder of small apps.',
    siteName: 'Vincent Ramdhanie',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vincent Ramdhanie',
    description: 'Personal website of Vincent Ramdhanie — software engineer, writer, and builder of small apps.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#3B82F6',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5DN4JNFN');`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5DN4JNFN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ThemeScript />
        <ThemeProvider>
          <Header />
          <main className="flex-1">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col max-w-screen-xl py-8">
              <div className="flex-1 my-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                  <SideNavigation />
                  <div className="col-span-1 md:col-span-4">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
