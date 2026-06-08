import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

async function UserData() {
	const supabase = await createClient();
	const { data: Users } = await supabase.from("Users").select();
	console.log({ data: Users })

  	return <pre>{JSON.stringify(Users, null, 2)}</pre>;
}

export default function Users() {
	return (
		<Suspense fallback={<div>Loading user data...</div>}>
		<UserData />
		</Suspense>
	);
}