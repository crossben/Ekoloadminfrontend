import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Brain, Lock, Mail, Loader2 } from "lucide-react";
import { motion } from "motion/react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050e08] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#1FAF5A]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl border border-white/10 relative z-10 mx-4"
        style={{ background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(20px)' }}
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#1FAF5A]/20 flex items-center justify-center mb-4 border border-[#1FAF5A]/30">
            <Brain className="w-8 h-8 text-[#1FAF5A]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Ekolo Admin</h1>
          <p className="text-white/50 text-center">Connectez-vous pour gérer l'écosystème</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#1FAF5A]/50 focus:ring-1 focus:ring-[#1FAF5A]/50 transition-all"
                placeholder="admin@ekolo.sn"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70 ml-1">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#1FAF5A]/50 focus:ring-1 focus:ring-[#1FAF5A]/50 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1FAF5A] hover:bg-[#1FAF5A]/90 text-white font-bold py-3 rounded-xl shadow-lg shadow-[#1FAF5A]/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-white/30">
          Powered by DeepMind Antigravity • Laravel 12
        </p>
      </motion.div>
    </div>
  );
}
