import { createFileRoute, Outlet } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

let accessPromise: ReturnType<typeof createAnonymousAccess> | undefined;

async function createAnonymousAccess() {
  const { data: sessionData } = await supabase.auth.getSession();
  if (sessionData.session?.user) return sessionData.session.user;

  const { data, error } = await supabase.auth.signInAnonymously();
  if (error || !data.user) throw new Error("Não foi possível abrir o AppShelf agora.");
  return data.user;
}

function ensureAnonymousAccess() {
  accessPromise ??= createAnonymousAccess();
  return accessPromise;
}

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const user = await ensureAnonymousAccess();
    return { user };
  },
  component: () => <Outlet />,
});
