import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppProviders from "@/Providers/AppProviders";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider
          afterSignOutUrl={"/sign-in "}
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-primary hover:bg-primary/90 text-sm !shadow-none",
            },
          }}
        >
          <AppProviders> {children}</AppProviders>
          <Toaster richColors />
        </ClerkProvider>
      </body>
    </html>
  );
}
