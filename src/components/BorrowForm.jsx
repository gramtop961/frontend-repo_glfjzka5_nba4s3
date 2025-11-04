import { useState } from 'react';
import { Plus, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function BorrowForm({ onAdd }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [motif, setMotif] = useState('');
  const [direction, setDirection] = useState('borrow'); // 'borrow' = I borrowed from them, 'lend' = I lent to them

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!name.trim() || isNaN(numericAmount) || numericAmount <= 0) return;

    onAdd({
      id: crypto.randomUUID(),
      name: name.trim(),
      amount: numericAmount,
      motif: motif.trim(),
      direction,
      date: new Date().toISOString(),
    });

    setName('');
    setAmount('');
    setMotif('');
    setDirection('borrow');
  };

  return (
    <div className="bg-white/70 backdrop-blur border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5 text-indigo-600" />
        Add a record
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-600 mb-1">Person</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Friend's name"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Amount</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Type</label>
          <div className="relative">
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-300 px-3 py-2 pr-8 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="borrow">I borrowed from them</option>
              <option value="lend">I lent to them</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-slate-400">
              {direction === 'borrow' ? (
                <ArrowDownRight className="w-4 h-4" />
              ) : (
                <ArrowUpRight className="w-4 h-4" />
              )}
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-600 mb-1">Motif / Note</label>
          <input
            type="text"
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
            placeholder="e.g., lunch, ticket, rent share"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="sm:col-span-5 flex justify-end pt-1">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Plus className="w-4 h-4" /> Save
          </button>
        </div>
      </form>
    </div>
  );
}
