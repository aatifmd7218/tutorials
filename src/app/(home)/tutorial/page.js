import TutorialPage from "@/components/tutorial/TutorialPage";

export const metadata = {
  metadataBase: new URL("https://tutorial-app-phi.vercel.app/"),
  keywords: ["Hey Blog User", "Top Location Blogs", "Top Blogs", "Blogs"],
  title: {
    default: "Tutorial Page",
  },
  openGraph: {
    description: "Tutorial Page description",
  },
};

export default function Page() {
  return <TutorialPage />;
}
