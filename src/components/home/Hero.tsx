import { ArrowDown, FolderGit2, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon } from "@/components/shared/icons";

const skills = ["React", "Next.js", "TypeScript", "Node.js", "MongoDB"];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="hero-atmosphere section-shell relative flex min-h-[calc(100svh-4rem)] items-center pb-24"
    >
      <div className="site-container grid w-full grid-cols-1 items-center gap-12 md:grid-cols-[1.2fr_0.8fr]">
        <div
          data-motion-hero-copy
          className="mx-auto max-w-2xl text-center md:mx-0 md:text-left"
        >
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
            I turn ideas into polished, responsive web applications—from the
            first interface to the backend.
          </p>

          <ul
            aria-label="Technologies I work with"
            className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start"
          >
            {skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-border/80 bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                {skill}
              </li>
            ))}
          </ul>

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

          <div className="mt-6 flex items-center justify-center gap-4 md:justify-start">
            <Link
              href={siteConfig.socialLinks.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${siteConfig.name} on GitHub (opens in a new tab)`}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <GithubIcon aria-hidden="true" className="size-5" />
            </Link>
            <Link
              href={siteConfig.socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${siteConfig.name} on LinkedIn (opens in a new tab)`}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <LinkedinIcon aria-hidden="true" className="size-5" />
            </Link>
          </div>
        </div>

        <div
          data-motion-hero-visual
          className="relative mx-auto mb-4 w-full max-w-[18rem] sm:max-w-[21rem]"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-full border border-primary/30"
          />
          <div className="relative rounded-full bg-gradient-to-br from-primary/80 via-border to-primary/20 p-[2px] shadow-xl">
            <div className="rounded-full bg-background p-2">
              <div className="relative aspect-square overflow-hidden rounded-full ring-1 ring-border">
                <Image
                  src={siteConfig.profileImage}
                  alt={`Portrait of ${siteConfig.name}`}
                  fill
                  sizes="(max-width: 640px) 288px, 336px"
                  priority
                  className="scale-[1.45] object-cover object-[50%_50%] origin-[50%_50%]"
                />
              </div>
            </div>
          </div>
          <span
            aria-hidden="true"
            className="absolute right-[8%] top-[12%] size-3 rounded-full border-2 border-background bg-primary"
          />
          <div className="absolute -bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-border/80 bg-background/90 px-4 py-2 text-sm font-medium text-foreground shadow-lg backdrop-blur">
            <MapPin aria-hidden="true" className="size-4 text-primary" />
            {siteConfig.location}
          </div>
        </div>
      </div>
      <Link
        href="#tech-stack"
        className="absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Explore my work
        <ArrowDown aria-hidden="true" className="size-4" />
      </Link>
    </section>
  );
}
