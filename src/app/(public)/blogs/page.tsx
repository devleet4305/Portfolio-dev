import React from "react";
import { dbConnect } from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { BlogsGrid } from "@/components/blog/BlogsGrid";
import { siteConfig } from "@/config/site";

export const revalidate = 0; // Dynamic rendering for latest data

export default async function PublicBlogsPage() {
  let serializedBlogs = siteConfig.sampleBlogs;

  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    if (blogs && blogs.length > 0) {
      serializedBlogs = blogs.map((blog) => ({
        _id: blog._id.toString(),
        title: blog.title,
        slug: blog.slug,
        summary: blog.summary,
        thumbnail: blog.thumbnail,
        tags: blog.tags || [],
        createdAt: blog.createdAt ? blog.createdAt.toISOString() : new Date().toISOString(),
        content: blog.content || "",
      }));
    }
  } catch (error) {
    console.error("Database connection error in PublicBlogsPage, rendering sample blogs:", error);
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            My Blogs
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Insights, tutorials, and thoughts on web development, MERN stack, and engineering practices.
          </p>
        </div>

        {/* Blogs Grid */}
        <BlogsGrid blogs={serializedBlogs} />
      </div>
    </div>
  );
}
