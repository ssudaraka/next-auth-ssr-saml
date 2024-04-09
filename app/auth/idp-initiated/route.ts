import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithSSO({
    domain: "sudaraka.com",
    options: {
      redirectTo: `${requestUrl.origin}/auth/callback`,
    },
  });

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }

  return NextResponse.json({
    message: "OK",
  });
}
