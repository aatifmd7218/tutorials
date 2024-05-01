import SubTutorialPage from "@/components/tutorial/SubTutorialPage";

export const metadata = {
  metadataBase: new URL("https://tutorial-app-phi.vercel.app/"),
  keywords: ["Hey Blog User", "Top Location Blogs", "Top Blogs", "Blogs"],
  title: {
    default: "Tutorial Subtopic Page",
  },
  openGraph: {
    description: "Tutorial Subtopic Page description",
  },
};

export default function SlugPage({ params }) {
  return <SubTutorialPage params={params} />;
}
