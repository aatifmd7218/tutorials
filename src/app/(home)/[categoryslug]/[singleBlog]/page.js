"use client";
import BlogPage from "@/components/blog/BlogPage";

const singleBlog = ({ params }) => {
  const { singleBlog } = params;
  
  return (
    <main>
      <BlogPage singleBlog={singleBlog} />
    </main>
  );
};

export default singleBlog;
