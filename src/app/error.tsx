"use client";

import Header from "@/components/Header";

export default function Error({ error }: { error: Error }) {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center space-x-3 text-red-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
          <path d="M12 9v4"></path>
          <path d="M12 16v.01"></path>
        </svg>
        <p>{error.message.replace(/Error: /, "")}</p>
        <p>{error.stack}</p>
      </div>
    </>
  );
}
