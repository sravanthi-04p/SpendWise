import { useEffect, useState } from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import api from '../api/axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import creditIllustration from '../assets/Group.png';
import debitIllustration from '../assets/Debit.png';
const Dashboard = () => {
  const [totals, setTotals] = useState({ credit: 0, debit: 0 });
  const [lastTransactions, setLastTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [totalsRes, allTxRes, weeklyRes] = await Promise.all([
          api.get('/rest/credit-debit-totals'),
          api.get('/rest/all-transactions'),
          api.get('/rest/daywise-totals-7-days'),
        ]);

        const totalsList = totalsRes.data.totals_credit_debit_transactions;
        const credit = totalsList.find((t) => t.type === 'credit')?.sum || 0;
        const debit = totalsList.find((t) => t.type === 'debit')?.sum || 0;
        setTotals({ credit, debit });

        setLastTransactions(allTxRes.data.transactions.slice(0, 3));

        const weekly = weeklyRes.data.last_7_days_transactions_credit_debit_totals;
        const grouped = {};
        weekly.forEach((row) => {
          if (!grouped[row.day]) grouped[row.day] = { day: row.day, debit: 0, credit: 0 };
          grouped[row.day][row.type] = row.sum;
        });
        setChartData(Object.values(grouped));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: 'var(--color-debit)' }}>{error}</p>;

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Accounts</h2>

      {/* Balance cards */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
       <div className="card" style={{ padding: '24px', flex: 1, position: 'relative', overflow: 'hidden' }}>
  <p style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-credit)', margin: 0 }}>
    ${totals.credit.toLocaleString()}
  </p>
  <p style={{ color: 'var(--color-text-muted)', margin: '4px 0 0' }}>Credit</p>
<img
  src={creditIllustration}
  alt=""
  style={{
    position: 'absolute',
    right: '0',
    bottom: '0',
    maxWidth: '130px',
    maxHeight: '100px',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
    pointerEvents: 'none',
  }}
/>
</div>
        <div className="card" style={{ padding: '24px', flex: 1, position: 'relative', overflow: 'hidden' }}>
  <p style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-debit)', margin: 0 }}>
    ${totals.debit.toLocaleString()}
  </p>
  <p style={{ color: 'var(--color-text-muted)', margin: '4px 0 0' }}>Debit</p>
  <img
    src={debitIllustration}
    alt=""
    style={{
      position: 'absolute',
      right: '0',
      bottom: '0',
      maxWidth: '130px',
      maxHeight: '100px',
      width: 'auto',
      height: 'auto',
      objectFit: 'contain',
      pointerEvents: 'none',
    }}
  />
</div>
      </div>

      {/* Last transactions */}
      <h3>Last Transaction</h3>
      <div className="card" style={{ padding: '8px 24px', marginBottom: '24px' }}>
        {lastTransactions.length === 0 && (
          <p style={{ padding: '20px 0', color: 'var(--color-text-muted)' }}>No transactions yet.</p>
        )}
        {lastTransactions.map((tx, i) => (
          <div
            key={tx.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 0',
              borderBottom: i < lastTransactions.length - 1 ? '1px solid var(--color-border)' : 'none',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: tx.type === 'credit' ? '#e8f9ef' : '#fdeaea',
                flexShrink: 0,
              }}
            >
              {tx.type === 'credit' ? (
                <ArrowUpRight size={16} color="var(--color-credit)" />
              ) : (
                <ArrowDownLeft size={16} color="var(--color-debit)" />
              )}
            </div>
            <span style={{ flex: 2, fontWeight: 500 }}>{tx.transaction_name}</span>
            <span style={{ flex: 1, color: 'var(--color-text-muted)', fontSize: '14px' }}>{tx.category}</span>
            <span style={{ flex: 1, color: 'var(--color-text-muted)', fontSize: '14px' }}>
              {new Date(tx.date).toLocaleDateString()}
            </span>
            <span
              style={{
                flex: 1,
                textAlign: 'right',
                fontWeight: 600,
                color: tx.type === 'credit' ? 'var(--color-credit)' : 'var(--color-debit)',
              }}
            >
              {tx.type === 'credit' ? '+' : '-'}${tx.amount}
            </span>
          </div>
        ))}
      </div>

      {/* Weekly chart */}
      <h3>Debit & Credit Overview</h3>
<div className="card" style={{ padding: '24px', height: '407px', maxWidth: '1110px', width: '100%', boxSizing: 'border-box' }}>
        {chartData.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)' }}>No transactions in the last 7 days.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={6}>
              <CartesianGrid vertical={false} stroke="var(--color-border)" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#8a94a6', fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: '#8a94a6', fontSize: 12 }} />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Legend iconType="circle" />
              <Bar dataKey="debit" fill="var(--color-chart-debit)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="credit" fill="var(--color-chart-credit)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Dashboard;