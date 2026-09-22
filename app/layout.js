import { Work_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Work Sans for body/UI text everywhere. Plus Jakarta Sans for big display
// headlines only (hero, section titles, case study statements) — a warmer,
// more distinctive geometric sans that's become the go-to for individual
// design portfolios, vs. Inter's more neutral SaaS/product-UI feel. Clean
// kerning at large sizes (no g/y collision like Work Sans Bold had).
const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Gamze Bozkurt — Product Designer",
  description: "Senior product designer focused on B2B and enterprise UX.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${workSans.variable} ${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
