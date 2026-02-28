import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { analyzeTender, analyzeTenderFromPDF } from "@/lib/gemini";

export const maxDuration = 60;

export async function POST(request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    // Authenticate user
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check usage limit
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const { count } = await supabase
      .from("analyses")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", startOfMonth);

    if (count >= 3) {
      return NextResponse.json(
        { success: false, error: "You've reached your free limit of 3 analyses this month. Upgrade to continue." },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    const fileName = file.name;
    const fileSize = file.size;
    const maxSize = 3 * 1024 * 1024; // 3MB
    const fileExtension = fileName.split(".").pop().toLowerCase();

    if (fileSize > maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: "File too large. Please upload a PDF under 3MB.",
        },
        { status: 400 }
      );
    }

    let result;

    if (fileExtension === "pdf") {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64PDF = buffer.toString("base64");
      result = await analyzeTenderFromPDF(base64PDF);
    } else if (fileExtension === "docx") {
      const mammoth = await import("mammoth");
      const buffer = Buffer.from(await file.arrayBuffer());
      const extracted = await mammoth.extractRawText({ buffer });
      const text = extracted.value;

      if (!text || text.trim().length === 0) {
        return NextResponse.json(
          {
            success: false,
            error: "Could not extract text from the uploaded file. The file may be empty or corrupted.",
          },
          { status: 400 }
        );
      }

      result = await analyzeTender(text.substring(0, 500000));
    } else if (fileExtension === "txt") {
      const text = await file.text();

      if (!text || text.trim().length === 0) {
        return NextResponse.json(
          {
            success: false,
            error: "Could not extract text from the uploaded file. The file may be empty or corrupted.",
          },
          { status: 400 }
        );
      }

      result = await analyzeTender(text.substring(0, 500000));
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported file type. Please upload a PDF, DOCX, or TXT file.",
        },
        { status: 400 }
      );
    }

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    // Save analysis record to Supabase
    await supabase.from("analyses").insert({
      user_id: user.id,
      file_name: fileName,
      project_name: result.data?.summary?.projectName || "Unknown",
      bid_score: result.data?.bidScore?.score ?? null,
    });

    return NextResponse.json({
      success: true,
      fileName,
      fileSize,
      analysis: result.data,
    });
  } catch (error) {
    console.error("Analysis API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your file. Please try again.",
      },
      { status: 500 }
    );
  }
}
