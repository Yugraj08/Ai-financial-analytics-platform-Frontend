import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
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

const TrendLineChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[250px] text-text-muted text-body-sm">
        No trend data available
      </div>
    );
  }

  // Calculate net (income - expense) for trend
  const trendData = data.map((item) => ({
    ...item,
    net: item.income - item.expense,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={trendData}>
        <defs>
          <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
        </defs>
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
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="income"
          name="Income"
          stroke="#10B981"
          strokeWidth={2}
          fill="url(#colorIncome)"
          animationDuration={800}
        />
        <Area
          type="monotone"
          dataKey="expense"
          name="Expense"
          stroke="#EF4444"
          strokeWidth={2}
          fill="url(#colorExpense)"
          animationDuration={800}
          animationBegin={200}
        />
        <Area
          type="monotone"
          dataKey="net"
          name="Net"
          stroke="#3B82F6"
          strokeWidth={2.5}
          fill="url(#colorNet)"
          animationDuration={800}
          animationBegin={400}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TrendLineChart;
