import { remark } from "remark";
import html from "remark-html";
import prism from "remark-prism";

export const decodeHtmlEntities = (text) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value.replace(/<br\s*\/?>/gi, "\n");
};

export const markdownToHtml = async (markdown) => {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(prism)
    .process(markdown);
  return result.toString();
};
