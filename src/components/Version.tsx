"use client";

import { use } from "react";
import Link from "next/link";

async function getVersions() {
  return (await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://mcsc.vercel.app"
    }/api/versions`
  )
    .then(async (x) => await x.json())
    .catch(() => {
      return [];
    })) as string[];
}

export default function Version() {
  /* get every available to download server version from the paper api */
  const versions = use(getVersions());

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
          href="https://github.com/ViaVersion/ViaVersion#readme"
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
