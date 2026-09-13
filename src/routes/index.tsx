import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  ssr: false,
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  },
  head: () => ({
    meta: [
      { title: "AppShelf — organize seus apps Vibe Coding" },
      {
        name: "description",
        content:
          "AppShelf é seu portal pessoal para cadastrar, organizar, favoritar e acompanhar todos os aplicativos que você cria.",
      },
      { property: "og:title", content: "AppShelf — organize seus apps Vibe Coding" },
      {
        property: "og:description",
        content: "Cadastre, organize e acompanhe todos os aplicativos que você cria.",
      },
    ],
  }),
  component: () => null,
});
