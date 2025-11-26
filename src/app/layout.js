import { Lora, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

// Serif font for body text - warm and literary
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Sans-serif for headings - clean and modern
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Alexandra Brito - Life, Code & Everything In Between",
  description: "Personal blog about sewing, coding, gardening, cooking, and creative projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${inter.variable} font-serif antialiased bg-neutral-50`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
