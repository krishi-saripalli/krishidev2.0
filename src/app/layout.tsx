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
        "overscroll-none bg-white w-full antialiased ",
        inter.className
      )}
    >
      <body className=" overscroll-none min-h-screen flex flex-col">
        <Navbar />
        <main className="px-5 w-full flex-grow ">
          {children}
          </main>
        <footer className="bg-tertiary border-t border-primary border-dashed h-20"></footer>
      </body>
    </html>
  );
}
