import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JSON UI Schema Form",
  description: "A JSON UI Schema Form built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster
          richColors
          toastOptions={{
            style: {
              position: "absolute",
              bottom: "10px",
              right: "10px",
              zIndex: 9999,
            },
          }}
        />
      </body>
    </html>
  );
}
