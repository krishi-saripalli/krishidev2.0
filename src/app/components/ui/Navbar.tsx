"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isActive = (path: string) => {
    return path === pathname;
  };
  return (
    <div className="px-5 fixed border-b border-dashed border-primary bg-tertiary z-50 top-0 left-0 right-0 h-20 flex flex-grow flex-shrink items-center justify-between">
      <div className="  container max-w-5xl mx-auto w-full flex justify-between items-center">
        <Link
          href="/"
          className="font-primary text-primary text-xl lg:text-3xl"
        >
          Krishi Saripalli
        </Link>

        <div className="flex gap-6 text-md md:text-l lg:text-xl">
          <Link
            href="/blog"
            className={`${
              isActive("/blog") ? " text-secondary" : " text-primary"
            } hover:text-secondary transition duration-300`}
          >
            Blog
          </Link>
          <Link
            href="https://github.com/krishi-saripalli"
            className=" text-primary  active:text-secondary hover:text-secondary transition duration-300"
          >
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
