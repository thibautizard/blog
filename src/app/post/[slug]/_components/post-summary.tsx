"use client";

import { useEffect, useState } from "react";
import { cn } from "src/lib/utils";

export function PostSummary() {
  const headings = useHeadings();
  if (headings.length < 2) return null;
  return (
    <Container>
      {headings.map(({ id, textContent }) => (
        <Heading id={id} key={id}>
          {textContent}
        </Heading>
      ))}
    </Container>
  );
}

// 📦
function Container({ children }: { children: React.ReactNode }) {
  return (
    <nav
      className={cn(
        "group",
        "hidden 2xl:block",
        "bg-white",
        "fixed",
        "top-1/2 left-2 -translate-y-1/2",
        "rounded-xl",
        "border border-transparent hover:border-gray-200",
        "px-4 py-4",
        "transition-all",
        "hover:shadow-[0_10px_30px_0_rgba(0,0,0,0.14)]"
      )}
      style={{
        maxWidth: "clamp(33ch, 23vw, 50ch)",
      }}
    >
      <ul>{children}</ul>
    </nav>
  );
}

// 🔠
function Heading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <li>
      <a className="flex items-center gap-x-4 text-base" href={`#${id}`}>
        <div className="h-0.5 w-8 shrink-0 bg-gray-200" />
        <span
          className={cn(
            "truncate",
            "transition-all",
            "max-w-0 opacity-0 group-hover:max-w-max group-hover:opacity-100"
          )}
        >
          {children}
        </span>
      </a>
    </li>
  );
}

// 🪝
function useHeadings() {
  const [headings, setHeadings] = useState<Element[]>([]);
  useEffect(() => {
    const raw = document.querySelectorAll(".post-container h2");
    const foundHeadings = Array.from(raw);
    setHeadings(foundHeadings);
  }, []);
  return headings;
}
