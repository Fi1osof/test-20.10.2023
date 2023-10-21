"use client";

import { useContext } from "react";
import { PageProps } from "@/.next/types/app/page";
import { AppContext } from "@/app/context/AppContext";
import { GamePageView } from "./View";

export default function Game({ params }: PageProps) {
  const context = useContext(AppContext);

  const id: string | string[] | undefined = params.id;

  if (!id) {
    return null;
  }

  const gameId = Array.isArray(id) ? id.join("/") : id;

  const game = context?.apiData.games.find((n) => n.id === gameId);

  if (!game) {
    return null;
  }

  return <GamePageView game={game} />;
}
