import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Sahyogi - AI-Powered Business Solutions",
  description: "Transform your business with AI-powered solutions from Sahyogi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            @keyframes pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.8; transform: scale(1.05); }
            }
            @keyframes shimmer {
              0% { background-position: -1000px 0; }
              100% { background-position: 1000px 0; }
            }
            .animate-on-scroll {
              animation: fadeIn 0.6s ease-out;
            }
            .hover-lift {
              transition: all 0.3s ease;
            }
            .hover-lift:hover {
              transform: translateY(-8px);
              box-shadow: 0 20px 40px rgba(26, 53, 94, 0.15);
            }
            .floating-element {
              animation: float 3s ease-in-out infinite;
            }
            .btn-shimmer {
              position: relative;
              overflow: hidden;
            }
            .btn-shimmer::before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
              animation: shimmer 2s infinite;
            }
            @media (max-width: 768px) {
              .floating-element {
                animation: none;
              }
              * {
                scroll-behavior: smooth !important;
              }
              body {
                font-size: clamp(14px, 2.5vw, 16px);
              }
            }
          `
        }} />
      </head>
      <body className={inter.variable}>
        <Header />
        <div style={{ paddingTop: 'clamp(70px, 10vw, 80px)' }}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
