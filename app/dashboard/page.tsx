import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
      <p>You are signed in as {session.user?.email}</p>
    </div>
  );
}