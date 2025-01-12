"use client";
import { useRouter } from "next/navigation";

const Welcome = () => {
	const router = useRouter();
	return (
		<div className="flex h-screen items-center justify-center bg-neutral-950">
			<button
				className="rounded bg-green-600 p-2 text-white hover:bg-green-700 active:bg-green-900"
				onClick={() => router.push("/login")}
			>
				Login
			</button>
		</div>
	);
};

export default Welcome;
