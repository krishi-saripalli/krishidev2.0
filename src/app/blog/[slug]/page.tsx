import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostContent, getPostMetadata } from "@/app/lib/blog";
import { MarkdownContent } from "@/app/components/blog/MarkdownContent";

export const metadata: Metadata = {
  title: "Blog | Krishi Saripalli",
  description: "About Myself",
};

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => ({ slug: post.slug }));
};

const Post = async (props: { params: Promise<{ slug: string }> }) => {
  const slug = (await props.params).slug;

  let post;
  try {
    post = getPostContent(slug);
  } catch {
    notFound();
  }

  return (
    <div className="flex relative px-5">
      <div className="mx-auto flex w-full max-w-prose flex-col justify-start py-32">
        <div className="text-primary w-full overflow-hidden">
          <div>
            <p className="font-primary pb-3 text-2xl md:text-3xl lg:text-5xl font-medium">
              {post.data.title}
            </p>
            <p className="font-secondary pb-3 text-l md:text-xl lg:text-2xl opacity-80">
              {post.data.subtitle}
            </p>
            <p className="font-secondary pb-3 opacity-50 text-sm md:text-lg">
              {post.data.date}
            </p>
            <div className="border-b border-primary border-dashed pb-3" />
          </div>
          <article className="text-primary prose prose-md md:prose-xl">
            <MarkdownContent content={post.content} />
          </article>
        </div>
      </div>
    </div>
  );
};

export default Post;
