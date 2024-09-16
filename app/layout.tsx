import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const museoModerno = localFont({
  src: [
    {
      path: '/fonts/MuseoModerno-ExtraLight.ttf',
      weight: '200',
      style: 'light',
    },
    {
      path: '/fonts/MuseoModerno-Regular.ttf',
      weight: '400',
      style: 'regular',
    },
    {
      path: '/fonts/MuseoModerno-Bold.ttf',
      weight: '700',
      style: 'bold',
    },
    {
      path: '/fonts/MuseoModerno-Black.ttf',
      weight: '900',
      style: 'black',
    },
  ],
  variable: '--font-museo-moderno',
});

export const metadata = {
  title: 'My Project',
  description: 'A description of my project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${museoModerno.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
