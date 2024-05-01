import GetBlogBySlug from "@/components/blogwn/GetBlogBySlug";

export async function generateMetadata({ params }) {
  const { slug } = params;
  try {
    const baseUrl = "https://biznouserapp.vercel.app";
    console.log("slug", slug);
    const response = await fetch(baseUrl + "/api/getblog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug }),
    });

    console.log("response", response);

    const { result } = await response.json();
    if (!result) {
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist",
      };
    }
    return {
      title: result?.title,
      openGraph: {
        description: result?.description,
        images: [result?.image],
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist",
    };
  }
}

export async function generateStaticParams() {
  try {
    const baseUrl = "https://biznouserapp.vercel.app";

    const response = await fetch(baseUrl + "/api/getpublishedblogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }

    const { result } = await response.json();

    if (result.length === 0) return [];

    return result.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.log("Error fetching blogs blog3", error);
    return [];
  }
}

export default function SlugPage({ params }) {
  return <GetBlogBySlug params={params} />;
}
