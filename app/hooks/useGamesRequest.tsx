import { useEffect, useState } from "react";
import { ApiData, Game, GameData, Games } from "../interfaces";

export const useGamesRequest = () => {
  const [apiData, apiDataSetter] = useState<ApiData>({
    games: [],
    providers: [],
    reals: [],
  });

  useEffect(() => {
    fetch("/games.json")
      .then((r) => r.json())
      .then((response: Record<string, GameData>) => {
        const reals = new Set<string>();
        const providers = new Set<string>();
        const games: ApiData["games"] = [];

        Object.keys(response).forEach((id) => {
          const game: Game = {
            id,
            data: response[id],
          };

          Object.keys(game.data.real).forEach((real) => {
            reals.add(real);
          });

          providers.add(game.data.provider);

          games.push(game);
        });

        games.sort(
          (a, b) =>
            a.data.collections.popularity - b.data.collections.popularity
        );

        apiDataSetter({
          games,
          reals: [...reals],
          providers: [...providers],
        });
      })
      .catch(console.error);
  }, []);

  return {
    apiData,
  };
};
