import { use } from "react";
import { Map } from "./components/Map";

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

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Map flightId="N107BH-1685205991-adhoc-322p" />
      <input
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </main>
  );
}
