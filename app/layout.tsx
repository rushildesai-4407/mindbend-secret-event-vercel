import type { Metadata } from "next";
import { Cinzel, Montserrat, Syne, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "52 BEFORE ZERO",
  description: "Survive the Deck. Reach the Crown.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${montserrat.variable} ${syne.variable} ${inter.variable} antialiased font-montserrat`}>
        {/* We removed the floating cards as requested by the new clean aesthetic */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}

