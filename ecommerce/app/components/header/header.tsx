import React from "react";
import Link from "next/link";
function Header() {
  return (
    <header>
      <nav>
        <div className="navbar flex justify-between bg-base-300">
          <Link href="/" className="btn text-lg">
            <li> Ecommerce</li>
          </Link>
          <ul className="flex">
            <li>
              <Link href="/cart">Cart</Link>
            </li>
            <li>
              <Link href="/sign-in">Sign in</Link>
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
