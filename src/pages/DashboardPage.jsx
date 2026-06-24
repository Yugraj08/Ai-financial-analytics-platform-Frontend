import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, Receipt, ArrowRight } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import Skeleton from '../components/ui/Skeleton';
import ChartCard from '../components/charts/ChartCard';
import CategoryPieChart from '../components/charts/CategoryPieChart';
import MonthlyBarChart from '../components/charts/MonthlyBarChart';
import TrendLineChart from '../components/charts/TrendLineChart';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import useDashboard from '../hooks/useDashboard';
import { staggerContainer } from '../animations/variants';
import { formatCurrency, formatDate, groupByMonth, groupByCategory } from '../utils/formatters';
import { CATEGORY_ICONS } from '../constants';
import * as recordService from '../services/recordService';

const DashboardPage = () => {
  const { dashboard, loading: dashLoading, error: dashError } = useDashboard();
  const { canAccessDashboard, isAdmin } = useAuth();
  const [recentRecords, setRecentRecords] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [recordsLoading, setRecordsLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const recentData = await recordService.getRecords(0, 5);
        setRecentRecords(recentData.content || (Array.isArray(recentData) ? recentData : []));
        const allData = await recordService.getAllRecords();
        setAllRecords(allData.content || (Array.isArray(allData) ? allData : []));
      } catch (err) {
        // 403 is expected for non-ADMIN users on GET /records
        if (err.response?.status !== 403) {
          console.error('Failed to fetch records:', err);
        }
      } finally {
        setRecordsLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const monthlyData = groupByMonth(allRecords);
  const categoryData = groupByCategory(allRecords.filter((r) => r.type === 'EXPENSE'));

  const totalIncome = dashboard?.totalIncome ?? allRecords.filter(r => r.type === 'INCOME').reduce((s, r) => s + r.amount, 0);
  const totalExpense = dashboard?.totalExpense ?? allRecords.filter(r => r.type === 'EXPENSE').reduce((s, r) => s + r.amount, 0);
  const totalBalance = dashboard?.totalBalance ?? (totalIncome - totalExpense);
  const recordCount = dashboard?.totalRecords ?? allRecords.length;
  const isLoading = dashLoading || recordsLoading;

  return (
    <div className="page-container space-y-8">
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
          {[0,1,2,3].map(i => <Skeleton.Card key={i} />)}
        </div>
      ) : (
        <motion.div variants={staggerContainer} initial="hidden" animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
          <StatCard title="Total Balance" value={totalBalance} icon={Wallet} type="balance" delay={0} />
          <StatCard title="Total Income" value={totalIncome} icon={TrendingUp} type="income" delay={0.1} />
          <StatCard title="Total Expenses" value={totalExpense} icon={TrendingDown} type="expense" delay={0.2} />
          <StatCard title="Total Records" value={recordCount} icon={Receipt} type="default" isCurrency={false} delay={0.3} />
        </motion.div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <Skeleton.Chart /><Skeleton.Chart />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <ChartCard title="Category Breakdown" subtitle="Expense distribution by category" delay={0.2}>
            <CategoryPieChart data={categoryData} />
          </ChartCard>
          <ChartCard title="Monthly Overview" subtitle="Income vs expense comparison" delay={0.3}>
            <MonthlyBarChart data={monthlyData} />
          </ChartCard>
        </div>
      )}

      {!isLoading && monthlyData.length > 0 && (
        <ChartCard title="Financial Trends" subtitle="Income, expense, and net savings over time" delay={0.4}>
          <TrendLineChart data={monthlyData} />
        </ChartCard>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }} className="glass-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <h3 className="text-heading-4 text-text-primary font-semibold">Recent Transactions</h3>
          <Link to="/transactions" className="flex items-center gap-1.5 text-body-sm text-accent hover:text-accent-hover font-medium transition-colors">
            View all<ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {isLoading ? (
          <div>{[0,1,2,3,4].map(i => <Skeleton.Row key={i} />)}</div>
        ) : recentRecords.length === 0 ? (
          <EmptyState title="No transactions yet" description="Add your first transaction to see it here."
            actionLabel="Add Transaction" onAction={() => window.location.href = '/transactions'} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30 bg-card-hover/30">
                  <th className="table-cell table-header text-left">Description</th>
                  <th className="table-cell table-header text-left">Category</th>
                  <th className="table-cell table-header text-right">Amount</th>
                  <th className="table-cell table-header text-left hidden sm:table-cell">Type</th>
                  <th className="table-cell table-header text-left hidden md:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentRecords.map((record, index) => (
                  <motion.tr key={record.id || index} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }} className="table-row">
                    <td className="table-cell text-text-primary font-medium">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{CATEGORY_ICONS[record.category] || '📦'}</span>
                        <span className="truncate max-w-[200px]">{record.note || record.description}</span>
                      </div>
                    </td>
                    <td className="table-cell text-text-secondary">{record.category}</td>
                    <td className={`table-cell text-right font-semibold ${record.type === 'INCOME' ? 'text-success' : 'text-error'}`}>
                      {record.type === 'INCOME' ? '+' : '-'}{formatCurrency(record.amount)}
                    </td>
                    <td className="table-cell hidden sm:table-cell">
                      <Badge variant={record.type === 'INCOME' ? 'income' : 'expense'}>{record.type}</Badge>
                    </td>
                    <td className="table-cell text-text-secondary hidden md:table-cell">{formatDate(record.date)}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DashboardPage;
