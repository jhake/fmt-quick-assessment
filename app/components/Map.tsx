"use client";
import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "600px",
};

export function Map({ flightId }: { flightId: string }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const [coordinates, setCoordinates] = React.useState([]);
  const [toRefetch, setToRefetch] = React.useState(true);

  React.useEffect(() => {
    if (!toRefetch) return;

    (async () => {
      const res = await fetch(
        `http://localhost:3001/api/flight-position?id=${flightId}`,
        {
          next: { revalidate: 30 },
        }
      );
      const data = await res.json();
      console.log("data", data);

      // make [1,2,3,4,5,6] to [{lat: 1, lng: 2}, {lat: 3, lng: 4}, {lat: 5, lng: 6}}]
      const coordinates = data.waypoints.reduce(
        (acc: any, curr: any, i: number) => {
          if (i % 2 === 0) {
            acc.push({ lat: curr, lng: data.waypoints[i + 1] });
          }
          return acc;
        },
        []
      );

      console.log("coordinates", coordinates);
      setCoordinates(coordinates);

      setTimeout(() => {
        setToRefetch(true);
      }, 10000);
    })();
  }, [toRefetch, flightId]);

  const [map, setMap] = React.useState(null);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={6}
      center={coordinates[0]}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>
        <Marker position={coordinates[0]} />
        <Polyline path={coordinates} />
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}
