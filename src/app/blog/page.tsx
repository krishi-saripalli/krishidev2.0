import { Metadata } from "next";
import { FC } from "react";
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
    <div className="flex text-primary relative ">
      <div className=" mx-auto flex w-full max-w-prose flex-col justify-start py-32">
        {postPreviews}
      </div>
    </div>
  );
};

export default PostPreviews;
