import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sajjad Tahmouresi — Software Engineer",
  description:
    "Self-taught full-stack software engineer & DevOps engineer specializing in Go, JavaScript, and TypeScript. Based in Iran.",
  keywords: [
    "Sajjad Tahmouresi",
    "software engineer",
    "Go developer",
    "full-stack developer",
    "DevOps engineer",
    "TypeScript",
    "JavaScript",
    "Linux",
  ],
  authors: [{ name: "Sajjad Tahmouresi" }],
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
  openGraph: {
    title: "Sajjad Tahmouresi — Software Engineer",
    description:
      "Full-stack software engineer & DevOps engineer specializing in Go, JavaScript, and TypeScript.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <SmoothScroll />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}