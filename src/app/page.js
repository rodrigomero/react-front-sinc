"use client";

import Image from "next/image";
import Link from "next/link";
import LoginPage from "./login/page";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push('/login');
  return(
  <button>
    Home
  </button>
  );
  
}


