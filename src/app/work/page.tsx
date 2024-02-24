import { Metadata } from "next";
import { FC } from "react";
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
