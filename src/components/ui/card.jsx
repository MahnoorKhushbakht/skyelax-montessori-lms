import React from "react";

export function Card({ children, className = "", ...props }) {
  return (
    <section
      className={`rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}

export function CardHeader({ children, className = "", ...props }) {
  return <div className={`p-6 ${className}`} {...props}>{children}</div>;
}

export function CardContent({ children, className = "", ...props }) {
  return <div className={`p-6 ${className}`} {...props}>{children}</div>;
}

export default Card;
