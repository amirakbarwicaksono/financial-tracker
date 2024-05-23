"use client";

import Home from "@/app/components/Home";
import Login from "@/app/components/Login";
import { supabase } from "@/app/utils/supabase/config";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function Main() {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
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
    return session ? <Home /> : <Login />;
}
