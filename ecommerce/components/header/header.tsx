import React from "react";
import Link from "next/link";
function Header() {
  return (
    <header>
      <nav>
        <div className="navbar flex justify-between bg-base-300">
          <Link href="/" className="btn text-lg">
            Ecommerce
          </Link>
          <ul className="flex">
            <li>
              <Link href="/cart">Cart</Link>
            </li>
            <li>
              <Link href="/singIn">Sign in</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
