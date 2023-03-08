export default function Header() {
  return (
    <div className="flex flex-col w-full h-44 space-y-2 justify-center items-center">
      <h1 className="text-amber-400 font-semibold text-8xl">mcsc</h1>
      <p className="text-zinc-400 text-xl">
        <span className="letter">M</span>ine
        <span className="letter">C</span>raft <span className="letter">S</span>
        erver <span className="letter">C</span>reator
      </p>
      <p className="text-zinc-500 text-sm">
        A tool that makes creating Minecraft servers much easier and faster.
      </p>
    </div>
  );
}
