import { useState, useEffect } from "react";
import { Gift, Trophy, Star, Award, Plus, Send, Target, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import api from "../../lib/api";
import { Modal } from "../components/ui/Modal";

interface Reward {
  id: string | number;
  name: string;
  description: string;
  points: number;
  stock: number;
  claimed_count: number;
  category: string;
  image_url: string;
}

// Mock data removed in favor of API fetching

export function Recompenses() {
  const [data, setData] = useState<{ rewards: Reward[], topRecipients: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    points: 0,
    stock: 0,
    category: ""
  });

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      setLoading(true);
      const response = await api.get("/rewards");
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch rewards:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await api.post("/rewards", formData);
      setIsModalOpen(false);
      setFormData({ name: "", description: "", points: 0, stock: 0, category: "" });
      fetchRewards();
    } catch (error) {
      console.error("Failed to create reward:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const rewards = data?.rewards || [];
  const topRecipients = data?.topRecipients || [];

  const dashboardStats = [
    { label: "Total récompenses", value: rewards.length.toString(), icon: Gift, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Points distribués", value: rewards.reduce((acc, r) => acc + (r.points * (r.claimed_count || 0)), 0).toLocaleString(), icon: Star, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { label: "Réclamations", value: rewards.reduce((acc, r) => acc + (r.claimed_count || 0), 0).toString(), icon: Trophy, color: "text-primary", bg: "bg-primary/10" },
    { label: "En stock", value: rewards.reduce((acc, r) => acc + r.stock, 0).toString(), icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-500/10" },
  ];
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-0.5">Gestion des récompenses</h1>
          <p className="text-xs text-muted-foreground">Motivez les citoyens avec un système de points</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold transition-colors flex items-center gap-2 shadow-lg shadow-primary/20 text-xs"
        >
          <Plus className="w-4 h-4" />
          Nouvelle récompense
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ajouter une nouvelle récompense"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Nom de la récompense</label>
            <input
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="ex: Bon d'achat Alimentaire"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors h-20 resize-none"
              placeholder="Description de la récompense..."
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Points requis</label>
              <input
                required
                type="number"
                value={formData.points}
                onChange={e => setFormData({ ...formData, points: parseInt(e.target.value) || 0 })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Stock initial</label>
              <input
                required
                type="number"
                value={formData.stock}
                onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Catégorie</label>
            <input
              required
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="ex: Alimentation, Écologie..."
            />
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50 mt-2 text-sm"
          >
            {isSubmitting ? "Création..." : "Créer la récompense"}
          </button>
        </form>
      </Modal>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {dashboardStats.map((stat) => (
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

      {/* Rewards Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-white">Catalogue des récompenses</h2>
          <div className="flex items-center gap-2">
            <select className="px-2.5 py-1.5 bg-card/30 border border-border rounded-lg text-xs text-white font-medium focus:outline-none focus:border-primary/50">
              <option>Toutes catégories</option>
              <option>Commerce</option>
              <option>Écologie</option>
              <option>Merchandising</option>
              <option>Accessoires</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {loading ? (
             <div className="col-span-4 py-10 text-center text-white/50 text-xs text-muted-foreground">Chargement des récompenses...</div>
          ) : rewards.length === 0 ? (
            <div className="col-span-4 py-10 text-center text-white/50 text-xs text-muted-foreground">Aucune récompense trouvée</div>
          ) : (
            rewards.map((reward) => (
              <div key={reward.id} className="bg-card/30 backdrop-blur-sm border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all group">
                <div className="relative h-40 overflow-hidden bg-black/20">
                  <img 
                    src={reward.image_url || "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400"} 
                    alt={reward.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-primary/90 backdrop-blur-sm rounded-lg">
                    <span className="text-white text-[10px] font-bold">{reward.points} pts</span>
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded-lg">
                    <span className="text-white text-[10px] font-medium">{reward.category}</span>
                  </div>
                </div>
                
                <div className="p-3">
                  <h3 className="font-bold text-white text-sm mb-1">{reward.name}</h3>
                  <p className="text-[10px] text-muted-foreground mb-2.5 line-clamp-2">{reward.description}</p>
                  
                  <div className="flex items-center justify-between text-[10px] mb-2.5">
                    <div>
                      <span className="text-muted-foreground">Stock: </span>
                      <span className="text-white font-bold">{reward.stock}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Réclamés: </span>
                      <span className="text-primary font-bold">{reward.claimed_count || 0}</span>
                    </div>
                  </div>

                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-2.5">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${((reward.claimed_count || 0) / (reward.stock + (reward.claimed_count || 0)) || 0) * 100}%` }}
                    />
                  </div>

                  <button className="w-full px-2.5 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5">
                    <Send className="w-3.5 h-3.5" />
                    Attribuer
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Top Recipients */}
      <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-white">Top bénéficiaires ce mois</h2>
          <button className="text-xs text-primary hover:text-primary/80 font-bold">Voir tout →</button>
        </div>
        
        <div className="space-y-2.5">
          {topRecipients.map((user, index) => (
            <div key={user.name} className="flex items-center gap-3 p-2.5 bg-black/20 border border-border rounded-lg">
              <div className="text-sm font-bold text-primary">#{index + 1}</div>
              <img src={user.photo_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-primary/30" />
              <div className="flex-1">
                <h4 className="font-bold text-white text-xs">{user.name}</h4>
                <p className="text-[10px] text-muted-foreground">{user.points} points</p>
              </div>
              <Award className="w-4 h-4 text-yellow-400" />
            </div>
          ))}
          {topRecipients.length === 0 && (
            <p className="text-[10px] text-muted-foreground text-center py-4">Aucun bénéficiaire enregistré</p>
          )}
        </div>
      </div>
    </div>
  );
}