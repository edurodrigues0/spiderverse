import { SpiderDetails } from "../SpiderDetails";

import styles from "./styles.module.scss";

import { IHero } from "@/interfaces/heroes";

interface CarouselProps {
  spiders: IHero[];
  activeId: string;
}

export function Carousel({ activeId, spiders }: CarouselProps) {
  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <div className={styles.wrapper}></div>
      </div>

      <div className={styles.details}>
        <SpiderDetails data={spiders[0]} />
      </div>
    </div>
  );
}
