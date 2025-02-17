import "./globals.css";
import { classname } from "./lib/utils";
import Navbar from "./components/ui/Navbar";

import { Bitter, Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  weight: ["400", "500", "600", "700"], // Add the weights you need
});

const bitter = Bitter({
  subsets: ["latin"],
  variable: "--font-bitter",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={classname("overscroll-none bg-white w-full antialiased")}
    >
      <body
        className={`overscroll-none min-h-screen flex flex-col ${lora.variable} ${bitter.variable}`}
      >
        <Navbar />
        <main className="px-5 w-full flex-grow ">{children}</main>
        <footer className="bg-tertiary border-t border-primary border-dashed h-20"></footer>
      </body>
    </html>
  );
}
