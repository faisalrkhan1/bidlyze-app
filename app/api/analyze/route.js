import { NextResponse } from "next/server";
import { analyzeTender } from "@/lib/gemini";

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

    let text = "";

    if (fileExtension === "pdf") {
      const pdfParse = require("pdf-parse");
      const buffer = Buffer.from(await file.arrayBuffer());
      const pdfData = await pdfParse(buffer);
      text = pdfData.text;
    } else if (fileExtension === "docx") {
      const mammoth = await import("mammoth");
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (fileExtension === "txt") {
      text = await file.text();
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported file type. Please upload a PDF, DOCX, or TXT file.",
        },
        { status: 400 }
      );
    }

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Could not extract text from the uploaded file. The file may be empty or corrupted.",
        },
        { status: 400 }
      );
    }

    // Truncate text to 500,000 characters max
    const truncatedText = text.substring(0, 500000);

    const result = await analyzeTender(truncatedText);

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
      textLength: truncatedText.length,
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
