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
      <body className={rubik.className}>{children}</body>
    </html>
  );
}
