export default function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center space-x-3">
      <div
        aria-hidden="true"
        className="inline-block border-amber-500 rounded-full border-2 border-b-zinc-800 border-l-zinc-800 w-8 h-8 animate-spin"
      ></div>
      <p className="text-zinc-400">Downloading, please wait...</p>
    </div>
  );
}
