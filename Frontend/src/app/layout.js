import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "SmartCash",
    description: "SmartCash",
};

export default async function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <TooltipProvider delayDuration={200}>
                        {children}
                </TooltipProvider>
                <Toaster />
            </body>
        </html>
    );
}
