import { useState } from "react";
import { Search, Filter, MapPin, Clock, Eye } from "lucide-react";
import { motion } from "motion/react";

interface Signalement {
  id: string;
  title: string;
  location: string;
  type: string;
  status: "active" | "in-progress" | "resolved";
  reliability: number;
  reportedBy: string;
  time: string;
  imageUrl: string;
}

const mockSignalements: Signalement[] = [
  {
    id: "SIG-001",
    title: "Décharge sauvage avenue Bourguiba",
    location: "Avenue Bourguiba, Dakar",
    type: "Plastique",
    status: "active",
    reliability: 95,
    reportedBy: "Amadou D.",
    time: "Il y a 5 min",
    imageUrl: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=400&h=300&fit=crop",
  },
  {
    id: "SIG-002",
    title: "Débordement de poubelles Marché Sandaga",
    location: "Marché Sandaga, Dakar",
    type: "Organique",
    status: "in-progress",
    reliability: 87,
    reportedBy: "Fatou S.",
    time: "Il y a 12 min",
    imageUrl: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400&h=300&fit=crop",
  },
  {
    id: "SIG-003",
    title: "Plastiques accumulés sur la plage",
    location: "Plage de Yoff, Dakar",
    type: "Plastique",
    status: "active",
    reliability: 92,
    reportedBy: "Moussa K.",
    time: "Il y a 25 min",
    imageUrl: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400&h=300&fit=crop",
  },
  {
    id: "SIG-004",
    title: "Conteneur endommagé Rue 10",
    location: "Rue 10, Ouakam, Dakar",
    type: "Métaux",
    status: "resolved",
    reliability: 78,
    reportedBy: "Awa M.",
    time: "Il y a 1h",
    imageUrl: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=400&h=300&fit=crop",
  },
];

export function Signalements() {
  const [filter, setFilter] = useState<string>("all");

  const statusLabels = {
    active: "Actif",
    "in-progress": "En cours",
    resolved: "Résolu",
  };

  const statusColors = {
    active: "bg-red-500/10 text-red-400 border-red-500/20",
    "in-progress": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    resolved: "bg-[#1FAF5A]/10 text-[#1FAF5A] border-[#1FAF5A]/20",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white mb-1">Gestion des signalements</h1>
          <p className="text-xs text-white/50">Liste complète des signalements environnementaux</p>
        </div>
        <button className="px-3 py-1.5 bg-[#1FAF5A] text-white rounded-lg font-bold hover:bg-[#1FAF5A]/90 transition-colors text-xs">
          Exporter
        </button>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Rechercher un signalement..."
            className="w-full pl-9 pr-3 py-2 bg-white/[0.03] border border-white/[0.07] rounded-lg text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#1FAF5A]/50"
          />
        </div>
        <button className="px-3 py-2 bg-white/[0.03] border border-white/[0.07] rounded-lg text-white hover:bg-white/[0.05] transition-colors flex items-center gap-1.5">
          <Filter className="w-4 h-4" />
          <span className="font-semibold text-xs">Filtres</span>
        </button>
      </div>

      <div className="flex gap-1.5">
        {["all", "active", "in-progress", "resolved"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors ${
              filter === status
                ? "bg-[#1FAF5A] text-white"
                : "bg-white/[0.03] text-white/60 hover:bg-white/[0.05]"
            }`}
          >
            {status === "all" ? "Tous" : statusLabels[status as keyof typeof statusLabels]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {mockSignalements.map((signalement, index) => (
          <motion.div
            key={signalement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-3 rounded-lg border border-white/[0.07] hover:border-[#1FAF5A]/30 transition-colors cursor-pointer bg-white/[0.03] backdrop-blur-sm"
          >
            <div className="flex gap-3">
              <img
                src={signalement.imageUrl}
                alt={signalement.title}
                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xs font-bold text-white truncate">{signalement.title}</h3>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border flex-shrink-0 ${statusColors[signalement.status]}`}>
                        {statusLabels[signalement.status]}
                      </span>
                    </div>
                    <div className="space-y-0.5 text-[10px] text-white/60">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{signalement.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span>{signalement.time}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] mb-2">
                  <div>
                    <p className="text-white/40 mb-0.5">Type</p>
                    <p className="font-bold text-white">{signalement.type}</p>
                  </div>
                  <div>
                    <p className="text-white/40 mb-0.5">Signalé par</p>
                    <p className="font-bold text-white">{signalement.reportedBy}</p>
                  </div>
                  <div>
                    <p className="text-white/40 mb-0.5">Fiabilité IA</p>
                    <div className="flex items-center gap-1">
                      <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#1FAF5A] rounded-full"
                          style={{ width: `${signalement.reliability}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-white">{signalement.reliability}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-white/40 mb-0.5">ID</p>
                    <p className="font-bold text-white/70 font-mono">{signalement.id}</p>
                  </div>
                </div>

                <button className="w-full px-2 py-1.5 bg-white/[0.05] border border-white/[0.07] rounded-md text-white hover:bg-white/[0.08] transition-colors flex items-center justify-center gap-1.5">
                  <Eye className="w-3 h-3" />
                  <span className="font-semibold text-[10px]">Voir détails</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}