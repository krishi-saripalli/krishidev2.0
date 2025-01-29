import React, { ReactNode } from "react";
import Image from "next/image";
import Paragraph from "./Paragraph";
import Link from "next/link";

interface ArticleProps {
  title: string;
  children: ReactNode;
  date: string;
}

const Article: React.FC<ArticleProps> = ({ title, children, date }) => {
  return (
    <div className=" items-star w-full overflow-hidden">
      <div className="align-baseline">
        <div className="flex justify-between items-baseline pb-5">
          <h1 className="text-xl md:text-2xl lg:text-3xl underline underline-offset-8 decoration-2">
            {title}
          </h1>
          <div>
            <p className="opacity-50 text-sm">{date}</p>
          </div>
        </div>
        <hr />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Article;
