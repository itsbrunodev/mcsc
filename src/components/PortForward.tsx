import Link from "next/link";

export default function PortForward() {
  return (
    <div className="flex flex-col space-y-1">
      <label>Public Server</label>
      <p className="text-zinc-500 text-sm">
        In order to make your server available for everyone to join, watch{" "}
        <Link href="https://youtu.be/X75GbRaGzu8" target="_blank">
          this video
        </Link>{" "}
        after you have downloaded and run your server for the first time.
      </p>
    </div>
  );
}
