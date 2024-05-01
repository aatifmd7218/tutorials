"use client";
import React from "react";
// import { blogData } from "@/components/blog1/blogData"
// import BlogLists from "@/components/blog1/BlogLists"
import UserProfile from "@/components/blog/UserProfile";
import FollowMe from "@/components/blog/FollowMe";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import Blog from "@/components/blog/Blog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const GetSubTopicBySlug = ({ params }) => {
  const [isAdmin, setIsAdmin] = useState("N");
  const [userId, setUserId] = useState();
  const [loadingComplete, setLoadingComplete] = useState(false);
  const { subtopicslug } = params;

  const [subTopicData, setSubTopicData] = useState({});

  const { data: session, status } = useSession();

  const handleGetSubTopic = async (e) => {
    try {
      const response = await fetch("/api/combinedapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiName: "getsubtopicbyslug",
          subtopicslug,
        }),
      });

      const { error, result } = await response.json();

      setSubTopicData(result);

      if (error !== undefined) {
        console.log("Subtopic Get error:", error);
      }
    } catch (error) {
      console.error("Subtopic Get operation error", error);
    } finally {
      setLoadingComplete(true);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        if (subtopicslug) {
          await handleGetSubTopic();
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    }
    fetchData();
  }, [subtopicslug]); // Add slug as dependency to rerun effect when slug changes

  //   useEffect(() => {
  //     if (status === "loading") {
  //       return;
  //     }

  //     setUserId(session?.user?.id);
  //     if (session?.user?.name === "admin") {
  //       setIsAdmin("Y");
  //     }
  //   }, [session, status]);

  if (status === "loading" || !loadingComplete) {
    return <div></div>;
  }

  const canAccessContent =
    session?.user?.name === "admin" ||
    (subTopicData && subTopicData.author_id == session?.user?.id);

  if (!canAccessContent) {
    return <div>Access Denied</div>;
  }

  return (
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
                            __html: subTopicData.content,
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
    </div>
  );
};

export default GetSubTopicBySlug;
