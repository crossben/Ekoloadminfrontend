import { Settings as SettingsIcon, Users, MapPin, Bell, Brain, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import api from "../../lib/api";

export function Parametres() {
  const [settings, setSettings] = useState({
    notifications: true,
    autoAssign: true,
    aiAnalysis: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await api.get("/settings");
      if (response.data.settings) {
        setSettings(response.data.settings);
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSetting = async (key: keyof typeof settings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    try {
      // Assuming a generic update settings endpoint
      await api.post("/settings/update", { settings: newSettings });
    } catch (error) {
      console.error("Failed to update settings:", error);
      // Revert on error
      setSettings(settings);
    }
  };

  if (loading) {
     return <div className="py-20 text-center text-white/50 text-xs">Chargement des paramètres...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Paramètres</h1>
        <p className="text-white/50">Configuration du système et préférences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-white/[0.07] p-6"
          style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)' }}
        >
          <div className="w-12 h-12 rounded-lg bg-[#1FAF5A]/10 flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-[#1FAF5A]" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Utilisateurs</h3>
          <p className="text-sm text-white/60 mb-4">Gérer les comptes administrateurs</p>
          <button className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.07] rounded-lg text-white font-semibold hover:bg-white/[0.08] transition-colors">
            Configurer
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl border border-white/[0.07] p-6"
          style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)' }}
        >
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Zones géographiques</h3>
          <p className="text-sm text-white/60 mb-4">Définir les zones de couverture</p>
          <button className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.07] rounded-lg text-white font-semibold hover:bg-white/[0.08] transition-colors">
            Configurer
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-xl border border-white/[0.07] p-6"
          style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)' }}
        >
          <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
            <Brain className="w-6 h-6 text-amber-500" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Intelligence Artificielle</h3>
          <p className="text-sm text-white/60 mb-4">Paramètres de l'IA</p>
          <button className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.07] rounded-lg text-white font-semibold hover:bg-white/[0.08] transition-colors">
            Configurer
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="rounded-xl border border-white/[0.07] p-6"
        style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)' }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#1FAF5A]/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#1FAF5A]" />
          </div>
          <h3 className="text-lg font-bold text-white">Notifications et alertes</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]">
            <div>
              <h4 className="font-bold text-white mb-1">Alertes en temps réel</h4>
              <p className="text-sm text-white/60">Recevoir des notifications pour les nouveaux signalements</p>
            </div>
            <button
              onClick={() => toggleSetting('notifications')}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.notifications ? "bg-[#1FAF5A]" : "bg-white/20"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.notifications ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]">
            <div>
              <h4 className="font-bold text-white mb-1">Attribution automatique</h4>
              <p className="text-sm text-white/60">Assigner automatiquement les missions aux équipes</p>
            </div>
            <button
              onClick={() => toggleSetting('autoAssign')}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.autoAssign ? "bg-[#1FAF5A]" : "bg-white/20"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.autoAssign ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]">
            <div>
              <h4 className="font-bold text-white mb-1">Analyse IA automatique</h4>
              <p className="text-sm text-white/60">Activer l'analyse automatique des signalements</p>
            </div>
            <button
              onClick={() => toggleSetting('aiAnalysis')}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.aiAnalysis ? "bg-[#1FAF5A]" : "bg-white/20"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.aiAnalysis ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="rounded-xl border border-white/[0.07] p-6"
        style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)' }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-white">Sécurité</h3>
        </div>

        <div className="space-y-3">
          <button className="w-full p-4 rounded-lg bg-white/[0.02] border border-white/[0.05] text-left hover:border-[#1FAF5A]/30 transition-colors">
            <h4 className="font-bold text-white mb-1">Changer le mot de passe</h4>
            <p className="text-sm text-white/60">Modifier votre mot de passe administrateur</p>
          </button>

          <button className="w-full p-4 rounded-lg bg-white/[0.02] border border-white/[0.05] text-left hover:border-[#1FAF5A]/30 transition-colors">
            <h4 className="font-bold text-white mb-1">Authentification à deux facteurs</h4>
            <p className="text-sm text-white/60">Activer la double authentification</p>
          </button>

          <button className="w-full p-4 rounded-lg bg-white/[0.02] border border-white/[0.05] text-left hover:border-[#1FAF5A]/30 transition-colors">
            <h4 className="font-bold text-white mb-1">Journal d'activité</h4>
            <p className="text-sm text-white/60">Voir l'historique des connexions</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
