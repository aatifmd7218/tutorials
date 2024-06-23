import Footer from "@/components/footer/Footer";
import TutorialPage from "@/components/tutorial/TutorialPage";
import React from "react";

export const metadata = {
  metadataBase: new URL("https://biznouserapp.vercel.app/"),
  keywords: ["Hey Blog User", "Top Location Blogs", "Top Blogs", "Blogs"],
  title: {
    default: "Tutorial Page",
  },
  openGraph: {
    description: "Tutorial Page description",
  },
};

export default function Page() {
  return (
    <>
      <TutorialPage />
      <footer>
        <Footer />
      </footer>
    </>
  );
}
