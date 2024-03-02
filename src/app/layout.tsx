import "./globals.css";
import { Inter } from "next/font/google";
import { classname } from "./lib/utils";
import Navbar from "./components/ui/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={classname(
        "bg-gradient-to-r from-blue-800 to-neutral-600 min-h-screen w-full antialiased ",
        inter.className
      )}
    >
      <body className="">
        <Navbar />
        <main className="px-5 w-full">{children}</main>
      </body>
    </html>
  );
}
