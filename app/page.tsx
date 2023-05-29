import { Map } from "./components/Map";
import { FlightSearch } from "./components/FlightSearch";

export default function Home({
  searchParams,
}: {
  searchParams?: { flightId?: string };
}) {
  const flightId = searchParams?.flightId;

  return (
    <main className="flex w-screen max-w-[1300px] flex-col items-center mx-auto media p-8">
      <Map flightId={flightId} />
      <FlightSearch flightId={flightId} />
    </main>
  );
}
