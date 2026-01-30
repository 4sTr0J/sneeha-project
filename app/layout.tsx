import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const outfit = Outfit({
    subsets: ["latin"],
    variable: '--font-outfit',
});

export const metadata: Metadata = {
    title: "Sneha | Emotional Support & Wellbeing",
    description: "A digital safe space for cancer and chronic illness patients.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={outfit.className}>
                <div className="bg-mesh">
                    <div className="blob blob-1"></div>
                    <div className="blob blob-2"></div>
                </div>

                <main className="max-w-md md:max-w-3xl mx-auto p-6 pb-28 min-h-screen">
                    {children}
                </main>

                <Navbar />
            </body>
        </html>
    );
}
