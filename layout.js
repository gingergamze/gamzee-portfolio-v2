import { Montserrat, Inter, Carrois_Gothic } from "next/font/google";
import "./globals.css";

const carroisGothic = Carrois_Gothic({
  variable: "--font-carrois-gothic",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Gamze Bozkurt — Product Designer",
  description: "Senior product designer focused on B2B and enterprise UX.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable} ${carroisGothic.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}