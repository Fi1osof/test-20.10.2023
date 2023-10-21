type GameCollections = Record<string, number>;

type Real = {
  id: number;
};

type GameReals = Record<string, Real>;

export type GameData = {
  title: string;
  provider: string;
  collections: GameCollections;
  real: GameReals;
  demo: string;
};

export type Game = {
  id: string;
  data: GameData;
};

export type Games = Array<Game>;

export type ApiData = {
  games: Games;
  reals: string[];
  providers: string[];
};
