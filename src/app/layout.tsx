'use client';
import { ProviderStore } from "../../public/config/ProviderStore";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProviderStore>
      <html lang="en">
        <head>
          <title>Nguyễn Trung Kiên</title>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"></link>
        </head>
        <body>
          {children}
        </body>
      </html>
    </ProviderStore>
  );
}
