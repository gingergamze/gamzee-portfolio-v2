import { Work_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, OG_IMAGE, LINKEDIN_URL } from "./lib/site";

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
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s | Gamze Bozkurt" },
  description: SITE_DESCRIPTION,
  keywords: [
    "Gamze Bozkurt",
    "product designer Amsterdam",
    "UX researcher",
    "internal tools UX",
    "enterprise UX",
    "B2E software design",
    "workflow design",
    "data-rich products",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_NL",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Gamze Bozkurt — Product Designer & UX Researcher" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

// Tells search engines who this site is about (a person, her job, her place).
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Product Designer & UX Researcher",
  description: SITE_DESCRIPTION,
  address: { "@type": "PostalAddress", addressLocality: "Amsterdam", addressCountry: "NL" },
  knowsAbout: ["UX research", "Product design", "Internal tools", "Enterprise UX", "Workflow design", "Project management", "Service design"],
  sameAs: [LINKEDIN_URL],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${workSans.variable} ${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
