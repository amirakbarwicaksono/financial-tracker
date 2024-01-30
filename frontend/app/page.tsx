"use client";

import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Welcome from "./components/Welcome";
import { supabase } from "./login/config";

export default function Main() {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            // console.log(event, session);
            localStorage.setItem("access_token", session?.access_token ?? "");
            localStorage.setItem("refresh_token", session?.refresh_token ?? "");
            localStorage.setItem("user", JSON.stringify(session?.user) ?? "");
            setSession(session);
            setLoading(false);
        });

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    return session ? <Home /> : <Welcome />;
}
