import React from "react";
import Head from "next/head";
import UserProfile from "@/components/blog/UserProfile";
import FollowMe from "@/components/blog/FollowMe";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Footer from "@/components/footer/Footer";
import { fetchSubTopicBySlug } from "../../lib/fetchSubTopicBySlug";

export async function getServerSideProps({ params }) {
  try {
    console.log("params", params);
    const { subtopicslug } = params;
    let { subTopicData, content } = await fetchSubTopicBySlug(subtopicslug);
    return {
      props: {
        subTopicData,
        content,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default function SubTopicWnPage({ subTopicData, content }) {
  const { data: session, status } = useSession();

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

  if (status === "loading") {
    return <div></div>;
  }

  const canAccessContent =
    session?.user?.name === "admin" ||
    (subTopicData && subTopicData.author_id == session?.user?.id);

  if (!canAccessContent) {
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
      <div
        style={{
          overflowY: "scroll",
          scrollbarColor: "white white",
          scrollbarWidth: "thin",
          height: "100vh",
        }}
      >
        <main>
          <div className="mx-auto max-w-2xl px-6 sm:px-8 py-6 md:py-0 lg:max-w-7xl ">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 sm:gap-x-10">
              <div className="col-span-8">
                <div className="card w-full h-full bg-base-100 rounded-md">
                  <form className="card-body">
                    {subTopicData && (
                      <>
                        <div className="py-4 ">
                          <p className="font-sans text-base text-center font-bold  text-black">
                            Preference: {subTopicData.preference}
                          </p>
                          <h1
                            className={`font-sans text-3xl lg:text-4xl font-bold text-center  text-black`}
                          >
                            {subTopicData.title}
                          </h1>
                        </div>

                        <div className="bg-white p-6 rounded-lg ">
                          <h2 className="text-2xl text-black font-sans font-bold mb-4">
                            {subTopicData.description}
                          </h2>
                          <p
                            className="text-base text-gray-700 font-serif"
                            dangerouslySetInnerHTML={{
                              __html: content,
                            }}
                          ></p>
                        </div>
                      </>
                    )}
                    <div className="flex flex-wrap sm:mx-[1%] space-x-2"></div>
                  </form>
                </div>
              </div>

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
