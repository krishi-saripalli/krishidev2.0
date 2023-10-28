import React, { ReactNode } from "react";
import Image from "next/image";
import Paragraph from "./Paragraph";
import Link from "next/link";
import { PostMetadata, WorkMetadata } from "../PostMetadata";

interface WorkPreviewProps {
  metadata: WorkMetadata;
}

const WorkPreview: React.FC<WorkPreviewProps> = ({
  metadata: { title, subtitle, img, link },
}) => {
  return (
    <Link href={link}>
      <div className=" grid sm:grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-5 p-3 items-start rounded-md hover:bg-white hover:bg-opacity-20 transition ease-in-out text-white w-full overflow-hidden">
        <Image
          src={img}
          alt=""
          width="0"
          height="0"
          className="w-full h-auto"
        ></Image>
        <div className="align-baseline">
          <div className="flex justify-between items-baseline">
            <div className="text-lg md:text-xl lg:text-2xl">{title}</div>
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

export default WorkPreview;
