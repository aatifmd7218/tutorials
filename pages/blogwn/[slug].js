import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchBlogData } from "../../lib/fetchBlogData";
import Layoutwn from "../../components/Layoutwn";
import Blog from "@/components/blog/Blog";

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
  const [isAdmin, setIsAdmin] = useState(false);  // Set as boolean
  const [userId, setUserId] = useState(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (session?.user) {
      setUserId(session.user.id);
      setIsAdmin(session.user.name === "admin");  // Boolean comparison for admin
    } else {
      setUserId(null);
      setIsAdmin(false);
    }
  }, [session, status]);

  if (status === "loading") {
    return <div>Loading...</div>; // Show loading while session is being fetched
  }

  const canAccessContent = isAdmin || blog.author_id === userId;  // Access allowed if admin or author

  if(!session){
    return <div>Access Denied</div>; 
  }

  if (!canAccessContent) {
    return <div>Access Denied</div>; // Show access denied if user is not allowed
  }

  return (
    <Layoutwn>
      <Blog blog={blog} />
    </Layoutwn>
  );
}
