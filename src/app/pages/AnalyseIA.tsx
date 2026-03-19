import { Brain, Target, TrendingUp, Zap } from "lucide-react";
import { StatsCard } from "../components/dashboard/StatsCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { motion } from "motion/react";

const accuracyData = [
  { category: "Plastique", accuracy: 96 },
  { category: "Organique", accuracy: 92 },
  { category: "Papier", accuracy: 89 },
  { category: "Verre", accuracy: 94 },
  { category: "Métaux", accuracy: 87 },
];

const performanceData = [
  { month: "Jan", precision: 88, fiabilite: 85 },
  { month: "Fév", precision: 90, fiabilite: 87 },
  { month: "Mar", precision: 91, fiabilite: 89 },
  { month: "Avr", precision: 93, fiabilite: 91 },
  { month: "Mai", precision: 94, fiabilite: 92 },
  { month: "Juin", precision: 95, fiabilite: 93 },
];

export function AnalyseIA() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Analyse Intelligence Artificielle</h1>
        <p className="text-white/50">Performance et métriques du système IA</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Précision globale"
          value="93.8%"
          change="+2.3%"
          changeType="positive"
          icon={Target}
          delay={0}
        />
        <StatsCard
          title="Signalements analysés"
          value="1,247"
          change="+18%"
          changeType="positive"
          icon={Brain}
          delay={0.1}
        />
        <StatsCard
          title="Fiabilité moyenne"
          value="91.2%"
          change="+1.8%"
          changeType="positive"
          icon={TrendingUp}
          delay={0.2}
        />
        <StatsCard
          title="Temps de traitement"
          value="2.3s"
          change="-0.5s"
          changeType="positive"
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
          {[
            { zone: "Marché Sandaga", risk: 87, trend: "+12%" },
            { zone: "Plage de Yoff", risk: 75, trend: "+8%" },
            { zone: "Avenue Bourguiba", risk: 68, trend: "+5%" },
          ].map((item, index) => (
            <div
              key={item.zone}
              className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white">{item.zone}</h4>
                <span className="text-xs text-amber-400 font-bold">{item.trend}</span>
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
