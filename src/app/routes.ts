import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Signalements } from "./pages/Signalements";
import { AnalyseIA } from "./pages/AnalyseIA";
import { Equipes } from "./pages/Equipes";
import { Recompenses } from "./pages/Recompenses";
import { Campagnes } from "./pages/Campagnes";
import { Rapports } from "./pages/Rapports";
import { Parametres } from "./pages/Parametres";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "signalements", Component: Signalements },
      { path: "analyse-ia", Component: AnalyseIA },
      { path: "equipes", Component: Equipes },
      { path: "recompenses", Component: Recompenses },
      { path: "campagnes", Component: Campagnes },
      { path: "rapports", Component: Rapports },
      { path: "parametres", Component: Parametres },
    ],
  },
]);