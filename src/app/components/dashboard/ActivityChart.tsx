import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ActivityData {
  name: string;
  signalements: number;
  resolus: number;
}

export function ActivityChart({ data }: { data?: ActivityData[] }) {
  const chartData = data || [];

  return (
    <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white">Activité hebdomadaire</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
            <span className="text-[10px] text-muted-foreground font-medium">Signalements</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
            <span className="text-[10px] text-muted-foreground font-medium">Résolus</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorSignalements" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1FAF5A" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#1FAF5A" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorResolus" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(31,175,90,0.08)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="rgba(255,255,255,0.3)"
            style={{ fontSize: '10px', fontWeight: 600 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.3)"
            style={{ fontSize: '10px', fontWeight: 600 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{
              background: 'rgba(10, 22, 18, 0.95)',
              border: '1px solid rgba(31, 175, 90, 0.2)',
              borderRadius: '8px',
              color: 'white',
              backdropFilter: 'blur(10px)',
              fontWeight: 600,
              fontSize: '11px'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="signalements" 
            stroke="#1FAF5A" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorSignalements)" 
          />
          <Area 
            type="monotone" 
            dataKey="resolus" 
            stroke="#3b82f6" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorResolus)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}