"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HomeMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const heroCopy = gsap.utils.toArray<HTMLElement>(
        "[data-motion-hero-copy] > *",
        rootRef.current,
      );
      const heroVisual = rootRef.current?.querySelector<HTMLElement>(
        "[data-motion-hero-visual]",
      );

      gsap.fromTo(
        heroCopy,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.12,
        },
      );

      if (heroVisual) {
        gsap.fromTo(
          heroVisual,
          { autoAlpha: 0, y: 28, scale: 0.97 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.22,
          },
        );
      }

      gsap.utils
        .toArray<HTMLElement>("[data-motion-reveal]", rootRef.current)
        .forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            },
          );
        });

      gsap.utils
        .toArray<HTMLElement>("[data-motion-stagger]", rootRef.current)
        .forEach((container) => {
          const items = container.querySelectorAll<HTMLElement>(
            "[data-motion-item]",
          );
          if (!items.length) return;

          gsap.fromTo(
            items,
            { autoAlpha: 0, y: 22 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: container,
                start: "top 86%",
                once: true,
              },
            },
          );
        });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="contents">
      {children}
    </div>
  );
}
