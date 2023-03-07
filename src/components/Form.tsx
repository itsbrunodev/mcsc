"use client";

import { useState } from "react";
import fileDownload from "js-file-download";

import Loading from "./Loading";

export default function Form({ children }: React.PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      className="flex flex-col space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const {
          version: versionV,
          players: playersV,
          minRam: minRamV,
          maxRam: maxRamV,
          eula: eulaV,
        } = e.target as unknown as {
          version: { value: string };
          players: { value: number };
          minRam: { value: number };
          maxRam: { value: number };
          eula: { value: string };
        };

        const version = versionV.value;
        const players = Number(playersV.value);
        const minRam = Number(minRamV.value);
        const maxRam = Number(maxRamV.value);
        const eula = eulaV.value === "on" ? true : false;

        /* don't download if the eula wasn't accepted */
        if (eula === false) return;

        /* download the server files as a zip file */
        await fetch("/api/download", {
          method: "POST",
          body: JSON.stringify({
            version,
            players,
            minRam,
            maxRam,
          }),
        }).then(async (res) => {
          fileDownload(await res.arrayBuffer(), "server.zip");
          setIsLoading(false);
        });
      }}
    >
      {isLoading ? <Loading /> : children}
    </form>
  );
}
