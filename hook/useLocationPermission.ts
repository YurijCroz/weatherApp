import { useState, useEffect } from "react";
import * as Location from "expo-location";

const useLocationPermission = () => {
  const [location, setLocation] = useState("");

  useEffect(() => {
    const getLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const currentLocation = await Location.getCurrentPositionAsync({});
          setLocation(
            `${currentLocation.coords.latitude},${currentLocation.coords.longitude}`
          );
        }
      } catch (error) {
        console.error("Error requesting location permission:", error);
      }
    };

    getLocationPermission();
  }, []);

  return { location };
};

export default useLocationPermission;
