import { Link } from "@tanstack/react-router";
import { Archive, Boxes, LayoutDashboard, LogOut, PanelsTopLeft } from "lucide-react";
import { useState, type ReactNode } from "react";

import { supabase } from "@/integrations/supabase/client";

const NAV = [
  { to: "/dashboard", label: "Painel", icon: LayoutDashboard },
  { to: "/apps", label: "Meus apps", icon: Boxes },
  { to: "/sistemas", label: "Meus sistemas", icon: PanelsTopLeft },
  { to: "/arquivados", label: "Arquivados", icon: Archive },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [leaving, setLeaving] = useState(false);

  async function signOut() {
    setLeaving(true);
    await supabase.auth.signOut();
    window.location.href = "/auth";
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Boxes className="size-5" aria-hidden="true" />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">AppShelf</span>
          </Link>

          <nav aria-label="Navegação principal" className="ml-2 hidden gap-1 sm:flex">
            {NAV.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={signOut}
            disabled={leaving}
            className="ml-auto inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-wait disabled:opacity-60"
          >
            <LogOut className="size-4" aria-hidden="true" />
            <span className="hidden md:inline">{leaving ? "Saindo…" : "Sair"}</span>
          </button>
        </div>

        <nav
          aria-label="Navegação principal (móvel)"
          className="flex gap-1 overflow-x-auto border-t border-border px-3 py-2 sm:hidden"
        >
          {NAV.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="inline-flex min-w-max flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
