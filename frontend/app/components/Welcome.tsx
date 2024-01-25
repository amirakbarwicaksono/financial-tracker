import { useRouter } from "next/navigation";

const Welcome = () => {
    const router = useRouter();
    return (
        <div className="bg-neutral-950 h-screen flex justify-center items-center">
            <button
                className="text-white p-2 bg-green-600 rounded hover:bg-green-700 active:bg-green-900"
                onClick={() => router.push("/login")}
            >
                Login
            </button>
        </div>
    );
};

export default Welcome;
