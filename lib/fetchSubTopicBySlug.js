import { remark } from "remark";
import html from "remark-html";
import prism from "remark-prism";
import breaks from "remark-breaks";

const markdownToHtml = async (markdown) => {
  const result = await remark()
    .use(breaks) // Add this line to preserve line breaks
    .use(html, { sanitize: false })
    .use(prism)
    .process(markdown);
  return result.toString();
};

export const fetchSubTopicBySlug = async (subtopicslug) => {
  const response = await fetch("http://localhost:3000/api/combinedapi", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apiName: "getsubtopicbyslug",
      subtopicslug,
    }),
  });
  const { error, result } = await response.json();
  if (error) {
    console.error("Sub Topic Get error:", error);
    throw new Error("Sub Topic fetch failed");
  }
  let content = result.content
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/^<p>/, "")
    .replace(/<\/p>$/, "")
    .replace(/<\/?p>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

  content = await markdownToHtml(content || "");
  return {
    subTopicData: result,
    content,
  };
};
