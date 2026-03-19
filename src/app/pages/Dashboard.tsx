import { AlertCircle, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { StatsCard } from "../components/dashboard/StatsCard";
import { MapView } from "../components/dashboard/MapView";
import { RecentAlerts } from "../components/dashboard/RecentAlerts";
import { WasteTypesChart } from "../components/dashboard/WasteTypesChart";
import { ActivityChart } from "../components/dashboard/ActivityChart";
import { UserReports } from "../components/dashboard/UserReports";
import { RewardsSystem } from "../components/dashboard/RewardsSystem";

export function Dashboard() {
  return (
    <div className="space-y-5">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-0.5">Tableau de bord</h1>
        <p className="text-xs text-muted-foreground">Vue d'ensemble de la gestion environnementale • Dakar, Sénégal</p>
      </div>

      {/* Stats Cards - Compact Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard
          title="Signalements actifs"
          value={24}
          change="+12%"
          changeType="positive"
          icon={AlertCircle}
          delay={0}
        />
        <StatsCard
          title="En cours"
          value={15}
          change="-8%"
          changeType="negative"
          icon={Clock}
          delay={0.1}
        />
        <StatsCard
          title="Résolus (7j)"
          value={43}
          change="+23%"
          changeType="positive"
          icon={CheckCircle}
          delay={0.2}
        />
        <StatsCard
          title="Taux résolution"
          value="87%"
          change="+5%"
          changeType="positive"
          icon={TrendingUp}
          delay={0.3}
        />
      </div>

      {/* Map and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <MapView />
        </div>
        <div>
          <RecentAlerts />
        </div>
      </div>

      {/* User Reports with Photos */}
      <UserReports />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ActivityChart />
        <WasteTypesChart />
      </div>

      {/* Rewards and Badges System */}
      <RewardsSystem />
    </div>
  );
}