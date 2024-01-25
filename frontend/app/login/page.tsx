"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Session } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "./config";

const Login = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
            setLoading(false);
        });

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (session) {
            redirect("/");
        }
    }, [session]);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="bg-neutral-950 flex justify-center items-center h-screen p-2">
            {!session && (
                <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
                    <Auth
                        supabaseClient={supabase}
                        appearance={{ theme: ThemeSupa }}
                        theme="dark"
                        providers={["google"]}
                    />
                </div>
            )}
        </div>
    );
};

export default Login;
