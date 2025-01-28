import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes } from "react";
import * as React from "react";
import { classname } from "../../lib/utils";

export const paragraphVariants = cva("max-w-prose mb-2 text-center", {
  variants: {
    size: {
      default: "text-base text-xl md:text-2xl ",
      sm: "text-sm sm:text-base",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface ParagraphProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        {...props}
        className={classname(paragraphVariants({ size, className }))}
      >
        {children}
      </p>
    );
  }
);

Paragraph.displayName = "Paragraph";

export default Paragraph;
