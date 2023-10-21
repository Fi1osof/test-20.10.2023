"use client";

import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { GamesView } from "./View";

export const Games: React.FC = () => {
  const { apiData } = useContext(AppContext) || {};

  return apiData ? <GamesView apiData={apiData} /> : null;
};
