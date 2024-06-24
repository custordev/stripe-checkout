import Link from "next/link";
import React from "react";
import { CartMenu } from "./CartMenu";

export default function Navbar() {
  return (
    <div className="py-3 px-8 max-w-5xl mx-auto flex items-center  justify-between">
      <Link href={"/"}>Jb Store</Link>
      <Link href="/pricing">Pricing</Link>
      <CartMenu />
    </div>
  );
}
