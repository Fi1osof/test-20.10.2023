"use client";

import React, { useEffect, useMemo } from "react";
import { useGamesRequest } from "../hooks/useGamesRequest";
import { ApiData, Game, Games } from "../interfaces";

type AppContextValue = {
  apiData: ApiData;
};

export const AppContext = React.createContext<AppContextValue | null>(null);

export const AppContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { apiData } = useGamesRequest();

  const context = useMemo<AppContextValue>(() => {
    return {
      apiData,
    };
  }, [apiData]);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
