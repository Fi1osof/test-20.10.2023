import { ApiData, Games } from "@/app/interfaces";
import styles from "./styles.module.scss";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { Button } from "@/app/components/ui/Button";
import Image from "next/image";
import { Select, SelectItem } from "@/app/components/ui/Select";
import Link from "next/link";

type Action =
  | {
      type: "initData";
      apiData: ApiData;
    }
  | {
      type: "loadMore";
    }
  | {
      type: "setFilter";
      name: string;
      value: string;
    };

type ReducerState = {
  apiData?: ApiData;
  gamesFiltered: Games;
  limit: number;
  // realFilter?: string;
  filters: Record<string, string>;
};

function reducer(prevState: ReducerState, action: Action) {
  const state = { ...prevState };

  switch (action.type) {
    case "initData":
      state.apiData = action.apiData;
      break;
    case "loadMore":
      state.limit += 12;
      break;
    case "setFilter":
      state.filters[action.name] = action.value;
      state.limit = 12;

      break;
  }

  state.gamesFiltered = state.apiData?.games ?? [];

  Object.keys(state.filters).forEach((filterName) => {
    const filterValue = state.filters[filterName];
    if (!filterValue) {
      return;
    }

    switch (filterName) {
      case "real":
        state.gamesFiltered = state.gamesFiltered.filter(
          (n) => filterValue in n.data.real
        );
        break;
      case "provider":
        state.gamesFiltered = state.gamesFiltered.filter(
          (n) => n.data.provider === filterValue
        );
        break;
    }
  });

  state.gamesFiltered = state.gamesFiltered.slice(0, state.limit);

  return state;
}

type GamesViewProps = {
  apiData: ApiData;
};

export const GamesView: React.FC<GamesViewProps> = ({ apiData }) => {
  const [state, dispatch] = useReducer(reducer, {
    gamesFiltered: [],
    limit: 12,
    filters: {},
  });

  useEffect(() => {
    dispatch({
      type: "initData",
      apiData,
    });
  }, [apiData]);

  const loadMore = useCallback(() => {
    dispatch({
      type: "loadMore",
    });
  }, []);

  const onChangeFilter = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = event.currentTarget;

      dispatch({
        type: "setFilter",
        name,
        value,
      });
    },
    []
  );

  const realSelect = useMemo(() => {
    const items: SelectItem[] = [];
    items.push({
      value: "",
      title: "Валюта",
    });

    state.apiData?.reals.forEach((n) => {
      items.push({
        value: n,
        title: n,
      });
    });

    return (
      <Select
        name="real"
        items={items}
        value={state.filters?.real || ""}
        onChange={onChangeFilter}
      />
    );
  }, [state.apiData?.reals, state.filters?.real, onChangeFilter]);

  const providerSelect = useMemo(() => {
    const items: SelectItem[] = [];
    items.push({
      value: "",
      title: "Провайдер",
    });

    state.apiData?.providers.forEach((n) => {
      items.push({
        value: n,
        title: n,
      });
    });

    return (
      <Select
        name="provider"
        items={items}
        value={state.filters?.provider || ""}
        onChange={onChangeFilter}
      />
    );
  }, [state.apiData?.providers, state.filters?.provider, onChangeFilter]);

  return (
    <div className={styles.gamesView}>
      <div className={styles.gamesListFilters}>
        {realSelect}
        {providerSelect}
      </div>
      <div className={styles.gamesListWrapper}>
        <div className={styles.gamesList}>
          {state.gamesFiltered.map((n) => {
            return (
              <Link key={n.id} href={`/game/${n.id}`}  className="gamesListItem"> 
                  <Image
                    src={`https://cdn2.softswiss.net/i/s2/${n.id}.png`}
                    alt={n.data.title}
                    width={337}
                    height={181}
                  />
                  {n.data.title} 
              </Link>
            );
          })}
        </div>
      </div>

      <div className={styles.footer}>
        <Button onClick={loadMore}>Показать еще</Button>
      </div>
    </div>
  );
};
