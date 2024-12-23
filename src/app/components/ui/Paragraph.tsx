import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes } from "react";
import * as React from "react";
import { classname } from "../../lib/utils";

export const paragraphVariants = cva(
  "max-w-prose text-white mb-2 text-center",
  {
    variants: {
      size: {
        default: "text-base sm:text-lg ",
        sm: "text-sm sm:text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

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
