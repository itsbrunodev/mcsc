import Image from "next/image";
import Link from "next/link";

import Version from "@/components/Version";
import Players from "@/components/Players";
import Ram from "@/components/Ram";
import Form from "@/components/Form";
import EULA from "@/components/EULA";
import PortForward from "@/components/PortForward";
import github from "@/assets/github.svg";
import Header from "@/components/Header";

export default async function Home() {
  /* get every available to download server version from the paper api */
  const versions: string[] = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://mcsc.vercel.app"
    }/api/versions`
  )
    .then(async (x) => await x.json())
    .catch(() => {
      throw "Couldn't retrieve server versions.";
    });

  return (
    <>
      <Header />
      <Form>
        <Version versions={versions} />
        <Players />
        <Ram />
        <PortForward />
        <EULA />
        <p className="text-zinc-500 text-sm">
          <span className="text-amber-400 font-medium">Note:</span> In order to
          run a Minecraft Java Edition server, you need to have the Java runtime
          installed on your computer. If you don&apos;t have it, you can
          download the installer{" "}
          <Link
            href="https://www.oracle.com/java/technologies/downloads/#java17"
            target="_blank"
          >
            from here
          </Link>
          .
        </p>
        <button className="!mt-6 bg-amber-400 hover:bg-amber-300 w-fit mx-auto py-2 px-4 rounded-md text-zinc-900 font-medium">
          Download
        </button>
      </Form>
      <div className="absolute top-3 md:right-0 right-2 !mt-0">
        <Link href="https://github.com/brunolepis/mcsc" target="_blank">
          <Image
            src={github}
            width={24}
            height={24}
            priority
            quality={100}
            title="GitHub Repository"
            alt="GitHub"
            draggable={false}
          />
        </Link>
      </div>
    </>
  );
}
