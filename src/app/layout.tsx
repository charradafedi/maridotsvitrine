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
    default:
      "Maridots | International Pilot · Revenue Assurance for Every Enterprise",
    template: "%s | Maridots",
  },
  description:
    "International, Tunisia-led maritime compliance and risk platform. Selective pilots for revenue assurance, lower latency, efficiency, productivity, and security — sophisticated capability for every enterprise scale. Co-creation only; not open for public purchase or licensing.",
  keywords: [
    "maritime revenue assurance",
    "international fleet compliance",
    "maritime compliance platform",
    "fleet operational efficiency",
    "SME maritime software",
    "enterprise pilot program",
    "ISM Code workflows",
    "Tunisia maritime technology",
    "sustainable maritime operations",
  ],
  applicationName: "Maridots",
  openGraph: {
    type: "website",
    siteName: "Maridots",
    locale: "en_GB",
    url: "/",
    title:
      "Maridots | International Pilot · Revenue Assurance for Every Enterprise",
    description:
      "International Tunisia-led pilots for maritime compliance and risk. Sophisticated capability for every enterprise scale — co-creation only, not open for public purchase or licensing.",
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
    title:
      "Maridots | International Pilot · Revenue Assurance for Every Enterprise",
    description:
      "International pilots for maritime revenue assurance — sophisticated solutions for every enterprise scale.",
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
