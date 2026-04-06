"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <h1 className="text-3xl font-extrabold text-center m-6">
        PRO<span className="text-orange-400">MSG</span>
      </h1>
      <p className="text-lg font-medium text-center m-6">
        You&apos;re not signed in yet, please sign in to continue.
      </p>{" "}
      <br />
      <button
        className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded text-white mx-auto cursor-pointer"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}
