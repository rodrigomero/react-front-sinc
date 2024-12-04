import "./globals.css";
import Topbar from "./components/topbar";
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
})
 

export const metadata = {
  title: "Musistore",
  description: "Music store",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={roboto.className}>
      <body>
        <Topbar />
        <div className="content">{children}</div> 
      </body>
    </html>
  );
}
