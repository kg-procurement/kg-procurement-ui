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
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant = "body2", children }, ref) => {
    const Comp = variantToTag[variant];

    return (
      <Comp ref={ref}>
        {children}
      </Comp>
    );
  },
);
Typography.displayName = "Typography";

export { Typography };
