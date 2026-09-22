import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { requireAdmin, validateImageFile } from "@/lib/security";

export async function POST(request: Request) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    const fileError = validateImageFile(file);
    if (fileError || !file) {
      return NextResponse.json({ error: fileError || "No file uploaded." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const secureUrl = await uploadToCloudinary(buffer, "portfolio/uploads");

    return NextResponse.json({ url: secureUrl }, { status: 200 });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
