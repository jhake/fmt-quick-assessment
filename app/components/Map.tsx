"use client";
import { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
} from "@react-google-maps/api";

import getURL from "../utils/getURL";

const containerStyle = {
  width: "100%",
  height: "600px",
};

export function Map({ flightId }: { flightId?: string }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const { data, loading, error } = usePeriodicallyFetchData(flightId);

  const waypoints =
    data?.waypoints.reduce((acc: any, curr: any, i: number) => {
      if (i % 2 === 0) {
        acc.push({ lat: curr, lng: data.waypoints[i + 1] });
      }
      return acc;
    }, []) ?? [];

  const lastPosition = {
    lat: data?.last_position?.latitude ?? 0,
    lng: data?.last_position?.longitude ?? 0,
  };

  if (!flightId) return <></>;

  if (error)
    return (
      <div className="w-full h-[600px] flex items-center justify-center">
        {error.message}
      </div>
    );

  if (loading)
    return (
      <div className="w-full h-[600px] flex items-center justify-center">
        Loading...
      </div>
    );

  return isLoaded && !!data ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={6}
      center={lastPosition}
    >
      <>
        <Marker position={lastPosition} />
        <Polyline path={waypoints} />
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

function usePeriodicallyFetchData(flightId?: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ message: string } | null>();
  const [refetchTimeout, setRefetchTimeout] = useState<NodeJS.Timeout>();
  const [toRefetch, setToRefetch] = useState(true);

  useEffect(() => {
    if (!toRefetch || !flightId) return;

    clearTimeout(refetchTimeout);

    (async () => {
      try {
        const res = await fetch(getURL(`/api/flight-position?id=${flightId}`));

        const data = await res.json();

        if (!res?.ok) {
          throw new Error(data?.title ?? "Failed to fetch");
        }

        setLoading(false);
        setData(data);
        setError(null);
        setToRefetch(false);
      } catch (error: any) {
        if (!data) setError(error);

        alert(error);
      }

      setRefetchTimeout(
        setTimeout(() => {
          setToRefetch(true);
        }, 1000 * 60 * 10)
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toRefetch, flightId]);

  useEffect(() => {
    if (!flightId) return;

    setToRefetch(true);
  }, [flightId]);

  return { data, loading, error };
}
