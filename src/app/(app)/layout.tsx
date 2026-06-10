// src/app/layout.tsx
import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Client Stage Gate Tracker",
  description: "Acesoft project tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en" className={`${hankenGrotesk.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
    //   <body className="font-['Hanken_Grotesk'] antialiased" suppressHydrationWarning>{children}</body>
    // </html>
		<>{children}</>
  );
}