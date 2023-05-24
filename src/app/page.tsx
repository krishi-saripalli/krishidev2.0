import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { FC } from "react";
import LargeHeading from "./components/ui/LargeHeading";
import Paragraph from "./components/ui/Paragraph";
import { PageAnimateWrapper } from "./components/PageAnimateWrapper";
import Animation from "./components/ui/animation/Blob";

export const metadata: Metadata = {
  title: "Home | Krishi Saripalli",
  description: "About Myself",
};

const About: FC = () => {
  return (
    <PageAnimateWrapper>
      <div className="text-white relative h-screen flex items-center justify-center overflow-x-hidden ">
        <div className="flex flex-col items-center lg:flex-row pt-32 max-w-7xl w-full mx-auto h-full">
          <div className="h-full lg:h-full gap-3 flex flex-col justify-start items-center lg:items-start ">
            <Paragraph className="max-w-xl text-left">
              I am an undergraduate student at Brown University studying
              mathematics and computer science. My research and career interests
              lie primarily in computer graphics, vision, image processing and
              machine learning. I&apos;m a student researcher in the{" "}
              <Link href="https://visual.cs.brown.edu/" className="underline">
                Brown Visual Computing
              </Link>{" "}
              group where I am advised by{" "}
              <Link className="underline" href="https://dritchie.github.io/">
                Daniel Ritchie
              </Link>
              . I am a teaching assistant and course developer for many courses
              at Brown, but most recently, I will be working on{" "}
              <Link href="https://cs1230.graphics/" className="underline">
                CSCI1230
              </Link>
              . This summer, I&apos;ll be a software engineering intern at{" "}
              <Link href="https://coinbase.com/" className="underline">
                Coinbase
              </Link>
              .
            </Paragraph>
            <Paragraph className="max-w-xl text-left">
              The best way to get in touch with me is through email at{" "}
              <Link href="" className="underline">
                ksaripal@cs.brown.edu
              </Link>
              . The second best way is{" "}
              <Link href="https://twitter.com/krishi_sa" className="underline">
                Twitter
              </Link>
              .
            </Paragraph>
            <Paragraph className="max-w-xl text-left">
              I grew up in many different places, but I call California my home.
              I spend vast amounts of my time cooking, longboarding and planning
              my return to woodworking.
            </Paragraph>
          </div>
          <div className="h-full w-full lg:w-1/2 grow-1 shrink-0 ">
            <Animation></Animation>
          </div>
        </div>
      </div>
    </PageAnimateWrapper>
  );
};

export default About;
