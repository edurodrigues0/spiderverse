import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header>
      <Image
        src="/icons/menu.svg"
        alt="Opções de menu"
        width={36}
        height={25}
      />

      <Link href="/">
        <Image src="/spider-logo.svg" alt="Spiderman" width={260} height={70} />
      </Link>

      <Image src="/icons/user.svg" alt="Login" width={36} height={36} />
    </header>
  );
}
