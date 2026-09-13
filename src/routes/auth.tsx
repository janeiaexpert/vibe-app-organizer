import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, Boxes, LoaderCircle, LockKeyhole } from "lucide-react";

import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user && !data.session.user.is_anonymous) throw redirect({ to: "/dashboard" });
  },
  head: () => ({
    meta: [
      { title: "Entrar no AppShelf — sua estante de apps" },
      { name: "description", content: "Entre com sua conta Google para acessar sua estante pessoal de aplicativos." },
      { property: "og:title", content: "Entrar no AppShelf" },
      { property: "og:description", content: "Acesse sua estante pessoal de aplicativos com sua conta Google." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
      <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.8 3-4.3 3-7.3Z" />
      <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.5L15.4 17c-.9.6-2 1-3.4 1a5.8 5.8 0 0 1-5.5-4H3.2v2.6A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.5 14a6 6 0 0 1 0-3.9V7.5H3.2a10 10 0 0 0 0 9l3.3-2.5Z" />
      <path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.8A9.7 9.7 0 0 0 3.2 7.5l3.3 2.6A5.8 5.8 0 0 1 12 6Z" />
    </svg>
  );
}

function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function enterWithGoogle() {
    setLoading(true);
    setError("");
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: `${window.location.origin}/dashboard`,
      });
      if (result.error) throw result.error;
      if (!result.redirected) window.location.href = "/dashboard";
    } catch {
      setError("Não foi possível entrar com o Google. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-5 py-12">
      <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-accent/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 right-0 size-96 rounded-full bg-secondary/70 blur-3xl" />
      <section className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-border bg-card/95 p-7 shadow-[0_30px_80px_-38px_oklch(0.268_0.031_52/0.45)] backdrop-blur sm:p-10">
        <div className="mb-10 flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm"><Boxes className="size-6" aria-hidden="true" /></span>
          <span className="font-display text-2xl font-semibold tracking-tight">AppShelf</span>
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Sua estante digital</p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight">Seus projetos,<br />sempre à mão.</h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">Entre para organizar, favoritar e acompanhar todos os aplicativos que você cria.</p>
        <button type="button" onClick={enterWithGoogle} disabled={loading} className="mt-9 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-input bg-white px-5 text-sm font-semibold text-[#2f2f2f] shadow-sm transition-[transform,box-shadow,background-color] hover:-translate-y-0.5 hover:bg-[#fafafa] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:translate-y-0 disabled:cursor-wait disabled:opacity-70">
          {loading ? <LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> : <GoogleMark />}
          {loading ? "Conectando ao Google…" : "Continuar com Google"}
        </button>
        {error && <div role="alert" className="mt-4 flex items-start gap-2 rounded-xl bg-destructive/8 p-3 text-sm text-destructive"><AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" /><span>{error}</span></div>}
        <div className="mt-7 flex items-center justify-center gap-2 text-xs text-muted-foreground"><LockKeyhole className="size-3.5" aria-hidden="true" />Acesso seguro pela sua conta Google</div>
      </section>
    </main>
  );
}
