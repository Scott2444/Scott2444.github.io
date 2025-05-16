import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import './globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const poppins = Poppins({
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Scott Haakenson",
  description: "Software Portfolio of Scott Haakenson",
  icons: {
    icon: [
      { url: '/images/Personal_Logo.svg', type: 'image/svg+xml' }
    ],
    shortcut: ['/images/Personal_Logo.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
