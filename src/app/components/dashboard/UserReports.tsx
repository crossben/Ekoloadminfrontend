import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { motion } from "motion/react";

interface Report {
  id: string | number;
  citizen?: {
    name: string;
    photo_url: string;
    phone: string;
    email: string;
    address: string;
  };
  photo_url: string;
  type: string;
  location: string;
  created_at: string;
  status: "active" | "in-progress" | "resolved" | string;
  priority: "high" | "medium" | "low" | string;
}

const statusConfig: Record<string, any> = {
  active: { label: "En attente", bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/30" },
  "in-progress": { label: "En cours", bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
  resolved: { label: "Résolu", bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/30" },
};

const priorityConfig: Record<string, any> = {
  high: { icon: "🔴", label: "Urgent" },
  medium: { icon: "🟠", label: "Moyen" },
  low: { icon: "🟢", label: "Faible" },
};

export function UserReports({ reports }: { reports?: Report[] }) {
  const displayReports = reports || [];

  return (
    <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-3">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-bold text-white">Signalements récents</h2>
          <p className="text-[9px] text-muted-foreground mt-0.5">Avec informations utilisateurs</p>
        </div>
        <div className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-md">
          <span className="text-primary font-bold text-[9px]">{displayReports.length} actifs</span>
        </div>
      </div>

      <div className="space-y-2">
        {displayReports.length === 0 && (
          <p className="text-[10px] text-muted-foreground text-center py-4">Aucun signalement récent</p>
        )}
        {displayReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="group bg-black/20 border border-border hover:border-primary/30 rounded-lg p-2.5 transition-all"
          >
            {/* Priority Badge */}
            <div className="flex items-start justify-between mb-1.5">
              <div className="flex items-center gap-1">
                <span className="text-sm">{priorityConfig[report.priority]?.icon || "⚪"}</span>
                <span className="text-[9px] font-bold text-muted-foreground">{priorityConfig[report.priority]?.label || "Normal"}</span>
              </div>
              <div className={`px-1.5 py-0.5 ${statusConfig[report.status]?.bg || 'bg-white/10'} ${statusConfig[report.status]?.text || 'text-white'} border ${statusConfig[report.status]?.border || 'border-white/20'} rounded text-[9px] font-bold`}>
                {statusConfig[report.status]?.label || report.status}
              </div>
            </div>

            <div className="flex gap-2.5">
              {/* User Profile */}
              <div className="flex-shrink-0">
                <img
                  src={report.citizen?.photo_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${report.citizen?.name}`}
                  alt={report.citizen?.name}
                  className="w-12 h-12 rounded-lg object-cover border-2 border-primary/20"
                />
              </div>

              {/* Report Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold text-white mb-1">{report.citizen?.name || 'Utilisateur inconnu'}</h3>
                <div className="flex flex-wrap items-center gap-2 text-[9px] text-muted-foreground mb-2">
                  <div className="flex items-center gap-0.5">
                    <Phone className="w-2.5 h-2.5" />
                    {report.citizen?.phone || 'N/A'}
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Mail className="w-2.5 h-2.5" />
                    {report.citizen?.email || 'N/A'}
                  </div>
                  <div className="flex items-center gap-0.5">
                    <MapPin className="w-2.5 h-2.5 text-primary" />
                    {report.citizen?.address || 'N/A'}
                  </div>
                </div>

                {/* Waste Photo and Info */}
                <div className="flex gap-2 items-center">
                  <img
                    src={report.photo_url || "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=200"}
                    alt="Déchet signalé"
                    className="w-16 h-12 object-cover rounded-md border border-border/50"
                  />
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center gap-1">
                      <span className="px-1.5 py-0.5 bg-primary/15 text-primary rounded text-[9px] font-bold border border-primary/20">
                        {report.type}
                      </span>
                      <span className="text-[9px] text-muted-foreground">#{report.id}</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-[9px] text-white/70">
                      <MapPin className="w-2.5 h-2.5 text-primary" />
                      {report.location}
                    </div>
                    <div className="flex items-center gap-0.5 text-[9px] text-muted-foreground">
                      <Clock className="w-2.5 h-2.5" />
                      {new Date(report.created_at).toLocaleDateString() || 'Récemment'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}