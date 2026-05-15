import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./navbar";
import Footer from "@/app/footer";
import Providers from "./providers";
import Toolbar from "./toolbar";
import Breadcrumbs from "./breadcrumbs";

const bitter = localFont({
  src: [
    {
      path: "../../public/fonts/maxwell/Bitter-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/maxwell/Bitter-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/maxwell/Bitter-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-bitter",
});

const youngSerif = localFont({
  src: "../../public/fonts/maxwell/YoungSerif-Regular.ttf",
  variable: "--font-young-serif",
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "BlackInkPaper Illustration",
  description: "Original illustrations, prints, and commissioned artwork.",
  applicationName:"BlackInkPaper",
  // viewport:{
  //   initialScale:0.9,
  //   width:'device-width',
  //   interactiveWidget:"overlays-content",
  //   minimumScale:0.4,
  // }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bitter.variable} ${youngSerif.variable} antialiased`}>
        <Providers>
          <Navbar />
          <Toolbar/>
          <Breadcrumbs />
          <main> {children} </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
