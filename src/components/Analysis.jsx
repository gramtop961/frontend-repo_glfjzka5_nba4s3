import { PieChart, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function Analysis({ transactions }) {
  const totals = transactions.reduce(
    (acc, t) => {
      if (t.direction === 'lend') {
        acc.lent += t.amount;
      } else {
        acc.borrowed += t.amount;
      }
      return acc;
    },
    { lent: 0, borrowed: 0 }
  );
  const net = totals.lent - totals.borrowed;

  const top = Object.values(
    transactions.reduce((map, t) => {
      map[t.name] = map[t.name] || { name: t.name, lent: 0, borrowed: 0 };
      if (t.direction === 'lend') map[t.name].lent += t.amount;
      else map[t.name].borrowed += t.amount;
      return map;
    }, {})
  )
    .sort((a, b) => (b.lent - b.borrowed) - (a.lent - a.borrowed))
    .slice(0, 5);

  return (
    <div className="bg-white/70 backdrop-blur border border-slate-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <PieChart className="w-5 h-5 text-indigo-600" /> Overview
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-lg border border-slate-200 p-3">
          <div className="text-xs text-slate-500">Total lent</div>
          <div className="text-emerald-600 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4" /> {totals.lent.toFixed(2)}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <div className="text-xs text-slate-500">Total borrowed</div>
          <div className="text-rose-600 font-semibold flex items-center gap-1">
            <ArrowDownRight className="w-4 h-4" /> {totals.borrowed.toFixed(2)}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <div className="text-xs text-slate-500">Net</div>
          <div className={`font-semibold ${net >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{net.toFixed(2)}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm font-medium text-slate-700 mb-2">Top counterparties</div>
        {top.length === 0 ? (
          <div className="text-sm text-slate-500">No data yet</div>
        ) : (
          <ul className="space-y-2">
            {top.map((p) => {
              const netP = p.lent - p.borrowed;
              return (
                <li key={p.name} className="flex items-center justify-between rounded-lg border border-slate-200 p-2">
                  <span className="text-slate-700">{p.name}</span>
                  <span className={`text-sm font-semibold ${netP >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{netP.toFixed(2)}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
