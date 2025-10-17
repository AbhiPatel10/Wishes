import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Happy Diwali!',
  description: 'Share a personalized Diwali greeting with your friends and family.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Lobster&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />

        <Script id="adsterra-init" strategy="afterInteractive">
          {`
            atOptions = {
              'key' : 'bc2b9479f7c561393d95b08d19c432a7',
              'format' : 'iframe',
              'height' : 90,
              'width' : 728,
              'params' : {}
            };
          `}
        </Script>
        <Script
          src="//www.highperformanceformat.com/bc2b9479f7c561393d95b08d19c432a7/invoke.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
