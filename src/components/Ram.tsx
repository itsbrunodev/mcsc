import Link from "next/link";

export default function Ram() {
  return (
    <div className="flex flex-col space-y-1">
      <label>Minimum and Maximum RAM</label>
      <p className="text-zinc-500 text-sm">
        How much RAM to allocate to the server (measured in megabytes). This
        depends on the hardware specifications of your system. Read more{" "}
        <Link
          href="https://www.howtogeek.com/795147/how-to-allocate-more-ram-to-a-minecraft-server/"
          target="_blank"
        >
          here
        </Link>
        .
      </p>
      <div className="w-full md:space-x-1 md:space-y-0 space-y-2 flex md:flex-row flex-col">
        <input
          required
          name="minRam"
          type="number"
          placeholder="Minimum RAM"
          defaultValue={4096}
          min={1024}
        />
        <input
          required
          name="maxRam"
          type="number"
          placeholder="Maximum RAM"
          defaultValue={4096}
          min={1024}
        />
      </div>
    </div>
  );
}
