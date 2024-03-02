import { signIn } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignInButton from "@/app/signin/SignInButton";

interface Props {
  searchParams: Record<string, string>;
}

export default async function SignIn({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (session) {
    const redirectPath = searchParams.redirect || "/";
    redirect(redirectPath);
  }

  return (
    <div>
      <SignInButton />
    </div>
  );
}
