import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/header/header";
import { CartProvider } from "@/app/contexts/CartContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "NEXTjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div>
            <Header /> {children}
            <footer className="fixed bottom-0">footer</footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
