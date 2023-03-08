import { Rubik } from "next/font/google";

import "./globals.css";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "mcsc",
  description: "Minecraft Server Creator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <main>
          <div className="flex flex-col max-w-[450px] w-full md:px-0 px-2 h-full space-y-6 relative">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
