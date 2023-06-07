import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { FC } from "react";
import Paragraph from "../components/ui/Paragraph";
import { PageAnimateWrapper } from "../components/PageAnimateWrapper";

export const metadata: Metadata = {
  title: "Projects | Krishi Saripalli",
  description: "About Myself",
};

const Projects: FC = ({}: any) => {
  return (
    <PageAnimateWrapper>
      <div className="text-white relative h-screen flex items-center justify-center overflow-x-hidden">
        <div className="container pt-32 max-w-7xl w-full mx-auto h-full">
          <div className="h-full gap-3 flex flex-col justify-start items-start"></div>
        </div>
      </div>
    </PageAnimateWrapper>
  );
};

export default Projects;
