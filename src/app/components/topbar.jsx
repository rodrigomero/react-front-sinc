"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import "../styles/topbar.css";

export default function Topbar() {
  const [isAdmin, setIsAdmin] = useState(false);

  const isLogin = usePathname() === "/login" || usePathname() === "/register" || usePathname() === "/";
  const isProduct = usePathname() === "/products" ? "active" : ""
  const isUsers = usePathname() === "/users" ? "active" : ""
  const isOrders = usePathname() === "/orders" ? "active" : ""

  useEffect(() => {
    const isAdminValue = localStorage.getItem("isAdmin");
    if (isAdminValue === "true") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  return !isLogin ? (
    <nav className="topnav">
      
        <ul>
          <li>
            <Link href="/products" className={isProduct}>Produtos</Link>
          </li>

          {isAdmin && (
            <>
              <li>
                <Link href="/users" className={isUsers}>Usuários</Link>
              </li>
              <li>
                <Link href="/orders" className={isOrders}>Pedidos</Link>
              </li>
            </>
          )}

          <li>
            <Link href="/login">Logout</Link>
          </li>
        </ul>
      
    </nav>
  ) : null;
}
