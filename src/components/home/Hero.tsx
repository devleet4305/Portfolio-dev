"use client";

import { FolderGit2, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="hero-atmosphere section-shell flex min-h-[calc(100svh-4rem)] items-center"
    >
      <div className="site-container grid w-full grid-cols-1 items-center gap-12 md:grid-cols-[1.2fr_0.8fr]">
        <div className="mx-auto max-w-2xl text-center md:mx-0 md:text-left">
          <p className="eyebrow">Hello, I&apos;m</p>
          <h1
            id="hero-title"
            className="mt-4 text-5xl font-bold leading-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            {siteConfig.name}
          </h1>
          <p className="mt-3 text-xl font-semibold text-primary sm:text-2xl">
            {siteConfig.title}
          </p>
          <p className="section-copy mt-6">
            I build responsive, user-focused web applications with React,
            Next.js, Node.js, and MongoDB.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Link href="/projects" className="button-primary">
              <FolderGit2 aria-hidden="true" className="size-4" />
              View projects
            </Link>
            <Link
              href="/#contact"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Mail aria-hidden="true" className="size-4" />
              Contact me
            </Link>
          </div>
        </div>

        <div className="mx-auto w-full max-w-xs sm:max-w-sm">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-card shadow-lg">
            <Image
              src={siteConfig.profileImage}
              alt={`Portrait of ${siteConfig.name}`}
              fill
              sizes="(max-width: 768px) 80vw, 380px"
              priority
              className="object-cover object-[38%_center]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
