"use client";

import { createClient } from "@/utils/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = createClient();

const AuthUi = () => (
	<Auth
		supabaseClient={supabase}
		appearance={{ theme: ThemeSupa }}
		providers={["google"]}
		redirectTo={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/auth/callback/`}
		theme="dark"
		// onlyThirdPartyProviders
	/>
);

export default AuthUi;
