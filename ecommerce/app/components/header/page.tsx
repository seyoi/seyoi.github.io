"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";

function Header() {
  const userState = useAuth();
  return (
    <header>
      <nav>
        <div className="navbar flex justify-between bg-base-300">
          <Link href="/" className="btn text-lg">
            <li> EC</li>
          </Link>
          <ul className="flex">
            <li>
              <Link href="/cart">Cart</Link>
            </li>
            <li>
              <Link href="/my-page">My page</Link>
            </li>
            <li>
              <Link href="/admin">Admin</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
