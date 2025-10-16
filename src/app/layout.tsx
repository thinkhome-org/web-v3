/**
 * App Root Layout
 * - Provides global fonts, metadata, and the dark theme class.
 * - Renders the persistent Navbar and optional Vercel Toolbar in development.
 */
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ThinkHome",
    description: "Smart living, beautifully simple.",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const shouldInjectToolbar = process.env.NODE_ENV === "development";
    return (
        <html lang="en" className="dark">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Navbar />
                {children}
                <Analytics />
                <SpeedInsights />
                {shouldInjectToolbar && <VercelToolbar />}
            </body>
        </html>
    );
}
