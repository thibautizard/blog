"use client";

import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useImperativeHandle } from "react";

import { cn } from "@/lib/utils";

export interface CopyIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CopyIconProps extends HTMLAttributes<HTMLSpanElement> {
  size?: number;
}

const DEFAULT_TRANSITION: Transition = {
  damping: 17,
  mass: 1,
  stiffness: 160,
  type: "spring",
};

const CopyIcon = forwardRef<CopyIconHandle, CopyIconProps>(
  ({ className, size = 28, ...props }, ref) => {
    const controls = useAnimation();

    useImperativeHandle(ref, () => ({
      startAnimation: () => controls.start("animate"),
      stopAnimation: () => controls.start("normal"),
    }));

    return (
      <span className={cn("inline-flex", className)} {...props}>
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Copy icon</title>
          <motion.rect
            animate={controls}
            height="14"
            rx="2"
            ry="2"
            transition={DEFAULT_TRANSITION}
            variants={{
              animate: { translateX: -3, translateY: -3 },
              normal: { translateX: 0, translateY: 0 },
            }}
            width="14"
            x="8"
            y="8"
          />
          <motion.path
            animate={controls}
            d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
            transition={DEFAULT_TRANSITION}
            variants={{
              animate: { x: 3, y: 3 },
              normal: { x: 0, y: 0 },
            }}
          />
        </svg>
      </span>
    );
  }
);

CopyIcon.displayName = "CopyIcon";

export { CopyIcon };
