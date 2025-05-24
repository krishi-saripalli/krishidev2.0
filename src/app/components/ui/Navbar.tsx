"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return path === pathname;
  };

  return (
    <>
      <div className="px-5 fixed border-b border-dashed border-primary bg-primary md:bg-tertiary transition-colors duration-300 md:hover:bg-primary group z-[9999] top-0 left-0 right-0 h-20 flex flex-grow flex-shrink items-center justify-between">
        <div className="container max-w-5xl mx-auto w-full flex justify-between items-center">
          <Link
            href="/"
            className="font-primary text-white md:text-primary text-xl lg:text-3xl group-hover:text-white transition-colors duration-300"
          >
            Krishi Saripalli
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 text-md md:text-l lg:text-xl">
            <Link
              href="/blog"
              className={`font-secondary group-hover:text-white transition-colors duration-300 ${
                isActive("/blog")
                  ? "text-white md:text-secondary"
                  : "text-white md:text-primary"
              }`}
            >
              Blog
            </Link>
            <Link
              href="https://github.com/krishi-saripalli"
              className="font-secondary text-white md:text-primary group-hover:text-white transition-colors duration-300"
            >
              GitHub
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-8 h-8 flex flex-col justify-center items-center relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-8 h-8 flex flex-col justify-center items-center">
              <span
                className={`w-6 h-0.5 bg-white absolute transition-all duration-300 transform ${
                  isMenuOpen
                    ? "rotate-45 scale-75"
                    : "translate-y-[-4px] scale-100"
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-white absolute transition-all duration-300 transform ${
                  isMenuOpen
                    ? "-rotate-45 scale-75"
                    : "translate-y-[4px] scale-100"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-primary z-[9998] transition-all duration-300 md:hidden ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 text-2xl">
          <Link
            href="/blog"
            className={`font-secondary text-white transition-colors duration-300 ${
              isActive("/blog") ? "text-secondary" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="https://github.com/krishi-saripalli"
            className="font-secondary text-white transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            GitHub
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
