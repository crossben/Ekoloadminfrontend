import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  delay?: number;
}

export function StatsCard({ title, value, change, changeType = "neutral", icon: Icon, delay = 0 }: StatsCardProps) {
  const changeColors = {
    positive: "text-green-400",
    negative: "text-red-400",
    neutral: "text-white/50",
  };

  const changeBg = {
    positive: "bg-green-500/10 border-green-500/20",
    negative: "bg-red-500/10 border-red-500/20",
    neutral: "bg-white/5 border-white/10",
  };

  return (
    <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-2.5 hover:border-primary/30 transition-all">
      <div className="flex items-start justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Icon className="w-3.5 h-3.5 text-primary" />
          </div>
          <div>
            <p className="text-[9px] text-muted-foreground font-medium mb-0.5">{title}</p>
            <h3 className="text-lg font-bold text-white">{value}</h3>
          </div>
        </div>
        {change && (
          <div className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${changeBg[changeType]} ${changeColors[changeType]}`}>
            {change}
          </div>
        )}
      </div>
    </div>
  );
}