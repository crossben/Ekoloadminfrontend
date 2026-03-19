import { AlertCircle, CheckCircle, Clock, TrendingUp, Loader2 } from "lucide-react";
import { StatsCard } from "../components/dashboard/StatsCard";
import { MapView } from "../components/dashboard/MapView";
import { RecentAlerts } from "../components/dashboard/RecentAlerts";
import { WasteTypesChart } from "../components/dashboard/WasteTypesChart";
import { ActivityChart } from "../components/dashboard/ActivityChart";
import { UserReports } from "../components/dashboard/UserReports";
import { RewardsSystem } from "../components/dashboard/RewardsSystem";
import { useEffect, useState } from "react";
import api from "../../lib/api";

export function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/dashboard');
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#1FAF5A] animate-spin" />
      </div>
    );
  }

  const stats = data?.stats || {};

  return (
    <div className="space-y-5">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-0.5">Tableau de bord</h1>
        <p className="text-xs text-muted-foreground">Vue d'ensemble de la gestion environnementale • Dakar, Sénégal</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard
          title="Signalements actifs"
          value={stats.active || 0}
          change={stats.activeChange || "+0%"}
          changeType="positive"
          icon={AlertCircle}
          delay={0}
        />
        <StatsCard
          title="En cours"
          value={stats.inProgress || 0}
          change="-0%"
          changeType="negative"
          icon={Clock}
          delay={0.1}
        />
        <StatsCard
          title="Résolus"
          value={stats.resolved || 0}
          change={stats.resolvedChange || "+0%"}
          changeType="positive"
          icon={CheckCircle}
          delay={0.2}
        />
        <StatsCard
          title="Taux résolution"
          value={stats.resolutionRate || "0%"}
          change="+0%"
          changeType="positive"
          icon={TrendingUp}
          delay={0.3}
        />
      </div>

      {/* Map and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <MapView reports={data?.recentAlerts} />
        </div>
        <div>
          <RecentAlerts alerts={data?.recentAlerts} />
        </div>
      </div>

      {/* User Reports with Photos */}
      <UserReports reports={data?.recentAlerts} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ActivityChart data={data?.activityData} />
        <WasteTypesChart data={data?.wasteTypes} />
      </div>

      {/* Rewards and Badges System */}
      <RewardsSystem topContributors={data?.topContributors} badges={data?.badges} />
    </div>
  );
}