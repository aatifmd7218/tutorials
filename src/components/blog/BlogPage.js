"use client";
import { useState, useEffect } from "react";
// import { blogData } from "@/components/blog1/blogData";
import BlogLists from "@/components/blog/BlogLists";
import UserProfile from "@/components/blog/UserProfile";
import FollowMe from "@/components/blog/FollowMe";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import Pagination from "../../../CommonElements/Pagination";
import Navbar from "../Navbar/Navbar";

const BlogPage = () => {
  const [blogData, setBlogData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/getpublishedblogs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const { result } = await response.json();
        setBlogData(result);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    }

    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const totalBlogs = blogData?.length;
  const blogsPerPage = 6;

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;

  // Slice the data to display only the items for the current page
  const displayedData = blogData.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [totalBlogs]);

  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
  };
  return (
    <>
      <main>
        <Navbar setSelectedCategory={setSelectedCategory} />
        <div className="mx-auto max-w-2xl px-6 py-10 sm:px-8 sm:py-16 lg:max-w-7xl ">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 sm:gap-x-10">
            <div className="col-span-8">
              <BlogLists
                blogData={displayedData}
                selectedCategory={selectedCategory}
              />
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
