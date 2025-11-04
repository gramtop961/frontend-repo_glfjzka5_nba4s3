import { User, ArrowDownRight, ArrowUpRight } from 'lucide-react';

function PersonRow({ person, onSelect }) {
  const net = (person.lentTotal || 0) - (person.borrowedTotal || 0);
  const statusColor = net > 0 ? 'text-emerald-600' : net < 0 ? 'text-rose-600' : 'text-slate-600';
  return (
    <button
      onClick={() => onSelect(person.name)}
      className="w-full text-left bg-white hover:bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between transition"
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">
          <User className="w-5 h-5" />
        </div>
        <div>
          <div className="font-semibold text-slate-800">{person.name}</div>
          <div className="text-xs text-slate-500">{person.count} transactions</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-xs text-slate-500 flex items-center gap-1 justify-end">
          <ArrowUpRight className="w-3 h-3 text-emerald-600" /> lent: {person.lentTotal.toFixed(2)}
          <span className="mx-1">·</span>
          <ArrowDownRight className="w-3 h-3 text-rose-600" /> borrowed: {person.borrowedTotal.toFixed(2)}
        </div>
        <div className={`text-sm font-semibold ${statusColor}`}>
          Net: {net.toFixed(2)}
        </div>
      </div>
    </button>
  );
}

export default function PeopleList({ people, onSelect }) {
  const oweMe = people.filter((p) => (p.lentTotal - p.borrowedTotal) > 0);
  const iOwe = people.filter((p) => (p.lentTotal - p.borrowedTotal) < 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white/70 backdrop-blur border border-slate-200 rounded-xl p-4">
        <h3 className="font-semibold text-slate-800 mb-3">They owe me</h3>
        <div className="space-y-2">
          {oweMe.length === 0 ? (
            <div className="text-sm text-slate-500">No one yet</div>
          ) : (
            oweMe.map((p) => <PersonRow key={p.name} person={p} onSelect={onSelect} />)
          )}
        </div>
      </div>
      <div className="bg-white/70 backdrop-blur border border-slate-200 rounded-xl p-4">
        <h3 className="font-semibold text-slate-800 mb-3">I owe</h3>
        <div className="space-y-2">
          {iOwe.length === 0 ? (
            <div className="text-sm text-slate-500">No one yet</div>
          ) : (
            iOwe.map((p) => <PersonRow key={p.name} person={p} onSelect={onSelect} />)
          )}
        </div>
      </div>
    </div>
  );
}
