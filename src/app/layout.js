/* eslint-disable react/prop-types */
import { Roboto } from "next/font/google";
import Topbar from "./components/topbar";
import { EditProvider } from "./context/editContext";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata = {
  title: "Musistore",
  description: "Music store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <EditProvider>
          <Topbar />
          <div className="content">{children}</div>
        </EditProvider>
      </body>
    </html>
  );
}
