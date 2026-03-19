import { Users, MapPin, CheckCircle, Clock } from "lucide-react";
import { motion } from "motion/react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: "available" | "on-mission" | "off-duty";
  location: string;
  missionsCompleted: number;
  imageUrl: string;
}

const teams: TeamMember[] = [
  {
    id: "EQ-001",
    name: "Équipe Alpha",
    role: "Chef: Mamadou Diallo",
    status: "on-mission",
    location: "Marché Sandaga",
    missionsCompleted: 127,
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces",
  },
  {
    id: "EQ-002",
    name: "Équipe Bravo",
    role: "Chef: Aïssatou Ndiaye",
    status: "available",
    location: "Station centrale",
    missionsCompleted: 98,
    imageUrl: "https://images.unsplash.com/photo-1639304952143-32c399b22a53?w=150&h=150&fit=crop&crop=faces",
  },
  {
    id: "EQ-003",
    name: "Équipe Charlie",
    role: "Chef: Ousmane Ba",
    status: "on-mission",
    location: "Plage de Yoff",
    missionsCompleted: 143,
    imageUrl: "https://images.unsplash.com/photo-1652006135065-1a5790b66f86?w=150&h=150&fit=crop&crop=faces",
  },
  {
    id: "EQ-004",
    name: "Équipe Delta",
    role: "Chef: Fatou Sarr",
    status: "available",
    location: "Station centrale",
    missionsCompleted: 85,
    imageUrl: "https://images.unsplash.com/photo-1723922969507-5285cff3d8a9?w=150&h=150&fit=crop&crop=faces",
  },
];

export function Equipes() {
  const statusLabels = {
    available: "Disponible",
    "on-mission": "En mission",
    "off-duty": "Hors service",
  };

  const statusColors = {
    available: "bg-[#1FAF5A]/10 text-[#1FAF5A] border-[#1FAF5A]/20",
    "on-mission": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "off-duty": "bg-white/10 text-white/50 border-white/20",
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
          <h3 className="text-xl font-bold text-white mb-0.5">12</h3>
          <p className="text-xs text-white/50">Équipes totales</p>
        </div>

        <div className="p-4 rounded-xl border border-white/[0.07]" 
             style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)' }}>
          <div className="w-10 h-10 rounded-lg bg-[#1FAF5A]/10 flex items-center justify-center mb-3">
            <CheckCircle className="w-5 h-5 text-[#1FAF5A]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-0.5">5</h3>
          <p className="text-xs text-white/50">Disponibles</p>
        </div>

        <div className="p-4 rounded-xl border border-white/[0.07]" 
             style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)' }}>
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3">
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-0.5">6</h3>
          <p className="text-xs text-white/50">En mission</p>
        </div>

        <div className="p-4 rounded-xl border border-white/[0.07]" 
             style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)' }}>
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
            <MapPin className="w-5 h-5 text-white/50" />
          </div>
          <h3 className="text-xl font-bold text-white mb-0.5">1</h3>
          <p className="text-xs text-white/50">Hors service</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {teams.map((team, index) => (
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
                src={team.imageUrl}
                alt={team.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-0.5">{team.name}</h3>
                    <p className="text-xs text-white/60">{team.role}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${statusColors[team.status]}`}>
                    {statusLabels[team.status]}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-white/60">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{team.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-white/60">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{team.missionsCompleted} missions</span>
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
        ))}
      </div>
    </div>
  );
}