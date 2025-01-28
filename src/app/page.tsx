import { Metadata } from "next";
import Link from "next/link";
import { FC } from "react";
import Paragraph from "./components/ui/Paragraph";

export const metadata: Metadata = {
  title: "Krishi Saripalli",
  description: "About Myself",
};

const About: FC = () => {
  return (
    <div className="flex text-primary relative">
      <div className="mx-auto flex w-full max-w-prose flex-col justify-start py-32">
        <div className="mx-auto max-w-prose">
          <Paragraph className="text-left pb-4">
            I&#39;m an engineer at{" "}
            <Link href="https://bezi.com/" className="underline">
              Bezi
            </Link>{" "}
            , where I work on tools to help designers and developers build games
            faster. I graduated from Brown University with a degree in Computer
            Science. There, I worked in the{" "}
            <Link href="https://visual.cs.brown.edu/" className="underline">
              Brown Visual Computing
            </Link>{" "}
            group on procedural material synthesis and generative modelling.{" "}
            group Previously, I worked at{" "}
            <Link href="https://moderntreasury.com/" className="underline">
              Modern Treasury
            </Link>{" "}
            and{" "}
            <Link href="https://coinbase.com/" className="underline">
              Coinbase
            </Link>
          </Paragraph>
          <Paragraph className="text-left pb-4">
            The best way to get in touch with me is through email at{" "}
            <Link href="" className="">
              kts[at]brown[dot]edu
            </Link>
            . The second best way is{" "}
            <Link href="https://twitter.com/krishi_sa" className="underline">
              Twitter
            </Link>
            .
          </Paragraph>
          <Paragraph className="text-left pb-4">
            I grew up in many different places, but I call California my home. I
            spend vast amounts of my time cooking, longboarding and planning my
            return to woodworking.
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default About;
