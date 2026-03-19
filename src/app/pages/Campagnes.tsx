import { Megaphone, Plus, Calendar, Users, Target, TrendingUp, Eye, MessageSquare, Share2, BarChart3 } from "lucide-react";

interface Campaign {
  id: string;
  title: string;
  description: string;
  status: "active" | "scheduled" | "completed";
  startDate: string;
  endDate: string;
  participants: number;
  targetGoal: number;
  currentProgress: number;
  image: string;
  category: string;
}

const campaigns: Campaign[] = [
  {
    id: "1",
    title: "Opération plages propres",
    description: "Nettoyage collectif des plages de Dakar",
    status: "active",
    startDate: "15 Fév 2026",
    endDate: "28 Fév 2026",
    participants: 487,
    targetGoal: 1000,
    currentProgress: 487,
    image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=500",
    category: "Nettoyage",
  },
  {
    id: "2",
    title: "Plantation d'arbres - Quartier Almadies",
    description: "1000 arbres pour verdir la ville",
    status: "active",
    startDate: "20 Fév 2026",
    endDate: "05 Mar 2026",
    participants: 312,
    targetGoal: 500,
    currentProgress: 312,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500",
    category: "Reforestation",
  },
  {
    id: "3",
    title: "Tri sélectif dans les écoles",
    description: "Sensibilisation au recyclage pour 50 écoles",
    status: "scheduled",
    startDate: "01 Mar 2026",
    endDate: "31 Mar 2026",
    participants: 0,
    targetGoal: 2000,
    currentProgress: 0,
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500",
    category: "Éducation",
  },
  {
    id: "4",
    title: "Collecte de plastique",
    description: "Challenge de collecte de déchets plastiques",
    status: "completed",
    startDate: "01 Fév 2026",
    endDate: "14 Fév 2026",
    participants: 856,
    targetGoal: 800,
    currentProgress: 856,
    image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=500",
    category: "Recyclage",
  },
];

const statusConfig = {
  active: { label: "En cours", bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/30" },
  scheduled: { label: "Planifiée", bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
  completed: { label: "Terminée", bg: "bg-gray-500/10", text: "text-gray-400", border: "border-gray-500/30" },
};

const stats = [
  { label: "Campagnes actives", value: "2", icon: Megaphone, color: "text-green-400", bg: "bg-green-500/10" },
  { label: "Total participants", value: "1,655", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Objectifs atteints", value: "15/18", icon: Target, color: "text-primary", bg: "bg-primary/10" },
  { label: "Taux d'engagement", value: "73%", icon: TrendingUp, color: "text-yellow-400", bg: "bg-yellow-500/10" },
];

export function Campagnes() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-0.5">Campagnes écologiques</h1>
          <p className="text-xs text-muted-foreground">Mobilisez les citoyens autour de projets environnementaux</p>
        </div>
        <button className="px-3 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold transition-colors flex items-center gap-2 shadow-lg shadow-primary/20 text-xs">
          <Plus className="w-4 h-4" />
          Nouvelle campagne
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-3">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className={`w-8 h-8 rounded-lg ${stat.bg} border border-${stat.color}/20 flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-medium">{stat.label}</p>
                <h3 className="text-xl font-bold text-white">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Campaigns Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-white">Toutes les campagnes</h2>
          <div className="flex items-center gap-2">
            <button className="px-2.5 py-1.5 bg-primary/10 border border-primary/30 text-primary rounded-lg text-xs font-bold">Actives</button>
            <button className="px-2.5 py-1.5 bg-card/30 border border-border text-muted-foreground hover:text-white rounded-lg text-xs font-bold transition-colors">Planifiées</button>
            <button className="px-2.5 py-1.5 bg-card/30 border border-border text-muted-foreground hover:text-white rounded-lg text-xs font-bold transition-colors">Terminées</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-card/30 backdrop-blur-sm border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all">
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="relative w-full md:w-40 h-40 md:h-auto overflow-hidden bg-black/20">
                  <img 
                    src={campaign.image} 
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded-lg">
                    <span className="text-white text-[10px] font-medium">{campaign.category}</span>
                  </div>
                  <div className={`absolute top-2 right-2 px-2 py-0.5 ${statusConfig[campaign.status].bg} backdrop-blur-sm rounded-lg border ${statusConfig[campaign.status].border}`}>
                    <span className={`${statusConfig[campaign.status].text} text-[10px] font-bold`}>
                      {statusConfig[campaign.status].label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-3">
                  <h3 className="font-bold text-white text-sm mb-1.5">{campaign.title}</h3>
                  <p className="text-[10px] text-muted-foreground mb-3">{campaign.description}</p>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <div>
                        <p className="text-muted-foreground">Début</p>
                        <p className="text-white font-bold">{campaign.startDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <Calendar className="w-3.5 h-3.5 text-red-400" />
                      <div>
                        <p className="text-muted-foreground">Fin</p>
                        <p className="text-white font-bold">{campaign.endDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-[10px] mb-1.5">
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-primary" />
                        <span className="text-muted-foreground">Participants</span>
                      </div>
                      <span className="text-white font-bold">{campaign.currentProgress} / {campaign.targetGoal}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${Math.min((campaign.currentProgress / campaign.targetGoal) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    <button className="flex-1 px-2.5 py-1.5 bg-primary hover:bg-primary/90 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      Détails
                    </button>
                    <button className="px-2.5 py-1.5 bg-card/50 hover:bg-card border border-border text-white rounded-lg text-xs transition-colors">
                      <BarChart3 className="w-3.5 h-3.5" />
                    </button>
                    <button className="px-2.5 py-1.5 bg-card/50 hover:bg-card border border-border text-white rounded-lg text-xs transition-colors">
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-4">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Eye className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Vues totales</p>
              <h3 className="text-lg font-bold text-white">12,845</h3>
            </div>
          </div>
          <p className="text-[10px] text-green-400 font-bold">+23% ce mois</p>
        </div>

        <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-4">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Commentaires</p>
              <h3 className="text-lg font-bold text-white">1,247</h3>
            </div>
          </div>
          <p className="text-[10px] text-green-400 font-bold">+15% ce mois</p>
        </div>

        <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-4">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
              <Share2 className="w-4 h-4 text-pink-400" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Partages</p>
              <h3 className="text-lg font-bold text-white">3,421</h3>
            </div>
          </div>
          <p className="text-[10px] text-green-400 font-bold">+31% ce mois</p>
        </div>
      </div>
    </div>
  );
}