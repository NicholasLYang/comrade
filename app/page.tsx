import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import React from "react";
import Link from "next/link";
import SignOutButton from "@/app/SignOutButton";
import { prisma } from "@/app/prisma";

export default async function Home() {
  // @ts-ignore
  const session = await getServerSession(authOptions);
  let pageContent;
  if (session && session.user) {
    const chats = await prisma.chat.findMany({
      where: {
        members: {
          some: {
            user: {
              email: session.user.email,
            },
          },
        },
      },
    });

    pageContent = (
      <div className="flex flex-col">
        <h1>Welcome {session?.user?.name || ""}</h1>
        <Link className="contents" href="/chat">
          <button className="border-2 rounded">Start a chat?</button>
        </Link>
        <SignOutButton />
        <div>
          {chats.map((chat) => (
            <Link key={chat.docId} href={`/chat?id=${chat.docId}`}>
              <div className="border-2 rounded">{chat.name}</div>
            </Link>
          ))}
        </div>
      </div>
    );
  } else {
    pageContent = <Link href="/signin">Sign In</Link>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {pageContent}
    </main>
  );
}
