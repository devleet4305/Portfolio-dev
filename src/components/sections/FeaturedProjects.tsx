"use client";

import { GithubIcon } from "@/components/shared/icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { siteConfig } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

interface ProjectType {
  _id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  technologies: string[];
  liveLink?: string;
  githubClient?: string;
  githubServer?: string;
  coverImage: string;
  category: string;
  featured: boolean;
  status?: "completed" | "ongoing";
}

export function FeaturedProjects() {
  const stackRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<ProjectType[]>(siteConfig.projects);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch projects from the API, but always prioritize siteConfig for image consistency
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          let fetchedProjects: ProjectType[] = [];
          if (Array.isArray(data)) {
            fetchedProjects = data;
          } else if (data && typeof data === "object") {
            fetchedProjects = data.projects || [];
          }

          // Keep only featured projects
          const featuredOnly = fetchedProjects.filter(
            (project) => project.featured,
          );
          if (featuredOnly.length > 0) {
            // Merge API data with siteConfig to ensure correct images
            const mergedProjects = featuredOnly.slice(0, 4).map((apiProject: ProjectType) => {
              const siteProject = siteConfig.projects.find((p) => p.title === apiProject.title);
              return {
                ...apiProject,
                coverImage: siteProject?.coverImage || apiProject.coverImage,
              };
            });
            setProjects(mergedProjects);
          } else {
            setProjects(siteConfig.projects);
          }
        } else {
          setProjects(siteConfig.projects);
        }
      } catch (error) {
        console.error("Failed to fetch projects in FeaturedProjects:", error);
        setProjects(siteConfig.projects);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const wrappers = gsap.utils.toArray<HTMLElement>(
        ".project-card-wrapper",
        stackRef.current,
      );

      wrappers.slice(0, -1).forEach((wrapper) => {
        const card = wrapper.querySelector<HTMLElement>(".project-card");
        if (!card) return;

        gsap.to(card, {
          scale: 0.94,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top+=64",
            end: "bottom top+=64",
            scrub: true,
          },
        });
      });
    },
    { scope: stackRef, dependencies: [projects, isLoading] },
  );

  return (
    <section
      ref={stackRef}
      id="featured-projects"
      aria-labelledby="featured-projects-title"
      className="section-shell"
    >
      <div className="site-container">
        <header className="mb-10 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="featured-projects-title" className="section-title mt-2">
              Featured projects
            </h2>
            <p className="section-copy mt-3">
              A selection of full-stack applications and the technologies behind them.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            All projects
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </header>

        {isLoading ? (
          <div
            aria-label="Loading featured projects"
            aria-busy="true"
            className="grid gap-6 md:grid-cols-2"
          >
            {[1, 2].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-lg border border-border bg-card"
              >
                <div className="aspect-video animate-pulse bg-muted" />
                <div className="space-y-4 p-6">
                  <div className="h-6 w-2/3 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p className="rounded-lg border border-border bg-card px-6 py-12 text-center text-muted-foreground">
            No featured projects available yet.
          </p>
        ) : (
          <div className="relative">
            {projects.map((project, index) => (
              <div
                key={project._id}
                className="project-card-wrapper sticky top-16 flex min-h-[calc(100svh-4rem)] items-center py-6"
                style={{ zIndex: index + 1 }}
              >
                <article className="project-card grid w-full max-w-6xl overflow-hidden rounded-lg border border-border bg-card shadow-md md:grid-cols-2">
                <div className="relative aspect-video bg-muted md:aspect-auto md:min-h-[30rem]">
                  {project.coverImage ? (
                    <Image
                      src={project.coverImage}
                      alt={`${project.title} project preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                      Preview unavailable
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
                  <div>
                    <p className="text-xs font-semibold text-primary">
                      {project.category || "Full Stack"}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold leading-snug text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {project.shortDescription}
                    </p>
                  </div>

                  <ul
                    aria-label={`${project.title} technologies`}
                    className="flex flex-wrap gap-2"
                  >
                    {project.technologies.slice(0, 5).map((technology) => (
                      <li
                        key={technology}
                        className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-4">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-9 items-center gap-2 text-sm font-semibold text-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        Live demo
                        <ExternalLink aria-hidden="true" className="size-4" />
                      </a>
                    )}
                    {project.githubClient && (
                      <a
                        href={project.githubClient}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-9 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <GithubIcon className="size-4" />
                        Source code
                      </a>
                    )}
                    <Link
                      href={`/projects/${project._id}`}
                      className="ml-auto inline-flex min-h-9 items-center gap-2 text-sm font-semibold text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      Case study
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  </div>
                </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
