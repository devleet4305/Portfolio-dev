"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FolderGit2, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { siteConfig } from "@/config/site";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = useState(siteConfig.profileImage);

  useGSAP(
    () => {
      // Staggered entrance animation for text contents and CTA buttons
      gsap.fromTo(
        ".animate-hero-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
        },
      );

      // Infinite floating animation for the profile image wrapper
      gsap.fromTo(
        imageRef.current,
        { y: -12 },
        {
          y: 12,
          duration: 3.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="section-shell relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden"
    >
      {/* Background decoration elements */}
      <div className="absolute top-1/4 left-10 -z-10 size-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-10 -z-10 size-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* Left Column: Text Content */}
        <div className="flex flex-col justify-center space-y-6 text-center md:text-left">
          <p className="animate-hero-item eyebrow text-sm">
            {"Hi there, I'm"}
          </p>

          <h1 className="animate-hero-item text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {siteConfig.name}
            </span>
          </h1>

          <h2 className="animate-hero-item text-2xl font-bold text-foreground sm:text-3xl">
            {siteConfig.title}
          </h2>

          <p className="animate-hero-item section-copy max-w-xl">
            Building modern, scalable, and user-focused web applications using React, Next.js, Node.js, and MongoDB.
          </p>

          {/* Call to Actions */}
          <div className="animate-hero-item flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
            <Link
              href="/projects"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 text-sm font-semibold text-white shadow-md hover:opacity-90 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <FolderGit2 className="size-4" />
              View Projects
            </Link>

            <Link
              href="/#contact"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-semibold text-foreground hover:border-primary hover:text-primary hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Mail className="size-4" />
              Contact Me
            </Link>
          </div>
        </div>

        {/* Right Column: Profile Avatar */}
        <div className="flex items-center justify-center">
          <div ref={imageRef} className="relative group">
            {/* Glowing background blob */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary to-accent opacity-20 blur-3xl group-hover:opacity-30 transition duration-1000 animate-pulse" />

            {/* Styled border container */}
            <div className="relative flex size-64 sm:size-80 items-center justify-center rounded-full border-4 border-double border-primary/30 bg-card p-3 shadow-2xl overflow-hidden">
              <Image
                src={imgSrc}
                alt={`${siteConfig.name} Profile`}
                width={300}
                height={300}
                priority
                onError={() => setImgSrc("/profile.jpg")}
                className="h-full w-full rounded-full object-cover grayscale-25 group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
