import { Metadata } from "next";
import { FC } from "react";
import { getPostContent } from "@/app/lib/utils";
import Markdown from "markdown-to-jsx";
import { getPostMetadata } from "@/app/lib/utils";

export const metadata: Metadata = {
  title: "Blog | Krishi Saripalli",
  description: "About Myself",
};

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

const Post: FC = (props: any) => {
  const slug = props.params.slug;
  const post = getPostContent(slug);
  return (
    <div className="flex  relative ">
      <div className="mx-auto flex w-full max-w-prose flex-col justify-start py-32">
        <div className=" text-primary  w-full overflow-hidden">
          <div className="animate-fadeInDown">
            <p className="font-primary pb-3 text-2xl md:text-3xl lg:text-5xl font-medium">
              {post.data.title}
            </p>
            <p className="pb-3 text-l md:text-xl lg:text-2xl opacity-75 italic">
              {post.data.subtitle}
            </p>
            <p className="pb-3 opacity-50 text-sm md:text-lg italic">
              {post.data.date}
            </p>
            <div className="border-b border-primary border-dashed pb-3" />
          </div>
          <article className=" text-primary prose prose-invert prose-md md:prose-xl">
            <Markdown>{post.content}</Markdown>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Post;
