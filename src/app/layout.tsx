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
      className={classname("bg-black antialiased", inter.className)}
    >
      <body className=" dot-mask  min-h-screen">
        <Navbar />
        <main className="px-5">{children}</main>
      </body>
    </html>
  );
}
