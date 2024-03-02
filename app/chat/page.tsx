import { YDocProvider } from "@y-sweet/react";
import { getOrCreateDocAndToken } from "@y-sweet/sdk";
import { Grid } from "@/app/chat/Grid";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

type ChatProps = {
  searchParams: Record<string, string>;
};

export default async function Chat({ searchParams }: ChatProps) {
  // @ts-ignore
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }
  const clientToken = await getOrCreateDocAndToken(
    process.env.CONNECTION_STRING!,
    searchParams.doc,
  );

  return (
    <YDocProvider clientToken={clientToken} setQueryParam="doc">
      <Grid />
    </YDocProvider>
  );
}
