import { useEffect, useState } from 'react';
import { Pencil, Trash2, ArrowDownLeft, ArrowUpRight, Plus } from 'lucide-react';
import api from '../api/axios';
import TransactionModal from '../components/TransactionModal';
import DeleteModal from '../components/DeleteModal';

const TABS = [
  { label: 'All Transactions', value: '' },
  { label: 'Debit', value: 'debit' },
  { label: 'Credit', value: 'credit' },
];

const Transactions = () => {
  const [activeTab, setActiveTab] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const fetchTransactions = async (type) => {
    setLoading(true);
    setError('');
    try {
      const url = type ? `/rest/all-transactions?type=${type}` : '/rest/all-transactions';
      const { data } = await api.get(url);
      setTransactions(data.transactions);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(activeTab);
  }, [activeTab]);

  const handleConfirmDelete = async () => {
    try {
      await api.post('/rest/delete-transaction', { id: deleteTargetId });
      setDeleteTargetId(null);
      fetchTransactions(activeTab);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete transaction');
    }
  };

  const openAddModal = () => {
    setEditingTransaction(null);
    setModalOpen(true);
  };

  const openEditModal = (tx) => {
    setEditingTransaction(tx);
    setModalOpen(true);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Transactions</h2>
        <button className="btn-primary" onClick={openAddModal} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Plus size={16} /> Add Transaction
        </button>
      </div>

      <div style={{ display: 'flex', gap: '28px', margin: '20px 0' }}>
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px 0',
              fontSize: '14px',
              fontWeight: activeTab === tab.value ? 700 : 500,
              color: activeTab === tab.value ? 'var(--color-primary)' : 'var(--color-text-muted)',
              borderBottom: activeTab === tab.value ? '2px solid var(--color-primary)' : '2px solid transparent',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: '10px 24px' }}>
        {loading && <p style={{ padding: '20px 0' }}>Loading...</p>}
        {error && <p style={{ color: 'var(--color-debit)', padding: '20px 0' }}>{error}</p>}

        {!loading && !error && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ padding: '14px 0', color: 'var(--color-text-muted)', fontSize: '13px', fontWeight: 500 }}>Transaction Name</th>
                <th style={{ color: 'var(--color-text-muted)', fontSize: '13px', fontWeight: 500 }}>Category</th>
                <th style={{ color: 'var(--color-text-muted)', fontSize: '13px', fontWeight: 500 }}>Date</th>
                <th style={{ color: 'var(--color-text-muted)', fontSize: '13px', fontWeight: 500 }}>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '30px 0', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    No transactions found.
                  </td>
                </tr>
              )}
              {transactions.map((tx) => (
                <tr key={tx.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '16px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: tx.type === 'credit' ? '#e8f9ef' : '#fdeaea',
                      }}
                    >
                      {tx.type === 'credit' ? (
                        <ArrowUpRight size={14} color="var(--color-credit)" />
                      ) : (
                        <ArrowDownLeft size={14} color="var(--color-debit)" />
                      )}
                    </div>
                    {tx.transaction_name}
                  </td>
                  <td style={{ color: 'var(--color-text-muted)' }}>{tx.category}</td>
                  <td style={{ color: 'var(--color-text-muted)' }}>{new Date(tx.date).toLocaleDateString()}</td>
                  <td style={{ fontWeight: 600, color: tx.type === 'credit' ? 'var(--color-credit)' : 'var(--color-debit)' }}>
                    {tx.type === 'credit' ? '+' : '-'}${tx.amount}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button className="icon-btn" onClick={() => openEditModal(tx)} title="Edit">
                        <Pencil size={16} />
                      </button>
                      <button className="icon-btn" onClick={() => setDeleteTargetId(tx.id)} title="Delete">
                        <Trash2 size={16} color="var(--color-debit)" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <TransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => fetchTransactions(activeTab)}
        editingTransaction={editingTransaction}
      />

      <DeleteModal
        isOpen={deleteTargetId !== null}
        onCancel={() => setDeleteTargetId(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Transactions;