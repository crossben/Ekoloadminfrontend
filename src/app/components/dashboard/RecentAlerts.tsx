import { Clock, MapPin, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";

interface Alert {
  id: string;
  title: string;
  location: string;
  time: string;
  priority: "high" | "medium" | "low";
  status: "active" | "in-progress";
  reliability: number;
}

const alerts: Alert[] = [
  {
    id: "1",
    title: "Décharge sauvage détectée",
    location: "Avenue Bourguiba, Dakar",
    time: "Il y a 5 min",
    priority: "high",
    status: "active",
    reliability: 95,
  },
  {
    id: "2",
    title: "Débordement de poubelles",
    location: "Marché Sandaga",
    time: "Il y a 12 min",
    priority: "medium",
    status: "in-progress",
    reliability: 87,
  },
  {
    id: "3",
    title: "Plastiques sur la plage",
    location: "Plage de Yoff",
    time: "Il y a 25 min",
    priority: "high",
    status: "active",
    reliability: 92,
  },
  {
    id: "4",
    title: "Conteneur endommagé",
    location: "Rue 10, Ouakam",
    time: "Il y a 1h",
    priority: "low",
    status: "in-progress",
    reliability: 78,
  },
];

export function RecentAlerts() {
  const priorityColors = {
    high: "text-red-400",
    medium: "text-amber-400",
    low: "text-blue-400",
  };

  const statusLabels = {
    active: "Actif",
    "in-progress": "En cours",
  };

  const statusColors = {
    active: "bg-red-500/10 text-red-400 border-red-500/20",
    "in-progress": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-xl border border-border p-4 bg-card/40 backdrop-blur-xl h-full"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-white">Alertes prioritaires</h3>
        <button className="text-[10px] text-primary hover:text-primary/80 font-bold transition-colors px-2 py-1 bg-primary/10 rounded-lg border border-primary/30">
          Voir tout →
        </button>
      </div>

      <div className="space-y-2">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="p-3 rounded-lg bg-black/20 border border-border hover:border-primary/30 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start gap-2 flex-1">
                <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${priorityColors[alert.priority]}`} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white text-xs mb-1 group-hover:text-primary transition-colors">
                    {alert.title}
                  </h4>
                  <div className="flex flex-col gap-1 text-[10px] text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
                      <span className="truncate">{alert.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span>{alert.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5 flex-shrink-0 ml-2">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${statusColors[alert.status]}`}>
                  {statusLabels[alert.status]}
                </span>
                <div className="flex items-center gap-1">
                  <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${alert.reliability}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-primary font-bold">{alert.reliability}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}