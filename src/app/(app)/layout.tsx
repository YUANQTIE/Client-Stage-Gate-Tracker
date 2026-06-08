import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) redirect("/login");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar will go here */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
