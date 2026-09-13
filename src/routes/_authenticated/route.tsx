import { createFileRoute, Outlet } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (!error && data.user) return { user: data.user };

    const { data: anonymousData, error: anonymousError } = await supabase.auth.signInAnonymously();
    if (anonymousError || !anonymousData.user) {
      throw new Error("Não foi possível abrir o AppShelf agora.");
    }
    return { user: anonymousData.user };
  },
  component: () => <Outlet />,
});
