import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Serif_TC, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Petit Bond - 手作寵物飾品",
  description: "精心打造的寵物飾品，每件都是獨一無二的故事",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${cormorant.variable} ${notoSerifTC.variable} ${notoSansTC.variable} h-full antialiased scroll-smooth`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body className="min-h-full flex flex-col font-noto-sans-tc">{children}</body>
    </html>
  );
}
