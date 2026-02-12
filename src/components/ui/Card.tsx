import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({ children, className = "", padding = "md" }: CardProps) {
  return (
    <div
      className={`bg-[var(--background)] border border-[var(--border)] rounded-lg ${paddingMap[padding]} ${className}`}
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      {children}
    </div>
  );
}
