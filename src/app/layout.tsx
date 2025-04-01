import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import { Toaster } from 'sonner';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

import './globals.css';

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
          <main>{children}</main>
          <Footer />

          <Toaster
            theme='dark'
            position='bottom-right'
            duration={1500}
          />
        </div>
      </body>
    </html>
  );
}
