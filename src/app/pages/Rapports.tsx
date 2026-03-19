import { FileText, Download, Calendar, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const monthlyData = [
  { month: "Jan", signalements: 145, resolus: 132, taux: 91 },
  { month: "Fév", signalements: 178, resolus: 165, taux: 93 },
  { month: "Mar", signalements: 162, resolus: 148, taux: 91 },
  { month: "Avr", signalements: 195, resolus: 178, taux: 91 },
  { month: "Mai", signalements: 210, resolus: 189, taux: 90 },
  { month: "Juin", signalements: 187, resolus: 167, taux: 89 },
];

const zoneData = [
  { zone: "Dakar Centre", count: 245 },
  { zone: "Plateau", count: 198 },
  { zone: "Yoff", count: 176 },
  { zone: "Pikine", count: 165 },
  { zone: "Ouakam", count: 142 },
];

export function Rapports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Rapports et analytics</h1>
          <p className="text-white/50">Statistiques détaillées et exportation de données</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/[0.05] border border-white/[0.07] rounded-lg text-white font-semibold hover:bg-white/[0.08] transition-colors flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Période
          </button>
          <button className="px-4 py-2 bg-[#1FAF5A] text-white rounded-lg font-bold hover:bg-[#1FAF5A]/90 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exporter PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border border-white/[0.07]" 
             style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#1FAF5A]/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#1FAF5A]" />
            </div>
            <span className="text-sm font-bold text-[#1FAF5A]">+15%</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">1,247</h3>
          <p className="text-sm text-white/50">Signalements totaux (30j)</p>
        </div>

        <div className="p-6 rounded-xl border border-white/[0.07]" 
             style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-sm font-bold text-blue-400">+3%</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">90.8%</h3>
          <p className="text-sm text-white/50">Taux de résolution</p>
        </div>

        <div className="p-6 rounded-xl border border-white/[0.07]" 
             style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-amber-500" />
            </div>
            <span className="text-sm font-bold text-amber-400">-8%</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">4.2h</h3>
          <p className="text-sm text-white/50">Temps moyen de résolution</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-xl border border-white/[0.07] p-6"
          style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)' }}
        >
          <h3 className="text-lg font-bold text-white mb-6">Performance mensuelle</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
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
                dataKey="signalements" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="resolus" 
                stroke="#1FAF5A" 
                strokeWidth={2}
                dot={{ fill: '#1FAF5A', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-xl border border-white/[0.07] p-6"
          style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)' }}
        >
          <h3 className="text-lg font-bold text-white mb-6">Signalements par zone</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={zoneData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                type="number"
                stroke="rgba(255,255,255,0.3)"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                type="category"
                dataKey="zone"
                stroke="rgba(255,255,255,0.3)"
                style={{ fontSize: '12px' }}
                width={100}
              />
              <Tooltip 
                contentStyle={{
                  background: 'rgba(5, 14, 8, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Bar dataKey="count" fill="#1FAF5A" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="rounded-xl border border-white/[0.07] p-6"
        style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)' }}
      >
        <h3 className="text-lg font-bold text-white mb-4">Rapports disponibles</h3>
        <div className="space-y-3">
          {[
            { title: "Rapport mensuel - Juin 2026", date: "26 Fév 2026", size: "2.4 MB" },
            { title: "Analyse trimestrielle Q2 2026", date: "15 Fév 2026", size: "5.1 MB" },
            { title: "Performance des équipes - Mai 2026", date: "01 Fév 2026", size: "1.8 MB" },
          ].map((report, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-[#1FAF5A]/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1FAF5A]/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#1FAF5A]" />
                </div>
                <div>
                  <h4 className="font-bold text-white">{report.title}</h4>
                  <p className="text-sm text-white/50">{report.date} • {report.size}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white/[0.05] border border-white/[0.07] rounded-lg text-white font-semibold hover:bg-white/[0.08] transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Télécharger
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
