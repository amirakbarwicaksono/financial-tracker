import AuthUi from "@/components/dashboard/AuthUi";

const Home = () => {
	return (
		<div className="flex min-h-screen items-center justify-center bg-neutral-900">
			<div className="flex w-full max-w-screen-md flex-col gap-2 p-2">
				<h1 className="text-center capitalize text-neutral-200">sign in</h1>
				<AuthUi />
			</div>
		</div>
	);
};

export default Home;
