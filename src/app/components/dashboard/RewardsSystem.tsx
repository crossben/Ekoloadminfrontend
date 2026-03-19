import { Trophy, Award, Star, Crown, Zap, Medal, Target, Gift } from "lucide-react";
import { motion } from "motion/react";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: typeof Trophy;
  color: string;
  gradient: string;
  points: number;
  awarded: number;
}

interface TopContributor {
  rank: number;
  name: string;
  photo: string;
  points: number;
  badges: number;
  reports: number;
}

const badges: Badge[] = [
  {
    id: "eco-warrior",
    name: "Guerrier Écolo",
    description: "10 signalements validés",
    icon: Trophy,
    color: "text-yellow-400",
    gradient: "from-yellow-500 to-orange-500",
    points: 100,
    awarded: 48,
  },
  {
    id: "clean-champion",
    name: "Champion Propreté",
    description: "25 signalements validés",
    icon: Crown,
    color: "text-purple-400",
    gradient: "from-purple-500 to-pink-500",
    points: 250,
    awarded: 27,
  },
  {
    id: "enviro-hero",
    name: "Héros Environnement",
    description: "50 signalements validés",
    icon: Medal,
    color: "text-blue-400",
    gradient: "from-blue-500 to-cyan-500",
    points: 500,
    awarded: 15,
  },
  {
    id: "rapid-reporter",
    name: "Reporter Rapide",
    description: "5 signalements en 1 semaine",
    icon: Zap,
    color: "text-orange-400",
    gradient: "from-orange-500 to-red-500",
    points: 150,
    awarded: 35,
  },
  {
    id: "community-star",
    name: "Étoile Communauté",
    description: "10 quartiers différents",
    icon: Star,
    color: "text-green-400",
    gradient: "from-green-500 to-emerald-500",
    points: 200,
    awarded: 22,
  },
  {
    id: "target-master",
    name: "Maître Précision",
    description: "95% de précision GPS",
    icon: Target,
    color: "text-red-400",
    gradient: "from-red-500 to-pink-500",
    points: 180,
    awarded: 19,
  },
];

const topContributors: TopContributor[] = [
  {
    rank: 1,
    name: "Amara Diallo",
    photo: "https://images.unsplash.com/photo-1723922969507-5285cff3d8a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd29tYW4lMjBwb3J0cmFpdCUyMHNtaWxpbmd8ZW58MXx8fHwxNzcyMDU5Mzc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    points: 1450,
    badges: 6,
    reports: 52,
  },
  {
    rank: 2,
    name: "Kwame Mensah",
    photo: "https://images.unsplash.com/photo-1652006135065-1a5790b66f86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIweW91bmclMjBtYW4lMjBzdHVkZW50fGVufDF8fHx8MTc3MjEzNjkyMXww&ixlib=rb-4.1.0&q=80&w=1080",
    points: 1180,
    badges: 5,
    reports: 43,
  },
  {
    rank: 3,
    name: "Fatou Ndiaye",
    photo: "https://images.unsplash.com/photo-1639304952143-32c399b22a53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIweW91bmclMjB3b21hbiUyMGhhcHB5fGVufDF8fHx8MTc3MjEzNjkyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    points: 980,
    badges: 4,
    reports: 38,
  },
  {
    rank: 4,
    name: "Ibrahim Touré",
    photo: "https://images.unsplash.com/photo-1668752600261-e56e7f3780b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbWFuJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyMTM3ODA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    points: 875,
    badges: 4,
    reports: 34,
  },
  {
    rank: 5,
    name: "Aïcha Camara",
    photo: "https://images.unsplash.com/photo-1668752741330-8adc5cef7485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd29tYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcyMTM3ODA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    points: 720,
    badges: 3,
    reports: 29,
  },
];

export function RewardsSystem() {
  return (
    <div className="space-y-4">
      {/* Badges Section */}
      <div className="bg-card/40 backdrop-blur-xl border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              Système de badges
            </h2>
            <p className="text-[10px] text-muted-foreground mt-0.5">Récompenses pour les contributeurs actifs</p>
          </div>
          <div className="px-2 py-1 bg-primary/10 border border-primary/30 rounded-lg">
            <span className="text-primary font-bold text-[10px]">{badges.length} badges</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="group relative bg-black/30 border border-border hover:border-primary/50 rounded-lg p-3 transition-all hover:shadow-xl hover:shadow-primary/10"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${badge.gradient} opacity-0 group-hover:opacity-10 rounded-lg transition-opacity`} />
                
                <div className="relative flex items-start gap-2.5">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${badge.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-xs mb-0.5">{badge.name}</h3>
                    <p className="text-[10px] text-muted-foreground mb-2">{badge.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-primary">+{badge.points} pts</span>
                      <span className="text-[10px] text-muted-foreground">{badge.awarded} obtenus</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-card/40 backdrop-blur-xl border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              Classement des contributeurs
            </h2>
            <p className="text-[10px] text-muted-foreground mt-0.5">Top 5 ce mois-ci</p>
          </div>
          <button className="px-2.5 py-1.5 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold transition-colors flex items-center gap-1.5 text-[10px]">
            <Gift className="w-3.5 h-3.5" />
            Attribuer
          </button>
        </div>

        <div className="space-y-2">
          {topContributors.map((contributor, index) => (
            <motion.div
              key={contributor.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className={`relative bg-black/30 border ${
                contributor.rank === 1 ? "border-yellow-500/50" :
                contributor.rank === 2 ? "border-gray-400/50" :
                contributor.rank === 3 ? "border-orange-500/50" :
                "border-border"
              } rounded-lg p-3 hover:shadow-lg transition-all`}
            >
              {contributor.rank <= 3 && (
                <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-lg"
                     style={{
                       background: contributor.rank === 1 ? "linear-gradient(135deg, #FFD700, #FFA500)" :
                                  contributor.rank === 2 ? "linear-gradient(135deg, #C0C0C0, #808080)" :
                                  "linear-gradient(135deg, #CD7F32, #8B4513)",
                       border: "2px solid rgba(0,0,0,0.3)"
                     }}>
                  <span className="text-white">#{contributor.rank}</span>
                </div>
              )}

              <div className="flex items-center gap-2.5">
                {/* Rank for non-podium */}
                {contributor.rank > 3 && (
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center font-bold text-white text-xs flex-shrink-0">
                    #{contributor.rank}
                  </div>
                )}

                {/* Photo */}
                <div className="relative flex-shrink-0">
                  <img
                    src={contributor.photo}
                    alt={contributor.name}
                    className={`w-11 h-11 rounded-full object-cover ${
                      contributor.rank === 1 ? "border-2 border-yellow-500" :
                      contributor.rank === 2 ? "border-2 border-gray-400" :
                      contributor.rank === 3 ? "border-2 border-orange-500" :
                      "border-2 border-primary/30"
                    }`}
                  />
                  {contributor.rank === 1 && (
                    <Crown className="absolute -top-2 -right-0.5 w-4 h-4 text-yellow-400" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-xs">{contributor.name}</h3>
                  <div className="flex items-center gap-2.5 mt-0.5 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-primary" />
                      {contributor.points}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Award className="w-3 h-3 text-purple-400" />
                      {contributor.badges}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Target className="w-3 h-3 text-blue-400" />
                      {contributor.reports}
                    </span>
                  </div>
                </div>

                {/* Points Display */}
                <div className="text-right flex-shrink-0">
                  <div className="text-base font-bold text-primary">{contributor.points}</div>
                  <div className="text-[9px] text-muted-foreground">points</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}