import { Metadata } from "next";
import { FC } from "react";
import { ConwayGameOfLife } from "./components/gameoflife";
import React from "react";

export const metadata: Metadata = {
  title: "Krishi Saripalli",
  openGraph: {
    title: "Krishi Saripalli",
    images: [
      {
        url: "/opengraph.png",
        width: 1735,
        height: 906,
        alt: "Krishi Saripalli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Krishi Saripalli",
    images: ["/opengraph.png"],
  },
};

const Home: FC = () => {
  return (
    <div className="flex relative w-full h-full min-h-screen">
      <ConwayGameOfLife gridWidth={100} gridHeight={80} updateInterval={120} />
    </div>
  );
};

export default Home;
