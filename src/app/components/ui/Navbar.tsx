import { getServerSession } from "next-auth";

import Link from "next/link";
import { buttonVariants } from "./Button";

const Navbar = async () => {
  return (
    <div className="px-5 fixed backdrop-blur-sm bg-white z-50 top-0 left-0 right-0 h-20 border-b border-slate-300  shadow-sm flex items-center justify-between">
      <div className=" container max-w-5xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className="sm:text-lg md:text-xl">
          Krishi Saripalli
        </Link>

        <div className="flex  gap-2">
          <Link href="/work" className={buttonVariants({ variant: "ghost" })}>
            Work
          </Link>
          <Link
            href="https://github.com/krishi-saripalli"
            className={buttonVariants({ variant: "ghost" })}
          >
            GitHub
          </Link>
          <Link href="/blog" className={buttonVariants({ variant: "ghost" })}>
            Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
