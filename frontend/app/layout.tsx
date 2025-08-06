import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  preload: false
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  preload: false
});

export const metadata: Metadata = {
  title: "GYM exercises",
  description: "Access 1300+ exercises and professional fitness guidance.",
  keywords: "fitness, exercises, workout, training, gym, health",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en"  suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/assets/images/Logo.png" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          {children}
          <Toaster
            position="bottom-right"
            richColors={false}
            duration={4000}
            toastOptions={{
              className: 'transform transition-all duration-500 ease-out hover:scale-105',
              style: {
                background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f97316 100%)',
                padding: '20px 28px',
                fontSize: '16px',
                fontWeight: '700',
                borderRadius: '20px',
                border: 'none',
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                boxShadow: `
                  0 20px 40px rgba(220, 38, 38, 0.4),
                  0 10px 20px rgba(220, 38, 38, 0.3),
                  0 0 0 1px rgba(255,255,255,0.15) inset,
                  0 2px 4px rgba(0,0,0,0.1)
                `,
                backdropFilter: 'blur(10px)',
                minHeight: '70px',
                minWidth: '320px',
                maxWidth: '500px',
              },

              classNames: {
                success: 'bg-gradient-to-r from-gymshock-success-500 via-gymshock-success-600 to-gymshock-energy-500',
                error: 'bg-gradient-to-r from-gymshock-primary-700 via-gymshock-primary-600 to-gymshock-primary-500',
                warning: 'bg-gradient-to-r from-gymshock-energy-600 via-gymshock-energy-500 to-gymshock-warning-500',
                info: 'bg-gradient-to-r from-gymshock-social-blue via-blue-500 to-gymshock-primary-500',
              }
            }}
            theme="dark" // Mejor contraste para colores vibrantes
          />
        </AuthProvider>
      </body>
    </html>
  );
}
export default RootLayout;