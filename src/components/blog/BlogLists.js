import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogLists({ blogData }) {
  const [imageData, setImageData] = useState({});

  useEffect(() => {
    async function fetchImages() {
      const imageMap = {};
      for (const blog of blogData) {
        if (blog.image) {
          try {
            const response = await fetch(blog.image);
            if (response.ok) {
              const blob = await response.blob();
              const imageUrl = URL.createObjectURL(blob);
              imageMap[blog.id] = imageUrl;
            } else {
              console.error(
                `Failed to fetch image for blog with ID ${blog.id}`
              );
            }
          } catch (error) {
            console.error(
              `Error fetching image for blog with ID ${blog.id}:`,
              error
            );
          }
        }
      }
      setImageData(imageMap);
    }

    fetchImages();
  }, [blogData]);

  useEffect(() => {
    console.log("Received blog data:", blogData);
  }, [blogData]);
  

  return (
    <div className="space-y-10">
      {blogData &&
        blogData.map((blog) => (
          <div key={blog.id} className="space-y-4 ">
            {blog.image && imageData[blog.id] && (
              <div className="card-zoom bg-gray-100 w-[100%] h-[300px] sm:h-[450px] rounded-xl ">
                <button className="absolute z-10 top-4 end-4 bg-indigo-500 hover:bg-indigo-700 text-white hover:text-gray-200 shadow-2xl hover:shadow-none font-semibold p-2 rounded-full "></button>
                <div className="card-zoom-image">
                  <Link prefetch={false} href={`blog/${blog.slug}`}>
                    <Image
                      // src={`${blog.image}?t=${new Date().getTime()}`}
                      src={imageData[blog.id]}
                      alt="img"
                      fill
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </div>
              </div>
            )}
            <div className="flex flex-col justify-center items-center space-y-6 pb-6">
              <Link prefetch={false} href={`blog/${blog.slug}`}>
                <h1 className="text-gray-800 hover:text-red-600 hover:underline text-2xl font-bold">
                  {blog.title}
                </h1>
              </Link>

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
              {blog.description && (
                <p className="text-center text-gray-600 text-base font-normal">
                  {blog.description.slice(0, 150)}...
                </p>
              )}
              {blog.authorName && (
                <p className="text-center text-gray-600 text-base font-normal">
                  {" "}
                  By {blog.authorName}
                </p>
              )}
              {blog.publishDate && (
                <p className="text-center text-gray-500 text-sm">
                  Published on {new Date(blog.publishDate).toLocaleDateString()}
                </p>
              )}
              <Link
                prefetch={false}
                href={`blog/${blog.slug}`}
                className="bg-indigo-500 hover:bg-gray-800 text-white hover:text-gray-200 shadow-2xl hover:shadow-none font-semibold px-6 py-2 rounded-full "
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}
