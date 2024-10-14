"use client";

import { DragEvent, TouchEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SpiderDetails } from "../SpiderDetails";
import { HeroPicture } from "../HeroPicture";

import styles from "./styles.module.scss";

import { IHero } from "@/interfaces/heroes";

enum enPosition {
  FRONT = 0,
  MIDDLE = 1,
  BACK = 2,
}

interface CarouselProps {
  spiders: IHero[];
  activeId: string;
}

export function Carousel({ activeId, spiders }: CarouselProps) {
  const [visibleSpiders, setVisibleSpiders] = useState<IHero[] | null>(null);
  const [activeHero, setActiveHero] = useState<number>(
    spiders.findIndex((spider) => spider.id === activeId) - 1
  );
  const [startInteractionPosition, setStartInteractionPosition] = useState(0);

  function changeActiveHero(newDirection: number) {
    setActiveHero((prevState) => prevState + newDirection);
  }

  function handleDragStart(e: DragEvent<HTMLDivElement>) {
    setStartInteractionPosition(e.clientX);
  }

  function handleDragEnd(e: DragEvent<HTMLDivElement>) {
    if (!startInteractionPosition) {
      return null;
    }

    changeDragTouch(e.clientX);
  }

  function handleTouchStart(e: TouchEvent<HTMLDivElement>) {
    setStartInteractionPosition(e.touches[0].clientX);
  }

  function handleTouchEnd(e: TouchEvent<HTMLDivElement>) {
    if (!startInteractionPosition) {
      return null;
    }

    changeDragTouch(e.changedTouches[0].clientX);
  }

  function changeDragTouch(clientX: number) {
    if (!startInteractionPosition) {
      return null;
    }

    const endInteractionPosition = clientX;
    const diffPosition = endInteractionPosition - startInteractionPosition;

    const newPosition = diffPosition > 0 ? -1 : +1;
    changeActiveHero(newPosition);
  }

  const transtionAudio = useMemo(() => new Audio("/songs/transition.mp3"), []);

  const voicesAudio: Record<string, HTMLAudioElement> = useMemo(
    () => ({
      "spider-man-616": new Audio("/songs/spider-man-616.mp3"),
      "mulher-aranha-65": new Audio("/songs/mulher-aranha-65.mp3"),
      "spider-man-1610": new Audio("/songs/spider-man-1610.mp3"),
      "sp-dr-14512": new Audio("/songs/sp-dr-14512.mp3"),
      "spider-ham-8311": new Audio("/songs/spider-ham-8311.mp3"),
      "spider-man-90214": new Audio("/songs/spider-man-90214.mp3"),
      "spider-man-928": new Audio("/songs/spider-man-928.mp3"),
    }),
    []
  );

  useEffect(() => {
    if (!visibleSpiders) {
      return;
    }

    transtionAudio.play();

    const voiceAudio = voicesAudio[visibleSpiders[enPosition.MIDDLE].id];

    if (!voiceAudio) {
      return;
    }

    voiceAudio.volume = 0.3;
    voiceAudio.play();
  }, [visibleSpiders, transtionAudio, voicesAudio]);

  useEffect(() => {
    const indexInArrayScope =
      ((activeHero % spiders.length) + spiders.length) % spiders.length;
    const visibleSpiders = [...spiders, ...spiders].slice(
      indexInArrayScope,
      indexInArrayScope + 3
    );

    setVisibleSpiders(visibleSpiders);
  }, [activeHero, spiders]);

  useEffect(() => {
    const htmlElement = document.querySelector("html");

    if (!htmlElement || !visibleSpiders) {
      return;
    }

    const currentSpiderId = visibleSpiders[enPosition.MIDDLE].id;
    htmlElement.style.backgroundImage = `url("/spiders/${currentSpiderId}-background.png")`;
    htmlElement.classList.add("hero-page");

    return () => {
      htmlElement.classList.remove("hero-page");
    };
  }, [visibleSpiders]);

  if (!visibleSpiders) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <div
          className={styles.wrapper}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="popLayout">
            {visibleSpiders?.map((spider, position) => (
              <motion.div
                key={spider.id}
                className={styles.spider}
                initial={{
                  x: -1500,
                  scale: 0.75,
                }}
                animate={{
                  x: 0,
                  ...getSpiderStyles(position),
                }}
                exit={{
                  x: 0,
                  opacity: 0,
                  scale: 1,
                  left: "-20%",
                }}
                transition={{ duration: 0.8 }}
              >
                <HeroPicture
                  spiderId={spider.id}
                  name={spider.name}
                  universe={spider.universe}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        className={styles.details}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
      >
        <SpiderDetails data={visibleSpiders[enPosition.MIDDLE]} />
      </motion.div>
    </div>
  );
}

function getSpiderStyles(position: enPosition) {
  switch (position) {
    case enPosition.FRONT:
      return {
        zIndex: 3,
        filter: "blur(10px)",
        scale: 1.2,
      };
    case enPosition.MIDDLE:
      return {
        zIndex: 2,
        left: 300,
        scale: 0.8,
        top: "-10%",
      };
    case enPosition.BACK:
      return {
        zIndex: 1,
        filter: "blur(10px)",
        left: 160,
        top: "-20%",
        scale: 0.6,
        opacity: 0.8,
      };
  }
}
