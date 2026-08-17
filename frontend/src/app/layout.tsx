import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jehoshaphat Ibenye | Web Developer & UI/UX Designer",
  description: "Portfolio of Jehoshaphat Ibenye - Web Developer & UI/UX Designer. Specializing in Next.js, React, TypeScript, and modern responsive interfaces.",
  keywords: ["Jehoshaphat Ibenye", "Web Developer", "UI/UX Designer", "Front-End Developer", "Anchor University", "Computer Science Graduate", "Next.js", "React"],
  authors: [{ name: "Jehoshaphat Ibenye" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} dark`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body className="font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
        {children}
      </body>
    </html>
  );
}
