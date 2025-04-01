import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { Lexend } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Toaster } from 'sonner';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

import './globals.css';
import { routing } from '@/i18n/routing';

const lexend = Lexend({
  variable: '--font-lexend',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'REST Client',
  description: 'Send HTTP request and view the response',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${lexend.variable}`}>
        <NextIntlClientProvider>
          <div className='appWrapper'>
            <Header />
            <main>{children}</main>
            <Footer />

            <Toaster
              theme='dark'
              position='bottom-right'
              duration={1500}
            />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
