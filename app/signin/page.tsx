import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignInButton from "@/app/signin/SignInButton";

interface Props {
  searchParams: Record<string, string>;
}

export default async function SignIn({ searchParams }: Props) {
  // @ts-ignore
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
