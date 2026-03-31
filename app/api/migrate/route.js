import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * One-time migration endpoint to add Phase 1 columns.
 * Uses the service role key to run schema changes.
 * Call once: POST /api/migrate with Authorization header.
 */
export async function POST(request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // Test if columns exist by trying to select them
  const { error: testError } = await supabase
    .from("analyses")
    .select("notes")
    .limit(1);

  if (testError && testError.code === "42703") {
    // Column doesn't exist — need to run via SQL editor
    return NextResponse.json({
      success: false,
      message: "Columns do not exist yet. Please run this SQL in Supabase SQL Editor:",
      sql: `ALTER TABLE analyses ADD COLUMN IF NOT EXISTS notes text DEFAULT '';
ALTER TABLE analyses ADD COLUMN IF NOT EXISTS requirement_statuses jsonb DEFAULT '{}'::jsonb;`,
    });
  }

  // Check requirement_statuses too
  const { error: testError2 } = await supabase
    .from("analyses")
    .select("requirement_statuses")
    .limit(1);

  if (testError2 && testError2.code === "42703") {
    return NextResponse.json({
      success: false,
      message: "requirement_statuses column missing. Please run this SQL in Supabase SQL Editor:",
      sql: `ALTER TABLE analyses ADD COLUMN IF NOT EXISTS requirement_statuses jsonb DEFAULT '{}'::jsonb;`,
    });
  }

  return NextResponse.json({ success: true, message: "All Phase 1 columns exist." });
}
