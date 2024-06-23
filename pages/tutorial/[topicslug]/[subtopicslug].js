import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import UserProfile from "@/components/blog/UserProfile";
import FollowMe from "@/components/blog/FollowMe";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import { fetchSubTutorialsBySubtopic } from "../../lib/fetchSubTutorialsBySubtopic";
import Footer from "@/components/footer/Footer";

export async function getServerSideProps({ params }) {
  try {
    console.log("params", params);
    const { subtopicslug } = params;
    let { subTutorialsData, currentSubTopicContent } =
      await fetchSubTutorialsBySubtopic(subtopicslug);
    return {
      props: {
        subTutorialsData,
        currentSubTopicContent,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default function SubTopicPage({
  subTutorialsData,
  currentSubTopicContent,
}) {
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

  if (
    subTutorialsData.length > 0 &&
    subTutorialsData[0].topicstatus === "inactive"
  ) {
    return <div>Access Denied</div>;
  }

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
      <header>
        <Navbar />
      </header>
      <main>
        <div className="mx-auto px-6 py-10 sm:px-8 sm:py-16">
          {/* <div className="mx-auto max-w-2xl px-6 py-10 sm:px-8 sm:py-16 lg:max-w-7xl "> */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 sm:gap-x-10">
            <div className="col-span-2">
              {subTutorialsData.map((subtutorial) => (
                <Link
                  prefetch={false}
                  key={subtutorial.id}
                  href={`/tutorial/${subtutorial.topicslug}/${subtutorial.slug}`}
                  className="text-[#dc2626] hover:underline font-bold"
                >
                  <h6>{subtutorial.title}</h6>
                </Link>
              ))}
            </div>
            <div className="col-span-7">
              <div className="card w-full h-full bg-base-100 rounded-md">
                <form className="card-body">
                  {subTutorialsData.length > 0 && (
                    <>
                      <h1 className="pt-4 text-center text-3xl font-semibold">
                        {subTutorialsData[0].currentsubtopictitle}
                      </h1>
                      <h3
                        dangerouslySetInnerHTML={{
                          __html: currentSubTopicContent,
                        }}
                      ></h3>
                    </>
                  )}
                  <div className="flex flex-wrap sm:mx-[1%] space-x-2"></div>
                </form>
              </div>
            </div>

            <div className=" col-span-3 space-y-10">
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
    </>
  );
}
