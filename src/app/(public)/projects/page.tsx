"use client";

import { GithubIcon } from "@/components/shared/icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Code, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { siteConfig } from "@/config/site";

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

const CATEGORIES = ["All", "Frontend", "Full Stack"];

export default function PublicProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [projects, setProjects] = useState<ProjectType[]>(siteConfig.projects);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  // Fetch projects from the API, but always prioritize siteConfig for image consistency
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          let list: ProjectType[] = [];
          if (Array.isArray(data)) {
            list = data;
          } else if (data && typeof data === "object") {
            list = data.projects || [];
          }
          // Merge API data with siteConfig to ensure correct images
          const mergedProjects = list.map((apiProject: ProjectType) => {
            const siteProject = siteConfig.projects.find((p) => p.title === apiProject.title);
            return {
              ...apiProject,
              coverImage: siteProject?.coverImage || apiProject.coverImage,
            };
          });
          setProjects(mergedProjects.length > 0 ? mergedProjects : siteConfig.projects);
        } else {
          setProjects(siteConfig.projects);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setProjects(siteConfig.projects);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Bulletproof filtering logic with category fallback for legacy entries
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => (p.category || "Full Stack") === activeCategory);

  // Entrance & Filter change animation using GSAP
  useGSAP(
    () => {
      if (!isLoading && filteredProjects.length > 0) {
        gsap.fromTo(
          ".project-card",
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "transform",
          },
        );
      }
    },
    { scope: containerRef, dependencies: [activeCategory, isLoading] },
  );

  return (
    <div
      ref={containerRef}
      className="section-shell bg-background"
    >
      <div className="site-container space-y-10">
        {/* Header */}
        <div className="space-y-3 border-b border-border pb-6">
          <p className="eyebrow">Selected work</p>
          <h1 className="section-title">
            Projects
          </h1>
          <p className="section-copy">
            Full-stack applications, technical decisions, and project details.
          </p>
        </div>

        {/* Filter Pills */}
        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex flex-wrap gap-2"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`min-h-10 rounded-md border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Dynamic States */}
        {isLoading ? (
          /* Pulsating Skeleton Grid mimicking real cards */
          <div className="grid gap-8 md:grid-cols-2">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className="overflow-hidden rounded-lg border border-border bg-card"
              >
                <div className="aspect-video w-full bg-muted" />
                <div className="p-6 space-y-4">
                  <div className="h-6 w-2/3 bg-muted rounded-md" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-muted rounded-md" />
                    <div className="h-4 w-5/6 bg-muted rounded-md" />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <div className="h-6 w-16 bg-muted rounded-full" />
                    <div className="h-6 w-16 bg-muted rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          /* Centered Sleek Empty State */
          <p className="rounded-lg border border-border bg-card px-6 py-12 text-center text-muted-foreground">
            No projects found in this category.
          </p>
        ) : (
          /* Projects Grid */
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <div
                key={project._id}
                className="project-card group relative flex flex-col justify-between overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                <div>
                  {/* Cover Image */}
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-lg border ${
                          project.status === "ongoing"
                            ? "border-amber-500/30 text-amber-500"
                            : "border-emerald-500/30 text-emerald-500"
                        } bg-background/80 backdrop-blur-md`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            project.status === "ongoing"
                              ? "bg-amber-500 animate-pulse"
                              : "bg-emerald-500"
                          }`}
                        ></span>
                        {project.status === "ongoing" ? "Ongoing" : "Completed"}
                      </span>
                    </div>

                    {project.coverImage ? (
                      <Image
                        src={project.coverImage}
                        alt={`${project.title} project preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority={index === 0}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No Image Available
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="text-xl font-semibold leading-snug text-foreground">
                          {project.title}
                        </h2>
                        <div className="flex gap-1.5 flex-shrink-0">
                          <span className="inline-flex items-center rounded-md border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground">
                            {project.category || "Full Stack"}
                          </span>
                          {project.featured && (
                            <span className="inline-flex items-center rounded-md border border-primary/30 px-2 py-0.5 text-xs font-medium text-primary">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {project.shortDescription}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.slice(0, 5).map((tech: string) => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                        >
                          <Code className="size-3" />
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="text-xs text-muted-foreground self-center font-medium pl-1">
                          +{project.technologies.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 pt-0 flex items-center justify-between border-t border-border/40 mt-4">
                  <Link
                    href={`/projects/${project._id}`}
                    className="inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    View Details
                    <ArrowRight className="size-3.5" />
                  </Link>

                  <div className="flex items-center gap-3">
                    {project.githubClient && (
                      <a
                        href={project.githubClient}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} source code on GitHub`}
                        className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <GithubIcon className="size-4.5" />
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title} live demo`}
                        className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <ExternalLink className="size-4.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
