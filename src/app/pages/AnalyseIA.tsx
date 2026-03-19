import { Brain, Target, TrendingUp, Zap } from "lucide-react";
import { StatsCard } from "../components/dashboard/StatsCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import api from "../../lib/api";

// Mock data removed in favor of API fetching

export function AnalyseIA() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const fetchAnalysis = async () => {
    try {
      setLoading(true);
      const response = await api.get("/analysis");
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch analysis:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
     return <div className="py-20 text-center text-white/50 text-xs text-muted-foreground">Chargement des analyses IA...</div>;
  }

  const { stats, accuracyData, performanceData, riskZones } = data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Analyse Intelligence Artificielle</h1>
        <p className="text-white/50">Performance et métriques du système IA</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Précision globale"
          value={`${stats.globalAccuracy}%`}
          change={stats.accuracyChange}
          changeType={stats.accuracyChange.startsWith('+') ? "positive" : "negative"}
          icon={Target}
          delay={0}
        />
        <StatsCard
          title="Signalements analysés"
          value={stats.analyzedCount.toLocaleString()}
          change={stats.countChange}
          changeType={stats.countChange.startsWith('+') ? "positive" : "negative"}
          icon={Brain}
          delay={0.1}
        />
        <StatsCard
          title="Fiabilité moyenne"
          value={`${stats.averageReliability}%`}
          change={stats.reliabilityChange}
          changeType={stats.reliabilityChange.startsWith('+') ? "positive" : "negative"}
          icon={TrendingUp}
          delay={0.2}
        />
        <StatsCard
          title="Temps de traitement"
          value={`${stats.processingTime}s`}
          change={stats.timeChange}
          changeType={stats.timeChange.startsWith('-') ? "positive" : "negative"}
          icon={Zap}
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-xl border border-white/[0.07] p-6"
          style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)' }}
        >
          <h3 className="text-lg font-bold text-white mb-6">Précision par catégorie</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="category" 
                stroke="rgba(255,255,255,0.3)"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.3)"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  background: 'rgba(5, 14, 8, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Bar dataKey="accuracy" fill="#1FAF5A" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-xl border border-white/[0.07] p-6"
          style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)' }}
        >
          <h3 className="text-lg font-bold text-white mb-6">Évolution des performances</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="month" 
                stroke="rgba(255,255,255,0.3)"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.3)"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  background: 'rgba(5, 14, 8, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="precision" 
                stroke="#1FAF5A" 
                strokeWidth={2}
                dot={{ fill: '#1FAF5A', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="fiabilite" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#1FAF5A]"></div>
              <span className="text-xs text-white/70">Précision</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs text-white/70">Fiabilité</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="rounded-xl border border-white/[0.07] p-6"
        style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)' }}
      >
        <h3 className="text-lg font-bold text-white mb-4">Zones à risque identifiées</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {riskZones.map((item: any, index: number) => (
            <div
              key={item.zone}
              className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white">{item.zone}</h4>
                <span className={`text-xs font-bold ${item.trend.startsWith('+') ? 'text-amber-400' : 'text-[#1FAF5A]'}`}>{item.trend}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full"
                    style={{ width: `${item.risk}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-white">{item.risk}%</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
