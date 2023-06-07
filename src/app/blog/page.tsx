import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { FC } from "react";
import Paragraph from "../components/ui/Paragraph";
import { PageAnimateWrapper } from "../components/PageAnimateWrapper";
import BlurredCard from "../components/ui/PostPreview";
import { getPostMetadata } from "../lib/utils";

export const metadata: Metadata = {
  title: "Blog | Krishi Saripalli",
  description: "A list of blog posts",
};

const postMetaData = getPostMetadata();
const postPreviews = postMetaData.map((metadata) => (
  <BlurredCard key={metadata.slug} metadata={metadata} />
));
const PostPreviews: FC = ({}: any) => {
  return (
    <PageAnimateWrapper>
      <div className="flex text-white relative h-full ">
        <div className="mx-auto flex w-full max-w-prose flex-col justify-start py-32">
          {postPreviews}
        </div>
      </div>
    </PageAnimateWrapper>
  );
};

export default PostPreviews;
