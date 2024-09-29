import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import React from "react";

type VariantKey =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-[4rem] font-[900] leading-normal tracking-[0.08rem]",
      h2: "scroll-m-20 text-[3rem] font-[900] leading-normal tracking-[0.06rem]",
      h3: "scroll-m-10 text-[2.25rem] font-[900] leading-normal tracking-[0.045rem]",
      h4: "scroll-m-10 text-[2rem] font-[900] leading-normal tracking-[0.04rem]",
      h5: "text-[1.25rem] font-[900] leading-normal tracking-[0.025rem]",
      h6: "text-[1rem] font-[900] leading-normal tracking-[0.02rem]",
      subtitle1: "text-[1.25rem] font-[700] leading-normal tracking-[0.025rem]",
      subtitle2: "text-[1rem] font-[700] leading-normal tracking-[0.02rem]",
      body1: "text-[1rem] font-[400] leading-normal tracking-[0.02rem]",
      body2: "text-[0.875rem] font-[400] leading-normal tracking-[0.0175rem]",
      caption: "text-[0.75rem] font-[400] leading-normal tracking-[0.015rem]",
    },
  },
});

const variantToTag: Record<VariantKey, string> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  caption: "span",
};

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: VariantKey;
  children: React.ReactNode;
  className?: string;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant = "body2", children, className, ...props }, ref) => {
    const Comp = variantToTag[variant];

    return (
      <Comp
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
Typography.displayName = "Typography";

export { Typography };
