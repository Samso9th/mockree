import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from '@/components/ui/animated-modal';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const font = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mockree",
  description: "AI Generated Job Interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={font.className}>
          <SkeletonTheme baseColor="#313131" highlightColor='#525252'>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ModalProvider>
                {children}
              </ModalProvider>
            </ThemeProvider>
          </SkeletonTheme>
        </body>
      </html>
    </ClerkProvider>
  );
}
