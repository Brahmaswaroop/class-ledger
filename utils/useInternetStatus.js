// useInternetStatus.js
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export const useInternetStatus = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  return isConnected;
};
