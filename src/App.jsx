import { useMemo, useState } from 'react';
import BorrowForm from './components/BorrowForm';
import PeopleList from './components/PeopleList';
import Analysis from './components/Analysis';
import ProfilePanel from './components/ProfilePanel';
import { User, PieChart } from 'lucide-react';

export default function App() {
  const [transactions, setTransactions] = useState([
    // Sample data to demonstrate the UI
    { id: 's1', name: 'Alex', amount: 25, motif: 'Lunch', direction: 'borrow', date: new Date().toISOString() },
    { id: 's2', name: 'Maya', amount: 40, motif: 'Concert ticket', direction: 'lend', date: new Date().toISOString() },
    { id: 's3', name: 'Alex', amount: 10, motif: 'Coffee', direction: 'lend', date: new Date().toISOString() },
  ]);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');

  const people = useMemo(() => {
    const map = new Map();
    for (const t of transactions) {
      const key = t.name.trim();
      if (!map.has(key)) map.set(key, { name: key, lentTotal: 0, borrowedTotal: 0, count: 0 });
      const p = map.get(key);
      if (t.direction === 'lend') p.lentTotal += t.amount; else p.borrowedTotal += t.amount;
      p.count += 1;
    }
    const list = Array.from(map.values());
    if (query.trim()) {
      return list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
    }
    return list;
  }, [transactions, query]);

  const handleAdd = (record) => {
    setTransactions((prev) => [record, ...prev]);
  };

  const selectedPerson = selected ? people.find((p) => p.name === selected) || null : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-800">Borrow Buddy</h1>
              <p className="text-xs text-slate-500">Track who owes what — clear and simple</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-slate-600">
            <PieChart className="w-4 h-4" />
            <span className="text-sm">Insights at a glance</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <BorrowForm onAdd={handleAdd} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/70 backdrop-blur border border-slate-200 rounded-xl p-4">
              <div className="flex items-center justify-between gap-3 mb-3">
                <h2 className="text-lg font-semibold text-slate-800">People</h2>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search people..."
                  className="w-56 rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <PeopleList people={people} onSelect={setSelected} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <Analysis transactions={transactions} />
          </div>
        </div>
      </main>

      {selectedPerson && (
        <ProfilePanel
          person={selectedPerson}
          transactions={transactions}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
