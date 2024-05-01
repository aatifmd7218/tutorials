"use client";
import { useState, useEffect } from "react";
// import { blogData } from "@/components/blog1/blogData";
import UserProfile from "@/components/blog/UserProfile";
import FollowMe from "@/components/blog/FollowMe";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import Link from "next/link";

const GetSubTopicBySlug = ({ params }) => {
  const [subTutorialsData, setSubTutorialsData] = useState([]);

  const { subtopicslug } = params;

  const handleGetSubTutorials = async (e) => {
    try {
      const response = await fetch("/api/combinedapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiName: "getsubtutorialsbysubtopicslug",
          subtopicslug,
        }),
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("subTutorials by subtopic slug Get error:", error);
      }
      setSubTutorialsData(result);
    } catch (error) {
      console.error("subTutorials by subtopic slug Get operation error", error);
    }
  };

  useEffect(() => {
    handleGetSubTutorials();
  }, []);

  if (
    subTutorialsData.length > 0 &&
    subTutorialsData[0].topicstatus === "inactive"
  ) {
    return <div className="mt-20">Access Denied</div>;
  }

  return (
    <>
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
                          __html: subTutorialsData[0].currentsubtopiccontent,
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
    </>
  );
};

export default GetSubTopicBySlug;
