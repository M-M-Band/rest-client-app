import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';

import './globals.css';
import Header from '@/components/dashboard-layout/Header';
import Footer from '@/components/dashboard-layout/Footer';

const lexend = Lexend({
  variable: '--font-lexend',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'REST Client',
  description: 'Send HTTP request and view the response',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${lexend.variable}`}>
        <div className='appWrapper'>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
