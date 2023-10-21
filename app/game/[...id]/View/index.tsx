import { Button } from "@/app/components/ui/Button";
import { Game } from "@/app/interfaces";
import Link from "next/link";
import styles from "./styles.module.scss";

type GamePageViewProps = {
  game: Game;
};

export const GamePageView: React.FC<GamePageViewProps> = ({ game }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <Link href="/" className={styles.link}>
          <Button>На главную</Button>
        </Link>

        <h1 className="text-4xl">{game.data.title}</h1>
      </div>
    </>
  );
};
