"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "src/lib/utils";

// Tailwind's 2xl breakpoint
const LARGE_SCREEN_QUERY = "(width >= 96rem)";

export function PostSummary() {
  const isLargeScreen = useMediaQuery(LARGE_SCREEN_QUERY);
  if (!isLargeScreen) return null;
  return <Summary />;
}

function Summary() {
  const headings = useHeadings();
  const activeIndex = useActiveHeadingIndex(headings);
  if (headings.length < 2) return null;
  return (
    <Container>
      {headings.map(({ id, textContent }, index) => {
        const active = index === activeIndex;
        const preactive =
          index !== 0 &&
          (index === activeIndex + 1 || index === activeIndex - 1);
        return (
          <Heading active={active} id={id} key={id} preactive={preactive}>
            {textContent}
          </Heading>
        );
      })}
    </Container>
  );
}

// 📦
function Container({ children }: { children: React.ReactNode }) {
  return (
    <nav
      className={cn(
        "group/nav",
        "bg-white",
        "fixed",
        "top-1/2 left-2 -translate-y-1/2",
        "rounded-xl",
        "border border-transparent hover:border-gray-200",
        "p-4",
        "transition-all",
        "hover:shadow-[0_10px_30px_0_rgba(0,0,0,0.14)]"
      )}
      style={{
        maxWidth: "clamp(33ch, 23vw, 50ch)",
      }}
    >
      <ul className="space-y-1">{children}</ul>
    </nav>
  );
}

// 🔠
function Heading({
  active,
  preactive,
  children,
  id,
}: {
  active: boolean;
  preactive: boolean;
  children: React.ReactNode;
  id: string;
}) {
  return (
    <li>
      <a
        aria-current={active ? "location" : undefined}
        className="group/link flex items-center gap-x-4 text-base"
        href={`#${id}`}
        title={children as string}
      >
        <div
          className={cn(
            "h-0.5 shrink-0 transition-all duration-500",
            "group-hover/link:w-9 group-hover/link:bg-gray-800",
            active ? "w-11! bg-gray-800!" : "w-7 bg-gray-200",
            preactive && "w-9 bg-gray-300"
          )}
        />
        <span
          className={cn(
            "truncate",
            "transition-all",
            active && "font-semibold",
            "max-w-0 opacity-0 group-hover/nav:max-w-max group-hover/nav:opacity-100"
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

const TRIGGER_RATIO = 0.15;

function useActiveHeadingIndex(headings: Element[]) {
  const [activeIndex, setActiveIndex] = useState(-1);
  useEffect(() => {
    if (headings.length < 2) return;

    let atBottom = isAtBottom();

    const update = () => {
      const line = window.innerHeight * TRIGGER_RATIO;
      let index = -1;
      headings.forEach((heading, i) => {
        if (heading.getBoundingClientRect().top <= line) index = i;
      });
      if (atBottom) index = headings.length - 1;
      setActiveIndex(index);
    };

    const observer = new IntersectionObserver(update, {
      rootMargin: `0px 0px -${100 - TRIGGER_RATIO * 100}% 0px`,
    });
    for (const heading of headings) observer.observe(heading);

    const onScroll = () => {
      if (isAtBottom() === atBottom) return;
      atBottom = !atBottom;
      update();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [headings]);
  return activeIndex;
}

function isAtBottom() {
  const { scrollHeight } = document.documentElement;
  return window.scrollY + window.innerHeight >= scrollHeight - 2;
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}
