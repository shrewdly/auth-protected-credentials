"use client";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Auth = () => {
	return (
		<div>
			{/* <Link href="/api/auth/signin">Sign In</Link>
			<Link href="/api/auth/signout">Sign out</Link> */}
			<button className="bg-slate-200 rounded-md p-3" onClick={() => signIn()}>
				Sign in
			</button>
			<button className="bg-slate-200 rounded-md p-3" onClick={() => signOut()}>
				Sign Out
			</button>
			<br></br>
			<br></br>
		</div>
	);
};

export default Auth;
