import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface WasteData {
  name: string;
  value: number;
  color?: string;
}

const DEFAULT_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#ec4899"];

export function WasteTypesChart({ data }: { data?: WasteData[] }) {
  const total = data?.reduce((acc, item) => acc + item.value, 0) || 1;
  const chartData = data?.map((item, index) => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1),
    color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]
  })) || [];

  return (
    <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-4">
      <h3 className="text-sm font-bold text-white mb-4">Types de déchets signalés</h3>
      
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={75}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
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
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-2 gap-1.5">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1.5 rounded-lg border border-border/50">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-[10px] text-muted-foreground flex-1">{item.name}</span>
            <span className="text-[10px] font-bold text-white">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}