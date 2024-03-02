import { YDocProvider } from "@y-sweet/react";
import { getOrCreateDocAndToken } from "@y-sweet/sdk";
import { Grid } from "@/app/chat/Grid";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";
import { prisma } from "@/app/prisma";

type ChatProps = {
  searchParams: Record<string, string>;
};

async function validateChat(id: string, user: User) {
  const chat = await prisma.chat.findUnique({
    where: { docId: id },
    include: { members: true },
  });

  if (!chat) {
    return "Chat not found";
  }

  const member = chat.members.find((member) => member.userId === user.id);
  if (!member) {
    return "You are not a member of this chat";
  }
}

export default async function Chat({ searchParams }: ChatProps) {
  // @ts-ignore
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/signin");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email ?? undefined },
  });

  if (!user) {
    throw new Error("internal error: user should exist");
  }

  if (searchParams.id) {
    const message = await validateChat(searchParams.id, user);
    if (message) {
      return <div>{message}</div>;
    }
  }

  const clientToken = await getOrCreateDocAndToken(
    process.env.CONNECTION_STRING!,
    searchParams.doc,
  );

  // If we don't have an id, then we need to create this chat in the database
  if (!searchParams.id) {
    const result = await prisma.chat.create({
      data: {
        docId: clientToken.docId,
        members: {
          create: { userId: user.id },
        },
      },
    });
    console.log(result);
  }

  return (
    <YDocProvider clientToken={clientToken} setQueryParam="id">
      <Grid />
    </YDocProvider>
  );
}
