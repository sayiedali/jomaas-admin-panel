import { Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "./_components/_provider/Provider";

const mon = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Jomaa's Pizza & Donair Admin Panel ",
  description: "This is the admin panel of Jomaa's Pizza & Donair",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href={"https://i.postimg.cc/rwnxStLC/fav.png"}
        sizes="any"
      />
      <body className={mon.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
