"use client";
import AuthProviders from "@/components/providers/AuthProviders";
import "../globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
import SideNav from "@/components/sidebar/SideNav";

const montserrat = Montserrat({
  weight: ["300", "400"],
  subsets: ["latin"],
});

export default function BlogLayout({ children }) {
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
    <html lang="en" className="h-full bg-[#f2f2f2]">
      <head>
        <link rel="icon" href={faviconImageUrl} sizes="any" />
      </head>
      <body className={montserrat.className} suppressHydrationWarning={true}>
        <AuthProviders>
          <div className="md:flex m-12">
            <div className="w-full sm:w-2/5 lg:w-1/5">
              <SideNav />
            </div>
            <section className="my-2 w-full sm:w-4/5 md:mx-4 md:my-0">
              {children}
            </section>
          </div>
        </AuthProviders>
      </body>
    </html>
  );
}
