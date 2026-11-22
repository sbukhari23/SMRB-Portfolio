import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { identity, bios, links } from "@/content/profile";
import { withBase } from "@/lib/withBase";

// Absolute URLs built by hand (siteOrigin + withBase(...)) rather than via
// Next's `metadataBase` resolution: metadataBase + a leading-slash relative
// path resolves against the domain root, silently dropping the GitHub
// Pages basePath (the same class of bug withBase() exists to prevent for
// next/image, per lib/withBase.ts).
const siteOrigin = "https://sbukhari23.github.io";
const siteUrl = `${siteOrigin}${withBase("")}`;
const ogImageUrl = `${siteOrigin}${withBase("/og-image.png")}`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: identity.displayName,
  url: siteUrl,
  sameAs: [links.github, links.linkedin, links.upwork],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "National University of Sciences and Technology (NUST)",
  },
};

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const title = "Muneeb Ur Rehman · Full-stack MERN developer";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s · Muneeb Ur Rehman",
  },
  description: bios.short,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Muneeb Ur Rehman",
    title,
    description: bios.short,
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "Muneeb Ur Rehman" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: bios.short,
    images: [ogImageUrl],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans">
        {/* Static, trusted JSON-LD built from content/profile.ts, not user input. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
