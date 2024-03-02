"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button className="border-2 rounded" onClick={() => signOut()}>
      Sign out
    </button>
  );
}
