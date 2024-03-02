import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import React from "react";
import Link from "next/link";
import SignOutButton from "@/app/SignOutButton";

export default async function Home() {
  // @ts-ignore
  const session = await getServerSession(authOptions);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session ? (
        <div>
          <h1>Welcome {session?.user?.name || ""}</h1>
          <Link href="/chat">Start a chat?</Link>
          <SignOutButton />
        </div>
      ) : (
        <Link href="/signin">Sign In</Link>
      )}
    </main>
  );
}
