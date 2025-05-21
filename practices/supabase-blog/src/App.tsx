import "./index.css";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import type { Session } from "@supabase/supabase-js";
import { Routes, Route, Navigate } from "react-router-dom";
import supabase from "@/lib/supabase/client";
import Dashboard from "./components/dashboard";
import { Layout } from "./components/layout/Layout";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            session ? (
              <Navigate to="/todos" replace />
            ) : (
              <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
              </div>
            )
          }
        />
        <Route
          path="/todos"
          element={
            session ? (
              <Dashboard />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Layout>
  );
}
