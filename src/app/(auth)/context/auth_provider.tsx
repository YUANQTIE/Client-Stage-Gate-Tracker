"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import { ProfileType } from "@/types";
interface prop {
  children: ReactNode;
}

const auth_context = createContext<{ user: ProfileType | null }>({
  user: null,
});

export function AuthProvider({ children }: prop) {
  const [user, setUser] = useState<ProfileType | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function set_prisma_user(id: string) {
      if (id != "") {
        const { data, error } = await supabase
          .from("Profiles")
          .select()
          .eq("profile_id", id)
          .single();

        if (error || !data) {
          setUser(null);
          return;
        }

        const new_user: ProfileType = {
          client_id: data.client_id,
          department_id: data.department_id,
          phone: data.phone,
          email: data.email,
          image_id: data.image_id,
          first_name: data.first_name,
          last_name: data.last_name,
          profile_id: data.profile_id,
          job_title: data.job_title,
          is_deleted: data.is_deleted,
          deleted_at: data.deleted_at,
        };

        setUser(new_user);
      }
    }

    supabase.auth
      .getUser()
      .then(({ data }) => set_prisma_user(data.user?.id ? data.user?.id : ""));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user?.id) {
        setUser(null);
        return;
      }
      set_prisma_user(session.user.id);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <auth_context.Provider value={{ user }}>{children}</auth_context.Provider>
  );
}

export function useAuth() {
  const context = useContext(auth_context);

  return context;
}
