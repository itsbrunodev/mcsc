import Version from "@/components/Version";
import Players from "@/components/Players";
import Ram from "@/components/Ram";
import Form from "@/components/Form";
import EULA from "@/components/EULA";
import PortForward from "@/components/PortForward";

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
    .catch(() => []);

  return (
    <main>
      <div className="flex flex-col max-w-[450px] w-full h-full space-y-8">
        <div className="flex flex-col w-full h-44 space-y-2 justify-center items-center">
          <h1 className="text-amber-400 font-semibold text-8xl">mcsc</h1>
          <p className="text-zinc-400 text-xl">
            <span className="letter">M</span>ine
            <span className="letter">C</span>raft{" "}
            <span className="letter">S</span>erver{" "}
            <span className="letter">C</span>reator
          </p>
          <p className="text-zinc-500 text-sm">
            A tool that makes creating Minecraft servers much easier and faster.
          </p>
        </div>
        <Form>
          <Version versions={versions} />
          <Players />
          <Ram />
          <EULA />
          <PortForward />
          <p className="text-zinc-500 text-sm">
            <span className="text-amber-400 font-medium">Tip:</span> Windows
            users should run the file called{" "}
            <span className="underline">start.bat</span>; other users should run
            the file called <span className="underline">start.sh</span>.
          </p>
          <button className="!mt-6 bg-amber-400 hover:bg-amber-300 w-fit mx-auto py-1 px-3 rounded-md text-zinc-900">
            Download
          </button>
        </Form>
      </div>
    </main>
  );
}
