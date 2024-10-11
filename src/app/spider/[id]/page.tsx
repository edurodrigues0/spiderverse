import { Carousel } from "@/components/Carousel";
import { Header } from "@/components/Header";
import { IHero } from "@/interfaces/heroes";

interface SpiderPageProps {
  params: {
    id: string;
  };
}

async function getSpidersData(): Promise<{ data: IHero[] }> {
  const res = await fetch(`${process.env.DOMAIN_ORIGIN}/api/heroes`);

  if (!res.ok) {
    throw new Error("Failed to request heroes list");
  }

  return res.json();
}

export default async function Spider({ params: { id } }: SpiderPageProps) {
  const spiders = await getSpidersData();

  return (
    <>
      <Header />
      <Carousel spiders={spiders.data} activeId={id} />
    </>
  );
}
