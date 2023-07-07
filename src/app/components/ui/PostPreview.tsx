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
      <div className="p-3 pb-12 items-start rounded-md hover:bg-white hover:bg-opacity-20 transition ease-in-out text-white w-full overflow-hidden">
        <div className="align-baseline">
          <div className="flex justify-between items-baseline">
            <div className="text-lg md:text-xl lg:text-2xl">{title}</div>
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
    </Link>
  );
};

export default PostPreview;
