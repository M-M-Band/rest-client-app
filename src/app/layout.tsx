import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';

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
        {children}
      </body>
    </html>
  );
}
