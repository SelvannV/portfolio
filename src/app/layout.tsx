import type { Metadata } from "next";
import { Geist, Geist_Mono, Martian_Mono } from "next/font/google";
import "./globals.css";

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
};

const themeScript = `
  (() => {
    try {
      const saved = localStorage.getItem("portfolio-theme");
      const theme = ["system", "light", "dark"].includes(saved)
        ? saved
        : "system";

      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      const isDark =
        theme === "dark" || (theme === "system" && prefersDark);

      document.documentElement.classList.toggle("dark", isDark);
    } catch {}
  })();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${martianMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
