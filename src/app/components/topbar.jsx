"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import "../styles/topbar.css";

export default function Topbar() {
  const [isAdmin, setIsAdmin] = useState(false);

  let path = usePathname();

  const isLogin = path === "/login" || path === "/register" || path === "/";

  const isProduct = path === "/products" ? "active" : "";
  const isUsers = path === "/users" ? "active" : "";
  const isOrders = path === "/orders" ? "active" : "";

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
          <Link href="/products" className={isProduct}>
            Produtos
          </Link>
        </li>

        {isAdmin && (
          <>
            <li>
              <Link href="/users" className={isUsers}>
                Usuários
              </Link>
            </li>
            <li>
              <Link href="/orders" className={isOrders}>
                Pedidos
              </Link>
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
