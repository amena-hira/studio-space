"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = (props) => {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={resolvedTheme === "light" ? "light" : "dark"}
      position="top-right"
      richColors
      closeButton
      style={{ zIndex: 100 }}
      {...props}
    />
  );
};

export { Toaster };
