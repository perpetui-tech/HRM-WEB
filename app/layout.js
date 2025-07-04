import { Geist, Geist_Mono } from "next/font/google";
import Header from '@/components/Header';
import './globals.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "Maatra HR Portal",
  description: process.env.CREATED_BY,
};

export default function RootLayout({ children }) {
  const appName = process.env.NEXT_PUBLIC_APP_NAME;
  const appLogo = process.env.NEXT_PUBLIC_APP_LOGO;
  const appAddress = process.env.NEXT_PUBLIC_APP_ADDRESS;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <main>{children}</main>
      </body>
    </html>
  );
}
