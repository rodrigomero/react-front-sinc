import Image from "next/image";
import Link from "next/link";
import LoginPage from "./login/page";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
  
}


