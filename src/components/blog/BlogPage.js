"use client";
import { useState, useEffect } from "react";
import BlogLists from "@/components/blog/BlogLists";
import UserProfile from "@/components/blog/UserProfile";
import FollowMe from "@/components/blog/FollowMe";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import Pagination from "../../../CommonElements/Pagination";
import SingleBlogPage from "./SingleBlogPage";


const BlogPage = ({data,type}) => {
  
const [currentPage, setCurrentPage] = useState(1);
  const totalBlogs = data?.length;
  const blogsPerPage = 6;

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
console.log(data)

  useEffect(() => {
    setCurrentPage(1);
  }, [totalBlogs]);

  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
  };
  return (
    <>
      <main>
        <div className="mx-auto max-w-2xl px-6 py-10 sm:px-8 sm:py-16 lg:max-w-7xl ">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 sm:gap-x-10">
            <div className="col-span-8">
            {type === "category" ?  <BlogLists
                blogData={data} 
              />:<SingleBlogPage blog={data}/>} 
              <Pagination
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                totalBlogs={totalBlogs}
                blogsPerPage={blogsPerPage}
                startIndex={startIndex}
                endIndex={endIndex}
              />
            </div>

            <div className=" col-span-4 space-y-10">
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

export default BlogPage;
