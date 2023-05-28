import { use } from "react";
import { Map } from "./components/Map";
import { FlightSearch } from "./components/FlightSearch";

// type Coordinate = {
//   lat: number;
//   lng: number;
// };

// async function getData() {
//   const id = "N107BH-1685205991-adhoc-322p";

//   const res = await fetch(
//     `http://localhost:3001/api/flight-position?id=${id}`,
//     {
//       next: { revalidate: 30 },
//     }
//   );
//   const data = await res.json();
//   console.log("data", data);

//   // make [1,2,3,4,5,6] to [{lat: 1, lng: 2}, {lat: 3, lng: 4}, {lat: 5, lng: 6}}]
//   const coordinates = data.waypoints.reduce(
//     (acc: any, curr: any, i: number) => {
//       if (i % 2 === 0) {
//         acc.push({ lat: curr, lng: data.waypoints[i + 1] });
//       }
//       return acc;
//     },
//     []
//   );

//   return coordinates;
// }

export default function Home({
  searchParams,
}: {
  searchParams?: { flightId?: string };
}) {
  const flightId = searchParams?.flightId;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Map flightId={flightId} />
      <FlightSearch flightId={flightId} />
    </main>
  );
}
