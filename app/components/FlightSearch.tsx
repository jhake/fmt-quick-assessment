import { use } from "react";
import Link from "next/link";

async function getData() {
  const res = await fetch(`http://localhost:3001/api/flight-search`);
  const data = await res.json();

  return data;
}

export function FlightSearch({ flightId }: { flightId?: string }) {
  const { flights } = use(getData());

  return (
    <div className="flex flex-col items-center justify-between p-24 w-full">
      <div className="text-2xl font-bold mb-2.5 text-left w-full">
        Enter the FA flight ID to track
      </div>
      <form className="flex w-full mb-10">
        <input
          type="text"
          defaultValue={flightId}
          name="flightId"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/2"
        />

        <button className="ml-2.5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Use flight
        </button>
      </form>
      <div className="text-2xl font-bold mb-2.5 text-left w-full">
        Or select a flight below
      </div>

      <div className="flex flex-row justify-between items-center w-full p-2.5 border-b border-gray-200 dark:border-gray-700 font-bold">
        <div className="w-1/3 text-center">Flight identifier</div>
        <div className="w-1/3 text-center">Origin</div>
        <div className="w-1/3 text-center">Destination</div>
      </div>
      {flights?.map((flight: any) => (
        <Link
          key={flight.fa_flight_id}
          className={`flex flex-row justify-between items-center w-full p-2.5 border-b border-gray-200 dark:border-gray-700 hover:dark:bg-gray-800  ${
            flight.fa_flight_id === flightId ? "bg-blue-700" : ""
          } }`}
          href={`?flightId=${flight.fa_flight_id}`}
        >
          <div className="w-1/3 text-center">{flight.ident}</div>
          <div className="w-1/3 text-center">
            {flight.origin.name} ({flight.origin.code})
          </div>
          <div className="w-1/3 text-center">
            {flight.destination.name} ({flight.destination.code})
          </div>
        </Link>
      ))}
    </div>
  );
}
