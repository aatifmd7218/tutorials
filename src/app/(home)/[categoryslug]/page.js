"use client";
import UserProfile from "@/components/blog/UserProfile";
import FollowMe from "@/components/blog/FollowMe";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import Pagination from "../../../../CommonElements/Pagination";
import BlogLists from "@/components/blog/BlogLists";
import React, { useEffect, useState } from "react";

const SlugPage = ({ params }) => {
  const { categoryslug } = params;
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBlogsByCategory = async () => {
      try {
        const response = await fetch(
          `/api/getpublishedblogs?category=${categoryslug}`
        );
        const data = await response.json();

        if (response.ok && Array.isArray(data.result)) {
          setBlogs(data.result); 
          setCurrentPage(1);
        } else {
          console.error("Error fetching blogs:", data.error);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogsByCategory();
  }, [categoryslug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const totalBlogs = blogs.length;
  const blogsPerPage = 6;

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;

  // Slice the data to display only the items for the current page
  const displayedData = blogs.slice(startIndex, endIndex);


  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
  };

  return (
    <main>
      <div className="mx-auto max-w-2xl px-6 py-10 sm:px-8 sm:py-16 lg:max-w-7xl ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 sm:gap-x-10">
          <div className="col-span-8">
            <BlogLists blogData={displayedData} />
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
  );
};

export default SlugPage;
