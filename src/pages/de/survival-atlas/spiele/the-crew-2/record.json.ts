import { getSurvivalCase, publicSurvivalRecord } from "@/data/survival-atlas";

export const GET = () => new Response(JSON.stringify(publicSurvivalRecord(getSurvivalCase("the-crew-2")), null, 2), {
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=3600" },
});
