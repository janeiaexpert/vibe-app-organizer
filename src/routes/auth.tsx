import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  },
  head: () => ({
    meta: [
      { title: "Entrar no AppShelf — sua estante de apps" },
      {
        name: "description",
        content:
          "Acesse o AppShelf para cadastrar, organizar e acompanhar seus aplicativos Vibe Coding em um só lugar.",
      },
      { property: "og:title", content: "Entrar no AppShelf" },
      {
        property: "og:description",
        content: "Acesse sua estante pessoal de aplicativos Vibe Coding.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => null,
});
