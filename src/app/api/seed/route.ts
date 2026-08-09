import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Project from "@/models/Project";
import Blog from "@/models/Blog";
import { siteConfig } from "@/config/site";

export async function POST() {
  try {
    await dbConnect();

    // Clear existing projects and blogs
    await Project.deleteMany({});
    await Blog.deleteMany({});

    // Seed projects
    const createdProjects = await Project.insertMany(
      siteConfig.projects.map((p) => ({
        title: p.title,
        shortDescription: p.shortDescription,
        detailedDescription: p.detailedDescription,
        technologies: p.technologies,
        liveLink: p.liveLink,
        githubClient: p.githubClient,
        githubServer: p.githubServer,
        coverImage: p.coverImage,
        galleryImages: [],
        category: p.category,
        featured: p.featured,
        status: p.status,
      }))
    );

    // Seed sample blogs
    const createdBlogs = await Blog.insertMany(
      siteConfig.sampleBlogs.map((b) => ({
        title: b.title,
        slug: b.slug,
        summary: b.summary,
        thumbnail: b.thumbnail,
        tags: b.tags,
        content: b.content,
      }))
    );

    return NextResponse.json(
      {
        message: "Database seeded successfully!",
        projectsCount: createdProjects.length,
        blogsCount: createdBlogs.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Seed API error:", error);
    return NextResponse.json(
      { error: "Failed to seed database. Verify MONGODB_URI in .env." },
      { status: 500 }
    );
  }
}
