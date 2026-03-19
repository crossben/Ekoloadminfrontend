import { useState, useEffect } from "react";
import { Users, MapPin, CheckCircle, Clock } from "lucide-react";
import { motion } from "motion/react";
import api from "../../lib/api";

interface TeamMember {
  id: string | number;
  name: string;
  role: string;
  status: "available" | "on-mission" | "off-duty" | string;
  location: string;
  missions_completed: number;
  image_url: string;
}

// Mock data removed in favor of API fetching

export function Equipes() {
  const [teams, setTeams] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await api.get("/teams");
      setTeams(response.data);
    } catch (error) {
      console.error("Failed to fetch teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const statusLabels: Record<string, string> = {
    available: "Disponible",
    "on-mission": "En mission",
    "off-duty": "Hors service",
  };

  const statusColors: Record<string, string> = {
    available: "bg-[#1FAF5A]/10 text-[#1FAF5A] border-[#1FAF5A]/20",
    "on-mission": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "off-duty": "bg-white/10 text-white/50 border-white/20",
  };

  const stats = {
    total: teams.length,
    available: teams.filter(t => t.status === 'available').length,
    onMission: teams.filter(t => t.status === 'on-mission').length,
    offDuty: teams.filter(t => t.status === 'off-duty').length,
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-0.5">Gestion des équipes terrain</h1>
          <p className="text-xs text-muted-foreground">Suivi en temps réel des équipes de collecte</p>
        </div>
        <button className="px-3 py-2 bg-[#1FAF5A] text-white rounded-lg font-bold hover:bg-[#1FAF5A]/90 transition-colors text-xs">
          Nouvelle mission
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl border border-white/[0.07]" 
             style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)' }}>
          <div className="w-10 h-10 rounded-lg bg-[#1FAF5A]/10 flex items-center justify-center mb-3">
            <Users className="w-5 h-5 text-[#1FAF5A]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-0.5">{stats.total}</h3>
          <p className="text-xs text-white/50">Équipes totales</p>
        </div>

        <div className="p-4 rounded-xl border border-white/[0.07]" 
             style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)' }}>
          <div className="w-10 h-10 rounded-lg bg-[#1FAF5A]/10 flex items-center justify-center mb-3">
            <CheckCircle className="w-5 h-5 text-[#1FAF5A]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-0.5">{stats.available}</h3>
          <p className="text-xs text-white/50">Disponibles</p>
        </div>

        <div className="p-4 rounded-xl border border-white/[0.07]" 
             style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)' }}>
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3">
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-0.5">{stats.onMission}</h3>
          <p className="text-xs text-white/50">En mission</p>
        </div>

        <div className="p-4 rounded-xl border border-white/[0.07]" 
             style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)' }}>
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
            <MapPin className="w-5 h-5 text-white/50" />
          </div>
          <h3 className="text-xl font-bold text-white mb-0.5">{stats.offDuty}</h3>
          <p className="text-xs text-white/50">Hors service</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {loading ? (
          <div className="col-span-2 py-10 text-center text-white/50 text-xs">Chargement des équipes...</div>
        ) : teams.length === 0 ? (
          <div className="col-span-2 py-10 text-center text-white/50 text-xs">Aucune équipe trouvée</div>
        ) : (
          teams.map((team, index) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl border border-white/[0.07] hover:border-[#1FAF5A]/30 transition-colors"
              style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)' }}
            >
              <div className="flex items-start gap-3">
                <img
                  src={team.image_url || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100"}
                  alt={team.name}
                  className="w-14 h-14 rounded-full object-cover bg-white/5"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-bold text-white mb-0.5">{team.name}</h3>
                      <p className="text-xs text-white/60">{team.role}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${statusColors[team.status] || 'bg-white/10 border-white/20'}`}>
                      {statusLabels[team.status] || team.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1.5 text-xs text-white/60">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{team.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-white/60">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{team.missions_completed} missions</span>
                    </div>
                  </div>

                  <div className="flex gap-1.5">
                    <button className="flex-1 px-3 py-1.5 bg-[#1FAF5A] text-white rounded-lg font-semibold hover:bg-[#1FAF5A]/90 transition-colors text-xs">
                      Assigner mission
                    </button>
                    <button className="px-3 py-1.5 bg-white/[0.05] border border-white/[0.07] rounded-lg text-white font-semibold hover:bg-white/[0.08] transition-colors text-xs">
                      Localiser
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}