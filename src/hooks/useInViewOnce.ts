"use client";

import { useEffect, useState, type RefObject } from "react";

/** Latches to true the first time the element enters the viewport. */
export function useInViewOnce(ref: RefObject<Element | null>, rootMargin = "0px 0px -10% 0px"): boolean {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || seen) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, seen]);

  return seen;
}
