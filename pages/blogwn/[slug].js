import React from "react";
// import { blogData } from "@/components/blog1/blogData"
// import BlogLists from "@/components/blog1/BlogLists"
import Blog from "@/components/blog/Blog";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchBlogData } from "../../lib/fetchBlogData";
import Layoutwn from "~/components/Layoutwn";

export async function getServerSideProps({ params }) {
  try {
    console.log("params", params);
    const { slug } = params;
    let blog = await fetchBlogData(slug);
    console.log("blog", blog.content);
    return {
      props: { blog },
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default function BlogPage({ blog }) {
  const [isAdmin, setIsAdmin] = useState("N");
  const [userId, setUserId] = useState();

  const [blogData, setBlogData] = useState({});

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    setUserId(session?.user?.id);
    if (session?.user?.name === "admin") {
      setIsAdmin("Y");
    }
  }, [session, status]);

  if (status === "loading") {
    return <div></div>;
  }

  const canAccessContent = isAdmin === "Y" || blogData.author_id == userId;

  if (!canAccessContent) {
    return <div>Access Denied</div>;
  }

  return (
    canAccessContent && (
      <Layoutwn>
        <Blog blog={blog} />
      </Layoutwn>
    )
  );
}
