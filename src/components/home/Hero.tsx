import { ArrowDown, ArrowRight, ExternalLink, FolderGit2, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon } from "@/components/shared/icons";

const featuredProject = siteConfig.projects[0];
const skills = ["React", "Next.js", "Node.js", "MongoDB"];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="hero-atmosphere section-shell relative flex min-h-[calc(100svh-4rem)] items-center pb-24"
    >
      <div className="site-container grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <p className="eyebrow">Full-stack web developer</p>
          <h1
            id="hero-title"
            className="mt-4 text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            {siteConfig.name}
          </h1>
          <p className="section-copy mx-auto mt-6 lg:mx-0">
            I build full-stack platforms for rentals, pet adoption, and
            e-commerce, from clear user interfaces to backend features.
          </p>

          <ul
            aria-label="Technologies I work with"
            className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start"
          >
            {skills.map((skill) => (
              <li
                key={skill}
                className="rounded-md border border-border/80 bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                {skill}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
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

          <div className="mt-5 flex items-center justify-center gap-2 lg:justify-start">
            <Link
              href={siteConfig.socialLinks.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${siteConfig.name} on GitHub (opens in a new tab)`}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <GithubIcon aria-hidden="true" className="size-5" />
            </Link>
            <Link
              href={siteConfig.socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${siteConfig.name} on LinkedIn (opens in a new tab)`}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <LinkedinIcon aria-hidden="true" className="size-5" />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl pt-8">
          <div className="absolute right-5 top-0 z-10 flex items-center gap-3 rounded-full border border-border/80 bg-background/95 py-1.5 pl-1.5 pr-4 shadow-lg backdrop-blur sm:right-8">
            <div className="relative size-12 overflow-hidden rounded-full ring-2 ring-background">
              <Image
                src="/portfolio.jpg"
                alt={`Portrait of ${siteConfig.name}`}
                fill
                sizes="48px"
                priority
                className="object-cover object-top"
              />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight text-foreground">
                {siteConfig.name}
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin aria-hidden="true" className="size-3" />
                {siteConfig.location}
              </p>
            </div>
          </div>

          <article className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xl shadow-foreground/5">
            <Link
              href={`/projects/${featuredProject._id}`}
              aria-label={`View the ${featuredProject.title} case study`}
              className="group relative block aspect-[16/10] overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            >
              <Image
                src={featuredProject.coverImage}
                alt={`${featuredProject.title} website preview`}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
                Featured project
              </span>
            </Link>

            <div className="space-y-4 p-5 sm:p-6">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2 className="mt-2 text-xl font-semibold leading-snug text-foreground sm:text-2xl">
                  <Link
                    href={`/projects/${featuredProject._id}`}
                    className="rounded-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {featuredProject.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {featuredProject.shortDescription}
                </p>
              </div>

              <ul
                aria-label={`${featuredProject.title} technologies`}
                className="flex flex-wrap gap-2"
              >
                {featuredProject.technologies.slice(0, 4).map((technology) => (
                  <li
                    key={technology}
                    className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {technology}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-3">
                <a
                  href={featuredProject.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center gap-2 text-sm font-semibold text-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Live demo
                  <ExternalLink aria-hidden="true" className="size-4" />
                </a>
                <Link
                  href={`/projects/${featuredProject._id}`}
                  className="ml-auto inline-flex min-h-9 items-center gap-2 text-sm font-semibold text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Case study
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </div>
          </article>
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
