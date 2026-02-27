import type { Metadata } from "next";
import { Cinzel, Montserrat } from "next/font/google";
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
      <body className={`${cinzel.variable} ${montserrat.variable} antialiased font-montserrat`}>
        {/* We removed the floating cards as requested by the new clean aesthetic */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}

