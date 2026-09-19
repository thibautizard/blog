import { ViewTransition } from "react";

// 🌫️
//----------------------
export function PageFade({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition default="none" enter="fade-in" exit="fade-out">
      {children}
    </ViewTransition>
  );
}
