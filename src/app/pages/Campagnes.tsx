import { useState, useEffect } from "react";
import { Megaphone, Plus, Calendar, Users, Target, TrendingUp, Eye, MessageSquare, Share2, BarChart3 } from "lucide-react";
import { motion } from "motion/react";
import api from "../../lib/api";
import { Modal } from "../components/ui/Modal";

interface Campaign {
  id: string | number;
  title: string;
  description: string;
  status: "active" | "scheduled" | "completed" | string;
  start_date: string;
  end_date: string;
  current_progress: number;
  target_goal: number;
  image_url: string;
  category: string;
}

const statusConfig: Record<string, any> = {
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
  const [data, setData] = useState<{ campaigns: Campaign[], stats: any } | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "active",
    start_date: "",
    end_date: "",
    target_goal: 0,
    category: ""
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await api.get("/campaigns");
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await api.post("/campaigns", formData);
      setIsModalOpen(false);
      setFormData({
        title: "",
        description: "",
        status: "active",
        start_date: "",
        end_date: "",
        target_goal: 0,
        category: ""
      });
      fetchCampaigns();
    } catch (error) {
      console.error("Failed to create campaign:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCampaigns = data?.campaigns.filter((c) => filter === "all" || c.status === filter) || [];

  const stats = [
    { label: "Campagnes actives", value: data?.stats.active || "0", icon: Megaphone, color: "text-green-400", bg: "bg-green-500/10" },
    { label: "Total participants", value: data?.stats.participants || "0", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Objectifs atteints", value: data?.stats.goalsMet || "0", icon: Target, color: "text-primary", bg: "bg-primary/10" },
    { label: "Taux d'engagement", value: data?.stats.engagement || "0%", icon: TrendingUp, color: "text-yellow-400", bg: "bg-yellow-500/10" },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-0.5">Campagnes écologiques</h1>
          <p className="text-xs text-muted-foreground">Mobilisez les citoyens autour de projets environnementaux</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold transition-colors flex items-center gap-2 shadow-lg shadow-primary/20 text-xs"
        >
          <Plus className="w-4 h-4" />
          Lancer une campagne
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Démarrer une nouvelle campagne"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Titre de la campagne</label>
            <input
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="ex: Opération Plages Propres"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors h-20 resize-none"
              placeholder="Objectifs et détails de l'action..."
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Date de début</label>
              <input
                required
                type="date"
                value={formData.start_date}
                onChange={e => setFormData({ ...formData, start_date: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Date de fin</label>
              <input
                required
                type="date"
                value={formData.end_date}
                onChange={e => setFormData({ ...formData, end_date: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Objectif (Participants)</label>
              <input
                required
                type="number"
                value={formData.target_goal}
                onChange={e => setFormData({ ...formData, target_goal: parseInt(e.target.value) || 0 })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Catégorie</label>
              <input
                required
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="ex: Nettoyage, Recyclage..."
              />
            </div>
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50 mt-2 text-sm"
          >
            {isSubmitting ? "Lancement..." : "Lancer la campagne"}
          </button>
        </form>
      </Modal>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-3">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className={`w-8 h-8 rounded-lg ${stat.bg} border border-${stat.color.split('-')[1]}-500/20 flex items-center justify-center`}>
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
            <button 
              onClick={() => setFilter("all")}
              className={`px-2.5 py-1.5 ${filter === "all" ? "bg-primary/10 border-primary/30 text-primary" : "bg-card/30 border-border text-muted-foreground"} border rounded-lg text-xs font-bold transition-colors`}
            >
              Tous
            </button>
            <button 
              onClick={() => setFilter("active")}
              className={`px-2.5 py-1.5 ${filter === "active" ? "bg-primary/10 border-primary/30 text-primary" : "bg-card/30 border-border text-muted-foreground"} border rounded-lg text-xs font-bold transition-colors`}
            >
              Actives
            </button>
            <button 
              onClick={() => setFilter("scheduled")}
              className={`px-2.5 py-1.5 ${filter === "scheduled" ? "bg-primary/10 border-primary/30 text-primary" : "bg-card/30 border-border text-muted-foreground"} border rounded-lg text-xs font-bold transition-colors`}
            >
              Planifiées
            </button>
            <button 
              onClick={() => setFilter("completed")}
              className={`px-2.5 py-1.5 ${filter === "completed" ? "bg-primary/10 border-primary/30 text-primary" : "bg-card/30 border-border text-muted-foreground"} border rounded-lg text-xs font-bold transition-colors`}
            >
              Terminées
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {loading ? (
             <div className="col-span-2 py-10 text-center text-white/50 text-xs">Chargement des campagnes...</div>
          ) : filteredCampaigns.length === 0 ? (
            <div className="col-span-2 py-10 text-center text-white/50 text-xs">Aucune campagne trouvée</div>
          ) : (
            filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="bg-card/30 backdrop-blur-sm border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all">
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative w-full md:w-40 h-40 md:h-auto overflow-hidden bg-black/20">
                    <img 
                      src={campaign.image_url || "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=200"} 
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded-lg">
                      <span className="text-white text-[10px] font-medium">{campaign.category}</span>
                    </div>
                    <div className={`absolute top-2 right-2 px-2 py-0.5 ${statusConfig[campaign.status]?.bg || 'bg-white/10'} backdrop-blur-sm rounded-lg border ${statusConfig[campaign.status]?.border || 'border-white/20'}`}>
                      <span className={`${statusConfig[campaign.status]?.text || 'text-white'} text-[10px] font-bold`}>
                        {statusConfig[campaign.status]?.label || campaign.status}
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
                          <p className="text-white font-bold">{new Date(campaign.start_date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <Calendar className="w-3.5 h-3.5 text-red-400" />
                        <div>
                          <p className="text-muted-foreground">Fin</p>
                          <p className="text-white font-bold">{new Date(campaign.end_date).toLocaleDateString()}</p>
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
                        <span className="text-white font-bold">{campaign.current_progress} / {campaign.target_goal}</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${Math.min((campaign.current_progress / campaign.target_goal) * 100, 100)}%` }}
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
            ))
          )}
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
              <h3 className="text-lg font-bold text-white">{data?.stats.views || "..."}</h3>
            </div>
          </div>
          <p className={`text-[10px] font-bold ${data?.stats.viewsChange.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {data?.stats.viewsChange} ce mois
          </p>
        </div>

        <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-4">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Commentaires</p>
              <h3 className="text-lg font-bold text-white">{data?.stats.comments || "..."}</h3>
            </div>
          </div>
          <p className={`text-[10px] font-bold ${data?.stats.commentsChange.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {data?.stats.commentsChange} ce mois
          </p>
        </div>

        <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-4">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
              <Share2 className="w-4 h-4 text-pink-400" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Partages</p>
              <h3 className="text-lg font-bold text-white">{data?.stats.shares || "..."}</h3>
            </div>
          </div>
          <p className={`text-[10px] font-bold ${data?.stats.sharesChange.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {data?.stats.sharesChange} ce mois
          </p>
        </div>
      </div>
    </div>
  );
}