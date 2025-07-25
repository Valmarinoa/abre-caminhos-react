import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { Be_Vietnam_Pro } from "next/font/google";
import { Baskervville } from "next/font/google";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-beVietnamPro",
});

const baskervville = Baskervville({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-baskervville",
});

export const metadata: Metadata = {
  title: "Abre Caminhos - Open Paths",
  description: "Shader Experiment by Valentina Marino",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${beVietnamPro.variable} ${baskervville.variable}`}
    >
      <body className="">
        <CustomCursor />

        {children}
      </body>
    </html>
  );
}
