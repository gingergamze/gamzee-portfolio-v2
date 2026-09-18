import { Work_Sans } from "next/font/google";
import "./globals.css";

// Work Sans is the only typeface on the site — no serif anywhere.
const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Gamze Bozkurt — Product Designer",
  description: "Senior product designer focused on B2B and enterprise UX.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${workSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
