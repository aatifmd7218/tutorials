import GetSubTopicBySlug from "@/components/subtopic/GetSubTopicBySlug";

export async function generateMetadata({ params }) {
  const { subtopicslug } = params;
  try {
    const baseUrl = "https://tutorial-app-phi.vercel.app";
    const response = await fetch(baseUrl + "/api/combinedapi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiName: "getsubtutorialsbysubtopicslug",
        subtopicslug,
      }),
    });

    const { result } = await response.json();
    if (!result) {
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist",
      };
    }
    return {
      title: result[0]?.currentsubtopictitle,
      openGraph: {
        description: result[0]?.currentsubtopicdesc,
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

// export async function generateStaticParams() {
//   try {
//     const baseUrl = "https://biznouserapp.vercel.app";

//     const response = await fetch(baseUrl + "/api/getpublishedblogs", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch blogs");
//     }

//     const { result } = await response.json();

//     if (result.length === 0) return [];

//     return result.map((post) => ({
//       slug: post.slug,
//     }));
//   } catch (error) {
//     console.log("Error fetching blogs blog3", error);
//     return [];
//   }
// }

export default function SubtopicSlugPage({ params }) {
  return <GetSubTopicBySlug params={params} />;
}
