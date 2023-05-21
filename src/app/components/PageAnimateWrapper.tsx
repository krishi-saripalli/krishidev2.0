"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { motion } from "framer-motion";

export const PageAnimateWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Check initial window width

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return <>{children}</>; // Render children directly if not on mobile
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={classNames("min-h-screenHeightWithoutHeader", className)}
    >
      {children}
    </motion.div>
  );
};
