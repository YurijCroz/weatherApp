import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const useLocationPermission = () => {
  const [location, setLocation] = useState("");

  useEffect(() => {
    const getLocationPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(`${location.coords.latitude},${location.coords.longitude}`);
      }
    };

    getLocationPermission();
  }, []);

  return { location };
};

export default useLocationPermission;
