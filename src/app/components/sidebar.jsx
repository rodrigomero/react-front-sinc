"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../styles/sidebar.css";

export default function Sidebar() {
  const [isAdmin, setIsAdmin] = useState(false);

  const isLogin = usePathname() === "/login";

  useEffect(() => {
    const isAdminValue = localStorage.getItem("isAdmin");
    if (isAdminValue === "true") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  return !isLogin ? (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <Link href="/products">Produtos</Link>
          </li>

          {isAdmin && (
            <>
              <li>
                <Link href="/users">Usuários</Link>
              </li>
              <li>
                <Link href="/orders">Pedidos</Link>
              </li>
            </>
          )}

          <li>
            <Link href="/login">Logout</Link>
          </li>
        </ul>
      </nav>
    </aside>
  ) : null;
}
