import { remark } from "remark";
import html from "remark-html";
import prism from "remark-prism";
import breaks from "remark-breaks";

const markdownToHtml = async (markdown) => {
  console.log("log8");
  const result = await remark()
    .use(breaks) // Add this line to preserve line breaks
    .use(html, { sanitize: false })
    .use(prism)
    .process(markdown);
  console.log("log9", result);
  console.log("log10", result.toString());
  return result.toString();
};

export const fetchBlogData = async (slug) => {
  console.log("log1", slug);
  const response = await fetch("http://localhost:3000/api/getblog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug }),
  });
  console.log("log2");
  const { error, result } = await response.json();
  console.log("log3");
  if (error) {
    console.log("log4");
    console.error("Blog Get error:", error);
    throw new Error("Blog fetch failed");
  }
  console.log("log5");

  // let { data, content } = matter(result.content);
  // console.log("log6", content);
  let content = result.content
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/^<p>/, "")
    .replace(/<\/p>$/, "")
    .replace(/<\/?p>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

  console.log("log7", content);
  content = await markdownToHtml(content || "");
  console.log("log11", content);
  return {
    ...result,
    content,
  };
};
