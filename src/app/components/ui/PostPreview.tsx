import React, { ReactNode } from "react";
import Image from "next/image";
import Paragraph from "./Paragraph";
import Link from "next/link";
import { PostMetadata } from "../PostMetadata";

interface PostPreviewProps {
  metadata: PostMetadata;
}

const PostPreview: React.FC<PostPreviewProps> = ({
  metadata: { title, date, subtitle, slug },
}) => {
  return (
    <Link href={/blog/ + slug}>
      <div className=" hover:bg-tertiary text-primary p-3 items-start  hover:bg-opacity-70 transition ease-in-out  w-full overflow-hidden">
        <div className="align-baseline">
          <div className="flex justify-between items-baseline">
            <div className="font-primary text-xl md:text-3xl">{title}</div>
          
          </div>
          <div className="border-b border-primary border-dashed pb-3" />
          <div className="opacity-75 italic text-sm md:text-md lg:text-lg">
            {subtitle}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostPreview;
