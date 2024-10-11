import { api } from "@/lib/api";

export async function GET() {
  const res = await api.get("/heroes");
  const data = await res.data;

  return Response.json({ data });
}
