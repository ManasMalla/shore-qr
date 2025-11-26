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
      <head>
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"></link>
<link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap" rel="stylesheet"></link>
      </head>
      <body>{children}</body>
    </html>
  );
}
