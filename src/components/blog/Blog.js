"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Prism from "prismjs";

export default function Blog({ blog }) {
  const [imageData, setImageData] = useState(null);
  const [clientContent, setClientContent] = useState("");

  useEffect(() => {
    setClientContent(blog.content);
    Prism.highlightAll();
  }, [blog.content]);

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await fetch(blog.image);
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        const blob = await response.blob();
        setImageData(URL.createObjectURL(blob));
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }

    if (blog.image) {
      fetchImage();
    }
  }, [blog.image]);

  return (
    <div className="space-y-10">
      {
        <div className="space-y-4 ">
          {blog.image && imageData && (
            <div className="card-zoom bg-gray-100 w-full h-[28vh] sm:h-[60vh] rounded-xl ">
              <button className="absolute z-10 top-4 end-4 bg-indigo-500 hover:bg-indigo-700 text-white hover:text-gray-200 shadow-2xl hover:shadow-none font-semibold p-2 rounded-full "></button>
              <div className="card-zoom-image">
                <Image
                  // src={`${blog.image}?t=${new Date().getTime()}`}
                  src={imageData}
                  alt="img"
                  width={1000}
                  height={1000}
                  className="h-[100%]"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col justify-center items-center space-y-6 pb-6">
            <h1 className="text-gray-800 text-2xl font-bold">
              Featured Post : {blog.featuredpost}
            </h1>
            <h1 className="text-gray-800 hover:text-red-600 text-2xl font-bold">
              {blog.title}
            </h1>

            {/* <div className="flex items-center text-gray-500 text-sm">
              <Image
                src={blog.author.image}
                alt={blog.author.imageAlt}
                width={40}
                height={40}
                className="rounded-full m-2 shadow-xl"
              />
              <div>
                By{" "}
                <Link prefetch={false} href={blog.author.authorLink}>
                  {blog.author.firstName}
                </Link>{" "}
                <span className="px-1 ">&#x2022;</span> {blog.author.postDate}{" "}
              </div>
            </div> */}
            {blog.authorName && (
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              
                  By {blog.authorName}
                </p>
              )}
              {blog.publishDate && (
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Published on {new Date(blog.publishDate).toLocaleDateString()}
                </p>
              )}
            {blog.content && (
              <div className="w-full">
                <div
                  className="text-justify text-gray-600 text-base font-normal leading-8 w-full"
                  style={{ overflow: "hidden" }}
                  dangerouslySetInnerHTML={{ __html: clientContent }}
                />
              </div>
            )}
            {/* <p className="text-justify text-gray-600 text-base font-normal leading-8">{blog.content}</p> */}
          </div>
        </div>
      }
    </div>
  );
}
