"use client";
import AuthProviders from "@/components/providers/AuthProviders";
import "../globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { useEffect, useState } from "react";


const montserrat = Montserrat({
  weight: ["300", "400"],
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  const [faviconImageUrl, setFaviconImageUrl] = useState("");
  useEffect(() => {
    const getfaviconimage = async () => {
      try {
        const baseUrl = "https://tutorials-fawn-omega.vercel.app";
        const response = await fetch(baseUrl + "/api/combinedapi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ apiName: "getfavicon" }),
        });

        const { result } = await response.json();
        setFaviconImageUrl(result?.image);
      } catch (error) {
        console.log("error", error);
      }
    };
    getfaviconimage();
  }, []);
  return (
    <html lang="en" className="h-full bg-white">
      <head>
        <link rel="icon" href={faviconImageUrl} sizes="any" />
      </head>

      <body className={montserrat.className} suppressHydrationWarning={true}>
        <AuthProviders>
          <Navbar />
          <section>{children}</section>
          <Footer />
        </AuthProviders>
      </body>
    </html>
  );
}
