import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CHART_COLORS } from '../../constants';
import { formatCurrency } from '../../utils/formatters';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-glass">
        <p className="text-body-sm font-medium text-text-primary">{payload[0].name}</p>
        <p className="text-caption text-text-secondary">
          {formatCurrency(payload[0].value)} ({payload[0].payload.percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center mt-4">
      {payload?.map((entry, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-caption text-text-secondary">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const CategoryPieChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[250px] text-text-muted text-body-sm">
        No category data available
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.total, 0);
  const chartData = data.map((item) => ({
    ...item,
    name: item.category,
    value: item.total,
    percentage: total > 0 ? ((item.total / total) * 100).toFixed(1) : 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="45%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
          animationBegin={0}
          animationDuration={800}
          animationEasing="ease-out"
        >
          {chartData.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={CHART_COLORS[index % CHART_COLORS.length]}
              stroke="transparent"
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryPieChart;
