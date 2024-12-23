import React, { ReactNode } from "react";
import Image from "next/image";
import Paragraph from "./Paragraph";
import Link from "next/link";
import { PostMetadata, WorkMetadata } from "../PostMetadata";

interface WorkPreviewProps {
  metadata: WorkMetadata;
}

const WorkPreview: React.FC<WorkPreviewProps> = ({
  metadata: { title, subtitle, link },
}) => {
  return (
    <Link href={link}>
      <div className="flex p-3 rounded-md hover:bg-white hover:bg-opacity-20 transition ease-in-out text-white">
        <div className="flex flex-col ">
          <div className="text-lg md:text-xl lg:text-2xl text-left">
            {title}
          </div>
          <hr className="pb-1" />

          <div className="opacity-75 italic text-xs md:text-sm lg:text-lg text-left">
            {subtitle}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkPreview;
