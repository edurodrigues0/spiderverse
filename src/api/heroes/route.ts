import { NextResponse } from "next/server";

import { api } from "@/lib/api";

export async function GET() {
  const res = await api.get("/api/heroes");
  const data = await res.data();

  return NextResponse.json({ data });
}
