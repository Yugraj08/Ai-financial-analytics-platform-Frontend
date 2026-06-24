import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChartCard from '../components/charts/ChartCard';
import CategoryPieChart from '../components/charts/CategoryPieChart';
import MonthlyBarChart from '../components/charts/MonthlyBarChart';
import TrendLineChart from '../components/charts/TrendLineChart';
import Skeleton from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import Badge from '../components/ui/Badge';
import { pageTransition, staggerContainer, staggerItem } from '../animations/variants';
import { formatCurrency, groupByMonth, groupByCategory } from '../utils/formatters';
import { CHART_COLORS, CATEGORY_ICONS } from '../constants';
import * as recordService from '../services/recordService';

const AnalyticsPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await recordService.getAllRecords();
        setRecords(data.content || (Array.isArray(data) ? data : []));
      } catch (err) {
        if (err.response?.status === 403) {
          setError('Access denied. Analytics is available for Admin users only.');
        } else {
          console.error(err);
        }
      }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const expenses = records.filter(r => r.type === 'EXPENSE');
  const incomes = records.filter(r => r.type === 'INCOME');
  const monthlyData = groupByMonth(records);
  const categoryData = groupByCategory(expenses);
  const incomeCategoryData = groupByCategory(incomes);

  const totalExpense = expenses.reduce((s, r) => s + r.amount, 0);
  const totalIncome = incomes.reduce((s, r) => s + r.amount, 0);
  const avgExpense = expenses.length > 0 ? totalExpense / expenses.length : 0;
  const topCategory = categoryData[0];

  if (loading) {
    return (
      <div className="page-container space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{[0,1,2].map(i => <Skeleton.Card key={i} />)}</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><Skeleton.Chart /><Skeleton.Chart /></div>
        <Skeleton.Chart />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <EmptyState title="Access Restricted" description={error} />
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="page-container">
        <EmptyState title="No data for analytics" description="Add transactions to see analytics and insights here."
          actionLabel="Go to Transactions" onAction={() => window.location.href = '/transactions'} />
      </div>
    );
  }

  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" className="page-container space-y-8">
      <div>
        <h1 className="text-heading-2 text-text-primary font-bold">Analytics</h1>
        <p className="text-body-sm text-text-secondary mt-1">Visual insights into your financial data</p>
      </div>

      {/* Summary Cards */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Avg. Transaction', value: formatCurrency(avgExpense), color: 'text-accent' },
          { label: 'Top Category', value: topCategory?.category || 'N/A', color: 'text-warning' },
          { label: 'Savings Rate', value: totalIncome > 0 ? `${(((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1)}%` : '0%', color: 'text-success' },
        ].map((item, i) => (
          <motion.div key={i} variants={staggerItem} className="glass-card p-5">
            <p className="text-body-sm text-text-secondary">{item.label}</p>
            <p className={`text-heading-3 font-bold mt-1 ${item.color}`}>{item.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Expense by Category" subtitle="Where your money goes" delay={0.1}>
          <CategoryPieChart data={categoryData} />
        </ChartCard>
        <ChartCard title="Monthly Comparison" subtitle="Income vs expense by month" delay={0.2}>
          <MonthlyBarChart data={monthlyData} />
        </ChartCard>
      </div>

      <ChartCard title="Financial Trends" subtitle="Track your income, expenses, and net savings over time" delay={0.3}>
        <TrendLineChart data={monthlyData} />
      </ChartCard>

      {/* Category Breakdown Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }} className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border/50">
          <h3 className="text-heading-4 text-text-primary font-semibold">Category Breakdown</h3>
          <p className="text-body-sm text-text-secondary mt-1">Detailed expense breakdown by category</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30 bg-card-hover/30">
                <th className="table-cell table-header text-left">Category</th>
                <th className="table-cell table-header text-right">Total Spent</th>
                <th className="table-cell table-header text-right hidden sm:table-cell">Transactions</th>
                <th className="table-cell table-header text-right hidden md:table-cell">% of Total</th>
                <th className="table-cell table-header text-left hidden lg:table-cell">Distribution</th>
              </tr>
            </thead>
            <tbody>
              {categoryData.map((cat, i) => {
                const pct = totalExpense > 0 ? ((cat.total / totalExpense) * 100).toFixed(1) : 0;
                return (
                  <tr key={cat.category} className="table-row">
                    <td className="table-cell text-text-primary font-medium">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{CATEGORY_ICONS[cat.category] || '📦'}</span>
                        {cat.category}
                      </div>
                    </td>
                    <td className="table-cell text-right text-text-primary font-semibold">{formatCurrency(cat.total)}</td>
                    <td className="table-cell text-right text-text-secondary hidden sm:table-cell">{cat.count}</td>
                    <td className="table-cell text-right text-text-secondary hidden md:table-cell">{pct}%</td>
                    <td className="table-cell hidden lg:table-cell">
                      <div className="w-full bg-border/30 rounded-full h-2">
                        <div className="h-2 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnalyticsPage;
