import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const res = await fetch(
    `https://aeroapi.flightaware.com/aeroapi/flights/${id}/position`,
    {
      headers: { "x-apikey": process.env.FLIGHTAWARE_API_KEY as string },
      body: null,
      method: "GET",
      next: { revalidate: 30 },
    }
  );
  const data = await res.json();

  return NextResponse.json(data);
}
