import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getGeneralSheet, validateAuthToken } from "../api-clients";
import Toast from "../caComponents/Toast";

const AppContext = createContext(undefined);

export const AppContextProvider = ({ children }) => {
  const [toast, setToast] = useState(undefined);
  const { isSuccess } = useQuery("validateToken", validateAuthToken, {
    retry: false,
  });

  const { data: genSheet } = useQuery({
    queryKey: "getSheetData_General",
    queryFn: () => getGeneralSheet(),
  });

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: isSuccess,
        showToast: (message, type = "SUCCESS") => setToast({ message, type }),
        windowSize,
        genSheet,
      }}
    >
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
