"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./supabase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
      setLoading(false);
    });
  }, [router]);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return { user, loading, logout };
}
