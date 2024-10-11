import styles from "./page.module.scss";

import { IHero } from "@/interfaces/heroes";
import { HeroesList } from "@/components/HeroesList";
import { Header } from "@/components/Header";

async function fetchHeroes(): Promise<{ data: IHero[] }> {
  const res = await fetch("http://localhost:3000/api/heroes");

  if (!res.ok) {
    throw new Error("Failed to request heroes list");
  }

  return res.json();
}

export default async function Home() {
  const heroes = await fetchHeroes();
  return (
    <>
      <Header />
      <main className={styles.main}>
        <HeroesList heroes={heroes.data} />
      </main>
    </>
  );
}
