import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Project from "@/models/Project";

// One-time image URL updates for specific projects
const PROJECT_IMAGE_UPDATES = {
  "Property Rental & Booking Platform": "/image/property rental.jpeg",
  "Pet Adoption Platform": "/image/pet adoption.jpeg",
  "Summer Cart Shop": "/image/summercart.jpeg",
};

export async function POST() {
  try {
    await dbConnect();

    const results: { title: string; success: boolean; message: string }[] = [];

    for (const [title, newImageUrl] of Object.entries(PROJECT_IMAGE_UPDATES)) {
      try {
        const project = await Project.findOne({ title });

        if (!project) {
          results.push({ title, success: false, message: "Project not found in database" });
          continue;
        }

        project.coverImage = newImageUrl;
        await project.save();

        results.push({ title, success: true, message: "Image updated successfully" });
      } catch (error) {
        results.push({ title, success: false, message: `Error: ${error}` });
      }
    }

    return NextResponse.json(
      {
        message: "Project image update completed",
        results,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update project images error:", error);
    return NextResponse.json(
      { error: "Failed to update project images." },
      { status: 500 }
    );
  }
}

// GET to check current image URLs
export async function GET() {
  try {
    await dbConnect();

    const projects = await Project.find({
      title: { $in: Object.keys(PROJECT_IMAGE_UPDATES) }
    }).select('title coverImage');

    return NextResponse.json(
      {
        projects: projects.map(p => ({
          title: p.title,
          currentImage: p.coverImage,
          expectedImage: PROJECT_IMAGE_UPDATES[p.title as keyof typeof PROJECT_IMAGE_UPDATES],
          needsUpdate: p.coverImage !== PROJECT_IMAGE_UPDATES[p.title as keyof typeof PROJECT_IMAGE_UPDATES]
        }))
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Check project images error:", error);
    return NextResponse.json(
      { error: "Failed to check project images." },
      { status: 500 }
    );
  }
}
