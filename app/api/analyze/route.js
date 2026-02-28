import { NextResponse } from "next/server";
import { analyzeTender, analyzeTenderFromPDF } from "@/lib/gemini";

export const maxDuration = 60;

export async function POST(request) {
  try {
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
    const fileExtension = fileName.split(".").pop().toLowerCase();

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
