import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const res = await fetch(
      `https://aeroapi.flightaware.com/aeroapi/flights/${id}/position`,
      {
        headers: { "x-apikey": process.env.FLIGHTAWARE_API_KEY as string },
        body: null,
        method: "GET",
        next: { revalidate: 60 },
      }
    );

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  // const time = new Date().getTime() - 1685254232912;

  // const thirtySecondsElapsedCount = Math.floor(time / 1000);

  // console.log(thirtySecondsElapsedCount);

  // const fakeWaypoints = new Array(thirtySecondsElapsedCount * 2)
  //   .fill(0)
  //   .map((_, i) => i * 0.003 + Math.random() * 0.01);

  // const data = { waypoints: fakeWaypoints.reverse() };
}
