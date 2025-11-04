import { X, User, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function ProfilePanel({ person, transactions, onClose }) {
  if (!person) return null;
  const net = (person.lentTotal || 0) - (person.borrowedTotal || 0);

  const tx = transactions.filter((t) => t.name === person.name);

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-semibold text-slate-800">{person.name}</div>
              <div className="text-xs text-slate-500">{tx.length} transactions</div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        <div className="p-4 grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-slate-200 p-3">
            <div className="text-xs text-slate-500">Lent</div>
            <div className="text-emerald-600 font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" /> {person.lentTotal.toFixed(2)}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 p-3">
            <div className="text-xs text-slate-500">Borrowed</div>
            <div className="text-rose-600 font-semibold flex items-center gap-1">
              <ArrowDownRight className="w-4 h-4" /> {person.borrowedTotal.toFixed(2)}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 p-3">
            <div className="text-xs text-slate-500">Net</div>
            <div className={`font-semibold ${net >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{net.toFixed(2)}</div>
          </div>
        </div>

        <div className="p-4">
          <div className="text-sm font-medium text-slate-700 mb-2">Transactions</div>
          <div className="max-h-72 overflow-auto space-y-2">
            {tx.length === 0 ? (
              <div className="text-sm text-slate-500">No transactions yet</div>
            ) : (
              tx.map((t) => (
                <div key={t.id} className="rounded-lg border border-slate-200 p-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-slate-700">{t.motif || 'No note'}</div>
                    <div className="text-xs text-slate-500">{new Date(t.date).toLocaleString()}</div>
                  </div>
                  <div className={`${t.direction === 'lend' ? 'text-emerald-600' : 'text-rose-600'} font-semibold`}>
                    {t.direction === 'lend' ? '+' : '-'}{t.amount.toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
