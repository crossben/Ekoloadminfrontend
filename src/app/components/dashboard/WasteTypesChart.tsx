import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
  { name: "Plastique", value: 35, color: "#3b82f6" },
  { name: "Organique", value: 28, color: "#10b981" },
  { name: "Papier", value: 18, color: "#f59e0b" },
  { name: "Métal", value: 12, color: "#8b5cf6" },
  { name: "Verre", value: 7, color: "#ef4444" },
];

export function WasteTypesChart() {
  return (
    <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-4">
      <h3 className="text-sm font-bold text-white mb-4">Types de déchets signalés</h3>
      
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={75}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
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
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1.5 rounded-lg border border-border/50">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-[10px] text-muted-foreground flex-1">{item.name}</span>
            <span className="text-[10px] font-bold text-white">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}