import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-glass">
        <p className="text-body-sm font-medium text-text-primary mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-caption" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const MonthlyBarChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[250px] text-text-muted text-body-sm">
        No monthly data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} barGap={4} barCategoryGap="20%">
        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fill: '#94A3B8', fontSize: 12 }}
          axisLine={{ stroke: '#1E293B' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#94A3B8', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(30, 41, 59, 0.5)' }} />
        <Legend
          wrapperStyle={{ paddingTop: '16px' }}
          formatter={(value) => (
            <span className="text-caption text-text-secondary">{value}</span>
          )}
        />
        <Bar
          dataKey="income"
          name="Income"
          fill="#10B981"
          radius={[6, 6, 0, 0]}
          animationDuration={800}
        />
        <Bar
          dataKey="expense"
          name="Expense"
          fill="#EF4444"
          radius={[6, 6, 0, 0]}
          animationDuration={800}
          animationBegin={200}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyBarChart;
