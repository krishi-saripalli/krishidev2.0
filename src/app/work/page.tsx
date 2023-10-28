import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { FC } from "react";
import BlurredCard from "../components/ui/PostPreview";
import { getWorkMetadata } from "../lib/utils";
import WorkPreview from "../components/ui/WorkPreview";

export const metadata: Metadata = {
  title: "Work | Krishi Saripalli",
  description: "Projects and other works",
};

const workMetaData = getWorkMetadata();
const workPreviews = workMetaData.map((metadata) => (
  <WorkPreview key={metadata.title} metadata={metadata} />
));
const PostPreviews: FC = ({}: any) => {
  return (
    <div className="flex text-white relative h-full ">
      <div className=" mx-auto flex w-full max-w-5xl flex-col justify-start py-32">
        {workPreviews}
      </div>
    </div>
  );
};

export default PostPreviews;
