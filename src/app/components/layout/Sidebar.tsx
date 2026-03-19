import { NavLink } from "react-router";
import { 
  LayoutDashboard, 
  AlertCircle, 
  Brain, 
  Users, 
  BarChart3, 
  Settings,
  Leaf,
  Gift,
  Megaphone,
  LogOut
} from "lucide-react";
import { useState, useEffect } from "react";
import api from "../../../lib/api";
import { useNavigate } from "react-router";

const navItems = [
  { to: "/", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { to: "/signalements", label: "Signalements", icon: AlertCircle },
  { to: "/analyse-ia", label: "Analyse IA", icon: Brain },
  { to: "/equipes", label: "Équipes terrain", icon: Users },
  { to: "/recompenses", label: "Récompenses", icon: Gift },
  { to: "/campagnes", label: "Campagnes", icon: Megaphone },
  { to: "/rapports", label: "Rapports", icon: BarChart3 },
  { to: "/parametres", label: "Paramètres", icon: Settings },
];

export function Sidebar() {
  const [stats, setStats] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/dashboard');
      setStats(response.data.stats);
    } catch (error) {
      console.error("Failed to fetch sidebar stats", error);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/logout');
      localStorage.removeItem('ekolo_admin_token');
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
      localStorage.removeItem('ekolo_admin_token');
      navigate('/login');
    }
  };

  return (
    <aside className="w-64 h-screen sticky top-0 border-r border-border bg-[#0a1612]/80 backdrop-blur-xl flex flex-col">
      {/* Logo Section */}
      <div className="p-4 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">EKOLO</h1>
            <p className="text-[10px] text-muted-foreground font-medium">Administration</p>
          </div>
        </div>
      </div>

      {/* Navigation - Scrollable with full space */}
      <nav className="flex-1 overflow-y-auto py-3 px-3">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all group ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                    : "text-muted-foreground hover:bg-white/[0.03] hover:text-white border border-transparent"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-4 h-4 transition-transform group-hover:scale-110 flex-shrink-0 ${isActive ? "text-primary" : ""}`} />
                  <span className="font-semibold text-xs flex-1">{item.label}</span>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-sm shadow-primary/50 flex-shrink-0" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Stats Footer - Fixed at bottom */}
      <div className="p-4 border-t border-border bg-black/20 flex-shrink-0">
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-muted-foreground">Signalements actifs</span>
            <span className="text-white font-bold">{stats?.active || '...'}</span>
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-muted-foreground">Résolus</span>
            <span className="text-white font-bold">{stats?.resolved || '...'}</span>
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-muted-foreground">Taux résolution</span>
            <span className="text-primary font-bold">{stats?.resolutionRate || '...'}</span>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-400/10 rounded-lg transition-colors border border-transparent hover:border-red-400/20"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}