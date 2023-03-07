import Link from "next/link";

export default function Version({ versions }: { versions: string[] }) {
  return (
    <div className="flex flex-col space-y-1">
      <label>Server Version</label>
      <p className="text-zinc-500 text-sm">
        The version of the{" "}
        <Link
          href="https://en.wikipedia.org/wiki/Client_(computing)"
          target="_blank"
        >
          client
        </Link>{" "}
        and the{" "}
        <Link
          href="https://en.wikipedia.org/wiki/Server_(computing)"
          target="_blank"
        >
          server
        </Link>{" "}
        should be the same when connecting to a server. Though there are{" "}
        <Link
          href="https://github.com/ViaVersion/ViaVersion/blob/master/README.md"
          target="_blank"
        >
          exceptions
        </Link>
        .
      </p>
      <select required name="version">
        {versions.map((version, i) => {
          return (
            <option value={version} key={i}>
              {version}
            </option>
          );
        })}
      </select>
    </div>
  );
}
