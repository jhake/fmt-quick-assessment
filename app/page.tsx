import { Map } from "./components/Map";
import { FlightSearch } from "./components/FlightSearch";

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
