import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NetVal - Net Worth Tracker',
  description: 'Track and manage your net worth with ease',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
