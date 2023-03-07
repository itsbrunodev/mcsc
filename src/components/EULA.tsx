import Link from "next/link";

export default function EULA() {
  return (
    <div className="flex flex-col space-y-1">
      <label>Do you accept the EULA?</label>
      <p className="text-zinc-500 text-sm">
        Whether or not you accept Mojang&apos;s{" "}
        <Link href="https://www.minecraft.net/en-us/eula" target="_blank">
          EULA
        </Link>
        .
      </p>
      <input required name="eula" type="checkbox" defaultChecked={false} />
    </div>
  );
}
