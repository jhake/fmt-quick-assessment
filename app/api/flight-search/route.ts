import { NextResponse } from "next/server";

export async function GET() {
  const query =
    "{false arrived} {notnull waypoints} {> lastPositionTime 0} {!= lat 0} {!= lon 0}";

  const res = await fetch(
    `https://aeroapi.flightaware.com/aeroapi/flights/search/advanced?query=${query}`,
    {
      headers: { "x-apikey": process.env.FLIGHTAWARE_API_KEY as string },
      body: null,
      method: "GET",
    }
  );
  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
