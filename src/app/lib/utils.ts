import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function classname(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

import fs from "fs";
import matter from "gray-matter";
import { PostMetadata, WorkMetadata } from "../components/PostMetadata";

export const getPostMetadata = (): PostMetadata[] => {
  const folder = "data/blog/";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));

  // Get gray-matter data from each file.
  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`data/blog/${fileName}`, "utf8");
    const matterResult = matter(fileContents);
    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      subtitle: matterResult.data.subtitle,
      slug: fileName.replace(".md", ""),
    };
  });
  const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return sortedPosts;
};



export const getWorkMetadata = (): WorkMetadata[] => {
  const folder = "data/work/";
  const files = fs.readdirSync(folder);
  const markdownWorks = files.filter((file) => file.endsWith(".md"));

  // Get gray-matter data from each file.
  const works = markdownWorks.map((fileName) => {
    const fileContents = fs.readFileSync(`data/work/${fileName}`, "utf8");
    const matterResult = matter(fileContents);
    return {
      title: matterResult.data.title,
      subtitle: matterResult.data.subtitle,
      img: matterResult.data.img,
      link: matterResult.data.link
    };
  });

  return works;
};



export const getPostContent = (slug: string) => {
    const folder = "data/blog/";
    const file = `${folder}${slug}.md`;
    const content = fs.readFileSync(file, "utf8");
    const matterResult = matter(content);
    return matterResult;
  };


  



  
