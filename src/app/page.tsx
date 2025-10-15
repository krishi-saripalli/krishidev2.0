import { Metadata } from "next";
import { FC } from "react";
import { ConwayGameOfLife } from "./components/gameoflife";

export const metadata: Metadata = {
  title: "Krishi Saripalli",
  description: "Conway's Game of Life",
};

const Home: FC = () => {
  return (
    <div className="flex relative w-full h-full min-h-screen">
      <ConwayGameOfLife gridWidth={100} gridHeight={80} updateInterval={120} />
    </div>
  );
};

export default Home;
