"use client";

import classNames from "classnames";
import { motion } from "framer-motion";

export const PageAnimateWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={classNames("min-h-screenHeightWithoutHeader", className)}
  >
    {children}
  </motion.div>
);