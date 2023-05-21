import "./globals.css";
import { Inter } from "next/font/google";
import { classname } from "./lib/utils";
import Navbar from "./components/ui/Navbar";
import { PageAnimateWrapper } from "./components/PageAnimateWrapper";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={classname("bg-black antialiased", inter.className)}
    >
      <body className=" bg-gradient-to-r from-zinc-700 to-neutral-800 min-h-screen">
        {/* @ts-expect-error Server Component */}
        <Navbar />
        <main className="px-5">{children}</main>
        {/*allow for more height on mobile */}
        {/* <div className='h-40 md:hidden'></div> */}
      </body>
    </html>
  );
}
