import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import UserProfile from "@/components/blog/UserProfile";
import FollowMe from "@/components/blog/FollowMe";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import Blog from "@/components/blog/Blog";
import Footer from "@/components/footer/Footer";

export default function Layout({ children }) {
  const [theme, setTheme] = useState("okaidia");
  const meta = {
    title: "Blog App",
    description:
      "Example using Prism / Markdown with Next.js including switching syntax highlighting themes.",
    cardImage:
      "https://og-image.now.sh/**Prism**%20with%20Next.js.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg",
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://unpkg.com/prismjs@0.0.1/themes/prism-${theme}.css`;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [theme]);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta charSet="utf-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="robots" content="follow, index" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <meta content={meta.description} name="description" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.cardImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vercel" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.cardImage} />
      </Head>
      <div
        style={{
          overflowY: "scroll",
          scrollbarColor: "white white",
          scrollbarWidth: "thin",
          height: "100vh",
        }}
      >
        <header>
          <Navbar />
        </header>
        <main>
          <div className="mx-auto max-w-2xl px-6 sm:px-8 py-10 sm:py-16 lg:max-w-7xl ">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 sm:gap-x-10">
              <div className="col-span-8">{children}</div>

              <div className=" col-span-4 space-y-10">
                <UserProfile />
                <FollowMe />
                <FeaturedPosts />
              </div>
            </div>
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}
