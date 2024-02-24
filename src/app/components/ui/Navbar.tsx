"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isActive = (path: string) => {
    return path === pathname;
  };
  return (
    <div className="px-5 fixed backdrop-blur-sm bg-white z-50 top-0 left-0 right-0 h-20 border-b border-slate-300  shadow-sm flex items-center justify-between">
      <div className=" container max-w-5xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className="sm:text-lg md:text-xl">
          Krishi Saripalli
        </Link>

        <div className="flex gap-6 text-sm">
          <Link
            href="/work"
            className={`${isActive("/work") ? "text-black" : "text-slate-500"}`}
          >
            Work
          </Link>
          <Link
            href="/blog"
            className={`${isActive("/blog") ? "text-black" : "text-slate-500"}`}
          >
            Blog
          </Link>
          <Link
            href="https://github.com/krishi-saripalli"
            className=" text-slate-500 active:text-black"
          >
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
