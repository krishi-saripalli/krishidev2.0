import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { FC } from "react";
import { PageAnimateWrapper } from "@/app/components/PageAnimateWrapper";
import { getPostContent } from "@/app/lib/utils";
import Markdown from "markdown-to-jsx";
import { getPostMetadata } from "@/app/lib/utils";

export const metadata: Metadata = {
  title: "Projects | Krishi Saripalli",
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
    <PageAnimateWrapper>
      <div className="flex text-white relative h-full ">
        <div className="mx-auto flex w-full max-w-prose flex-col justify-start py-32">
          <div className=" text-white w-full overflow-hidden">
            <div>
              <p className="pb-3 text-2xl md:text-3xl lg:text-5xl font-medium">
                {post.data.title}
              </p>
              <p className="pb-3 text-l md:text-xl lg:text-2xl opacity-75">
                {post.data.subtitle}
              </p>
              <p className="pb-3 opacity-50 text-sm md:text-lg italic">
                {post.data.date}
              </p>
              <hr className="pb-3" />
            </div>
            <article className="prose prose-invert prose-md md:prose-xl text-white">
              <Markdown>{post.content}</Markdown>
            </article>
          </div>
        </div>
      </div>
    </PageAnimateWrapper>
  );
};

export default Post;
