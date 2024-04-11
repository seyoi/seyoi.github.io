import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/app/components/Header/Header";
import "./globals.css";
import { CartProvider } from "@/app/contexts/CartContext";
import { AuthStateProvider } from "@/app/contexts/AuthContext";
import { ProductProvider } from "@/app/contexts/ProductContext";

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
        <ProductProvider>
          <AuthStateProvider>
            <CartProvider>
              <div>
                <Header /> {children}
                {/* <footer className="fixed bottom-0">footer</footer> */}
              </div>
            </CartProvider>
          </AuthStateProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
