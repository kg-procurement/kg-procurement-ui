import React from "react";

interface TypographyProps {
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({ children }) => {
  return <p>{children}</p>;
};

Typography.displayName = "Typography";

export { Typography };
