import "./globals.css";
import Sidebar from "./components/sidebar";

export const metadata = {
  title: "Musistore",
  description: "Music store",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <Sidebar />
        <div className="content">{children}</div> 
      </body>
    </html>
  );
}
