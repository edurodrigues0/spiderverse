import Image from "next/image";

export default function Home() {
  return (
    <>
      <header>
        <Image
          src="/icons/menu.svg"
          alt="Opções de menu"
          width={36}
          height={25}
        />

        <Image src="/spider-logo.svg" alt="Spiderman" width={260} height={70} />

        <Image src="/icons/user.svg" alt="Login" width={36} height={36} />
      </header>
    </>
  );
}
