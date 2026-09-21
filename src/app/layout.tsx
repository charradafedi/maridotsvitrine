import type { Metadata, Viewport } from "next";
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
    default: "Maridots | Enterprise Pilot Program · Maritime Compliance & Risk",
    template: "%s | Maridots",
  },
  description:
    "Maridots is evaluating strategic deployment partners through a managed enterprise pilot program for maritime compliance and risk control. Architectures and prototypes are for evaluation and partner onboarding — not open for public purchase or licensing.",
  keywords: [
    "maritime compliance platform",
    "maritime risk architecture",
    "enterprise pilot program",
    "ISM Code workflows",
    "CAPA management",
    "PSC pre-arrival readiness",
    "permit to work maritime",
    "bowtie barrier analysis",
    "fishbone RCA",
    "certificate expiry monitoring",
    "DPA compliance",
    "consultancy bureau audit",
  ],
  applicationName: "Maridots",
  openGraph: {
    type: "website",
    siteName: "Maridots",
    locale: "en_GB",
    url: "/",
    title: "Maridots | Enterprise Pilot Program · Maritime Compliance & Risk",
    description:
      "Managed enterprise pilot program for maritime compliance and risk. Evaluation and partner onboarding only — not available for open commercial licensing or public purchase.",
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
    title: "Maridots | Enterprise Pilot Program · Maritime Compliance & Risk",
    description:
      "Managed enterprise pilot program for maritime compliance and risk — selective partners, not open for public purchase or licensing.",
    images: ["/assets/hero-fleet.png"],
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sourceSans.variable} ${sourceSerif.variable} h-full`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
