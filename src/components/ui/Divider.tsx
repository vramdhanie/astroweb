import React from "react";

interface DividerProps {
  className?: string;
}

export function Divider({ className = "" }: DividerProps) {
  return (
    <hr
      className={`border-t border-[var(--border)] ${className}`}
      style={{ margin: "var(--space-2xl) 0" }}
    />
  );
}
