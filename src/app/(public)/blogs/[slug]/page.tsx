import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { dbConnect } from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { siteConfig } from "@/config/site";

export const revalidate = 0; // Dynamic rendering for latest data

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PublicBlogDetailPage({ params }: Props) {
  const { slug } = await params;

  let blogData = siteConfig.sampleBlogs.find((b) => b.slug === slug);

  try {
    await dbConnect();
    const blogFromDb = await Blog.findOne({ slug });
    if (blogFromDb) {
      blogData = {
        _id: blogFromDb._id.toString(),
        title: blogFromDb.title,
        slug: blogFromDb.slug,
        summary: blogFromDb.summary,
        thumbnail: blogFromDb.thumbnail,
        tags: blogFromDb.tags || [],
        createdAt: blogFromDb.createdAt ? blogFromDb.createdAt.toISOString() : new Date().toISOString(),
        content: blogFromDb.content,
      };
    }
  } catch (error) {
    console.error("Error fetching blog post from DB, using fallback if available:", error);
  }

  if (!blogData) {
    notFound();
  }

  return (
    <article className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to Blogs
          </Link>
        </div>

        {/* Thumbnail Image */}
        <div className="aspect-[21/9] w-full overflow-hidden rounded-2xl border border-border/40 shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blogData.thumbnail}
            alt={blogData.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Metadata */}
        <div className="space-y-4">
          {blogData.tags && blogData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blogData.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
                >
                  <Tag className="size-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            {blogData.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-muted-foreground pt-2 border-b border-border/40 pb-6">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <User className="size-4 text-primary" />
              {siteConfig.name}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              {new Date(blogData.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Summary (Abstract) */}
        <p className="text-lg text-muted-foreground font-medium border-l-4 border-primary pl-4 py-1 leading-relaxed">
          {blogData.summary}
        </p>

        {/* Article Rich Text Content */}
        <div 
          className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 leading-relaxed space-y-6 whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: blogData.content }}
        />
      </div>
    </article>
  );
}
