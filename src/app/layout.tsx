import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maridots.com"),
  title: {
    default: "Maridots | Pre-Launch Technical Preview & Architecture Research",
    template: "%s | Maridots",
  },
  description:
    "Maridots is an international cross-border technology research initiative in maritime compliance and risk architecture. Internal prototypes for technical evaluation — not a commercial software offering.",
  keywords: [
    "maritime compliance research",
    "maritime risk architecture",
    "ISM Code workflows",
    "CAPA research prototype",
    "PSC pre-arrival readiness",
    "permit to work maritime",
    "bowtie barrier analysis",
    "fishbone RCA",
    "certificate expiry monitoring",
    "DPA technical evaluation",
    "consultancy bureau audit research",
  ],
  applicationName: "Maridots",
  openGraph: {
    type: "website",
    siteName: "Maridots",
    locale: "en_GB",
    url: "/",
    title: "Maridots | Pre-Launch Technical Preview & Architecture Research",
    description:
      "International cross-border R&D into maritime compliance and risk architecture. Research prototypes for technical discussion — not for sale or licence.",
    images: [
      {
        url: "/assets/hero-fleet.png",
        width: 1024,
        height: 576,
        alt: "A bulk carrier underway on open sea",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maridots | Pre-Launch Technical Preview & Architecture Research",
    description:
      "Pre-launch technical preview and architecture research in maritime compliance and risk — international team, non-commercial.",
    images: ["/assets/hero-fleet.png"],
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sourceSans.variable} ${sourceSerif.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
