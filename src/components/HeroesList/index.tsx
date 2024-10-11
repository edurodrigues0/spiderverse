"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { HeroPicture } from "../HeroPicture";

import styles from "./heroesList.module.scss";

import { spidermanFont } from "@/fonts";
import { IHero } from "@/interfaces/heroes";

interface HeroesListProps {
  heroes: IHero[];
}

export function HeroesList({ heroes }: HeroesListProps) {
  return (
    <>
      <motion.h1
        className={`${spidermanFont.className} ${styles.title}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.5 }}
      >
        Personagens
      </motion.h1>
      <motion.section
        className={styles.spiders}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
      >
        {heroes.map((hero) => (
          <motion.div
            key={hero.id}
            className={`${styles.imageContainer} ${styles[hero.id]}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <Link href={`/spider/${hero.id}`}>
              <HeroPicture
                spiderId={hero.id}
                name={hero.name}
                universe={hero.universe}
              />
            </Link>
          </motion.div>
        ))}
      </motion.section>
    </>
  );
}
