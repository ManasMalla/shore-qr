import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Shore Mystery QR",
  description: "Scan to discover the mystery of Shore'26",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
