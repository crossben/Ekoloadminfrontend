import { Bell, Search, Globe, User } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [language, setLanguage] = useState("fr");

  const languages = [
    { code: "fr", label: "Français" },
    { code: "en", label: "English" },
    { code: "sw", label: "Kiswahili" },
    { code: "wo", label: "Wolof" },
  ];

  return (
    <header className="h-16 border-b border-white/[0.07] sticky top-0 z-10" 
            style={{ background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(10px)' }}>
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/[0.07] rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#1FAF5A]/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none bg-white/[0.03] border border-white/[0.07] rounded-lg pl-10 pr-8 py-2 text-white text-sm font-semibold focus:outline-none focus:border-[#1FAF5A]/50 cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-[#050e08]">
                  {lang.label}
                </option>
              ))}
            </select>
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
          </div>

          <button className="relative p-2 rounded-lg bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.05] transition-colors">
            <Bell className="w-5 h-5 text-white/60" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#1FAF5A] rounded-full"></span>
          </button>

          <button className="flex items-center gap-3 p-2 pl-3 rounded-lg bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.05] transition-colors">
            <span className="text-sm font-semibold text-white/90">Admin</span>
            <div className="w-8 h-8 rounded-full bg-[#1FAF5A] flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
