import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elite Burguer & Açaí",
  description: "Hambúrgueres artesanais e açaí cremoso. Peça online com PIX ou cartão.",
  openGraph: {
    title: "Elite Burguer & Açaí",
    description: "Hambúrgueres artesanais e açaí cremoso.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
