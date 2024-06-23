import BlogPage from "@/components/blog/BlogPage";
import React from "react";
import Head from "next/head";
import Footer from "@/components/footer/Footer";

export default function Page() {
  return (
    <>
      <Head>
        <title>Blog Page</title>
        <meta name="description" content="Blog Page description" />
        <meta
          name="keywords"
          content="Hey Blog User, Top Location Blogs, Top Blogs, Blogs"
        />
        <meta property="og:title" content="Blog Page" />
        <meta property="og:description" content="Blog Page description" />
        <meta
          property="og:url"
          content="https://biznouserapp-git-daisyui-zahids-projects-84a2e499.vercel.app/"
        />
        <meta property="og:type" content="website" />
      </Head>
      <BlogPage />
      <Footer />
    </>
  );
}
