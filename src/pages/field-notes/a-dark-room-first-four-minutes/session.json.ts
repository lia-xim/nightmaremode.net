import type { APIRoute } from "astro";
import session from "@/data/studies/a-dark-room-session.json";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(JSON.stringify(session, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });