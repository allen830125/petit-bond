import type { Metadata } from "next";
import "./globals.css";

// Cormorant Garamond 字體
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500-italic.css";

// Noto Serif TC 字體
import "@fontsource/noto-serif-tc/400.css";
import "@fontsource/noto-serif-tc/500.css";
import "@fontsource/noto-serif-tc/600.css";
import "@fontsource/noto-serif-tc/700.css";

// Noto Sans TC 字體
import "@fontsource/noto-sans-tc/300.css";
import "@fontsource/noto-sans-tc/400.css";
import "@fontsource/noto-sans-tc/500.css";
import "@fontsource/noto-sans-tc/700.css";

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
    <html lang="zh-TW" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col font-noto-sans-tc">
        {children}
      </body>
    </html>
  );
}
