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
    <div className="pb-12 items-start text-white w-full overflow-hidden">
      <div className="align-baseline">
        <div className="flex justify-between items-baseline">
          <Link href={/blog/ + slug} className="text-lg md:text-xl lg:text-2xl">
            {title}
          </Link>
          <div>
            <p className="opacity-50 text-xs md:text-sm">{date}</p>
          </div>
        </div>
        <hr className="pb-3" />
        <div className="opacity-75 text-sm md:text-md lg:text-lg">
          {subtitle}
        </div>
      </div>
    </div>
  );
};

export default PostPreview;
