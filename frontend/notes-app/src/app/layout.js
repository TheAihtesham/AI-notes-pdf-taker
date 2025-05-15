"use client"; 

import "./globals.css";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { metadata } from "./metadata"; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
