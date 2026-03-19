import { MapPin, Clock, Phone, Mail, User as UserIcon } from "lucide-react";
import { motion } from "motion/react";

interface Report {
  id: string;
  user: {
    name: string;
    photo: string;
    phone: string;
    email: string;
    address: string;
  };
  wastePhoto: string;
  type: string;
  location: string;
  timestamp: string;
  status: "pending" | "in-progress" | "resolved";
  priority: "high" | "medium" | "low";
}

const mockReports: Report[] = [
  {
    id: "SIG-2024-001",
    user: {
      name: "Amara Diallo",
      photo: "https://images.unsplash.com/photo-1723922969507-5285cff3d8a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd29tYW4lMjBwb3J0cmFpdCUyMHNtaWxpbmd8ZW58MXx8fHwxNzcyMDU5Mzc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      phone: "+221 77 123 45 67",
      email: "amara.diallo@email.sn",
      address: "Plateau, Dakar",
    },
    wastePhoto: "https://images.unsplash.com/photo-1698052842678-6390a810d713?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXN0ZSUyMGdhcmJhZ2UlMjBwb2xsdXRpb24lMjBBZnJpY2ElMjBzdHJlZXR8ZW58MXx8fHwxNzcyMTM3ODA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "Déchets plastiques",
    location: "Avenue Léopold Sédar Senghor, Plateau",
    timestamp: "Il y a 15 min",
    status: "pending",
    priority: "high",
  },
  {
    id: "SIG-2024-002",
    user: {
      name: "Kwame Mensah",
      photo: "https://images.unsplash.com/photo-1652006135065-1a5790b66f86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIweW91bmclMjBtYW4lMjBzdHVkZW50fGVufDF8fHx8MTc3MjEzNjkyMXww&ixlib=rb-4.1.0&q=80&w=1080",
      phone: "+221 76 234 56 78",
      email: "kwame.m@email.sn",
      address: "Médina, Dakar",
    },
    wastePhoto: "https://images.unsplash.com/photo-1696952384596-a35a0d213f43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFzdGljJTIwcG9sbHV0aW9uJTIwdHJhc2glMjBBZnJpY2FuJTIwY2l0eXxlbnwxfHx8fDE3NzIxMzc4MDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "Dépôt sauvage",
    location: "Rue 10, Médina",
    timestamp: "Il y a 1h",
    status: "in-progress",
    priority: "medium",
  },
  {
    id: "SIG-2024-003",
    user: {
      name: "Fatou Ndiaye",
      photo: "https://images.unsplash.com/photo-1639304952143-32c399b22a53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIweW91bmclMjB3b21hbiUyMGhhcHB5fGVufDF8fHx8MTc3MjEzNjkyMHww&ixlib=rb-4.1.0&q=80&w=1080",
      phone: "+221 77 234 56 78",
      email: "fatou.n@email.sn",
      address: "Parcelles Assainies, Dakar",
    },
    wastePhoto: "https://images.unsplash.com/photo-1751646312127-127af47d8011?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbGxlZ2FsJTIwZHVtcCUyMHdhc3RlJTIwbGl0dGVyaW5nfGVufDF8fHx8MTc3MjEzNzgxMHww&ixlib=rb-4.1.0&q=80&w=1080",
    type: "Encombrants",
    location: "Unité 15, Parcelles Assainies",
    timestamp: "Il y a 3h",
    status: "resolved",
    priority: "low",
  },
  {
    id: "SIG-2024-004",
    user: {
      name: "Mama Koné",
      photo: "https://images.unsplash.com/photo-1761168026167-2309a979e1c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwZWxkZXJseSUyMHdvbWFufGVufDF8fHx8MTc3MjEzNzgwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      phone: "+221 78 345 67 89",
      email: "mama.kone@email.sn",
      address: "Pikine, Dakar",
    },
    wastePhoto: "https://images.unsplash.com/photo-1762805545352-4ac5355b0f0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJiYWdlJTIwcGlsZSUyMHRyYXNoJTIwdXJiYW58ZW58MXx8fHwxNzcyMTM3ODEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "Déchets ménagers",
    location: "Marché de Pikine",
    timestamp: "Il y a 5h",
    status: "in-progress",
    priority: "medium",
  },
];

const statusConfig = {
  pending: { label: "En attente", bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/30" },
  "in-progress": { label: "En cours", bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
  resolved: { label: "Résolu", bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/30" },
};

const priorityConfig = {
  high: { icon: "🔴", label: "Urgent" },
  medium: { icon: "🟠", label: "Moyen" },
  low: { icon: "🟢", label: "Faible" },
};

export function UserReports() {
  return (
    <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-3">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-bold text-white">Signalements récents</h2>
          <p className="text-[9px] text-muted-foreground mt-0.5">Avec informations utilisateurs</p>
        </div>
        <div className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-md">
          <span className="text-primary font-bold text-[9px]">{mockReports.length} actifs</span>
        </div>
      </div>

      <div className="space-y-2">
        {mockReports.map((report, index) => (
          <div
            key={report.id}
            className="group bg-black/20 border border-border hover:border-primary/30 rounded-lg p-2.5 transition-all"
          >
            {/* Priority Badge */}
            <div className="flex items-start justify-between mb-1.5">
              <div className="flex items-center gap-1">
                <span className="text-sm">{priorityConfig[report.priority].icon}</span>
                <span className="text-[9px] font-bold text-muted-foreground">{priorityConfig[report.priority].label}</span>
              </div>
              <div className={`px-1.5 py-0.5 ${statusConfig[report.status].bg} ${statusConfig[report.status].text} border ${statusConfig[report.status].border} rounded text-[9px] font-bold`}>
                {statusConfig[report.status].label}
              </div>
            </div>

            <div className="flex gap-2.5">
              {/* User Profile */}
              <div className="flex-shrink-0">
                <img
                  src={report.user.photo}
                  alt={report.user.name}
                  className="w-12 h-12 rounded-lg object-cover border-2 border-primary/20"
                />
              </div>

              {/* Report Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold text-white mb-1">{report.user.name}</h3>
                <div className="flex flex-wrap items-center gap-2 text-[9px] text-muted-foreground mb-2">
                  <div className="flex items-center gap-0.5">
                    <Phone className="w-2.5 h-2.5" />
                    {report.user.phone}
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Mail className="w-2.5 h-2.5" />
                    {report.user.email}
                  </div>
                  <div className="flex items-center gap-0.5">
                    <MapPin className="w-2.5 h-2.5 text-primary" />
                    {report.user.address}
                  </div>
                </div>

                {/* Waste Photo and Info */}
                <div className="flex gap-2 items-center">
                  <img
                    src={report.wastePhoto}
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
                      {report.timestamp}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}