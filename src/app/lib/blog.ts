import fs from "fs";
import matter from "gray-matter";
import { PostMetadata } from "../components/PostMetadata";

const BLOG_DIR = "data/blog/";

export const getPostMetadata = (): PostMetadata[] => {
  const files = fs.readdirSync(BLOG_DIR);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));

  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`${BLOG_DIR}${fileName}`, "utf8");
    const { data } = matter(fileContents);
    return {
      title: data.title as string,
      date: data.date as string,
      subtitle: data.subtitle as string,
      slug: fileName.replace(".md", ""),
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export interface PostContent {
  data: {
    title: string;
    subtitle: string;
    date: string;
  };
  content: string;
}

export const getPostContent = (slug: string): PostContent => {
  const file = `${BLOG_DIR}${slug}.md`;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    data: {
      title: data.title as string,
      subtitle: data.subtitle as string,
      date: data.date as string,
    },
    content,
  };
};
