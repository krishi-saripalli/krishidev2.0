import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { FC } from "react";
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
      <div className="flex text-white relative h-full ">
        <div className="mx-auto flex w-full max-w-prose flex-col justify-start py-32">
          <div className="mx-auto h-full">
            <Paragraph className="max-w-xl text-left pb-4">
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
            <Paragraph className="max-w-xl text-left pb-4">
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
            <Paragraph className="max-w-xl text-left pb-4">
              I grew up in many different places, but I call California my home.
              I spend vast amounts of my time cooking, longboarding and planning
              my return to woodworking.
            </Paragraph>
          </div>
        </div>
      </div>
    </PageAnimateWrapper>
  );
};

export default About;
