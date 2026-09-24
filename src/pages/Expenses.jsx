import { Link } from "react-router-dom";
import { Edit3, Eye, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useExpenses } from "../context/ExpenseContext";

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

export default function Expenses() {
  const { expenses, deleteExpense } = useExpenses();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [...new Set(expenses.map((e) => e.category))];

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return expenses.filter((expense) => {
      const matchesSearch =
        !q ||
        expense.title.toLowerCase().includes(q) ||
        expense.category.toLowerCase().includes(q) ||
        expense.note?.toLowerCase().includes(q);
      const matchesCategory = category === "All" || expense.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [expenses, search, category]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this expense?")) deleteExpense(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-slate-500">Transactions</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Expenses</h1>
          <p className="mt-1 text-sm text-slate-500">{filtered.length} expense(s) shown.</p>
        </div>
        <Link to="/expenses/new" className="btn-primary">
          <Plus size={18} /> Add expense
        </Link>
      </div>

      <div className="card p-4">
        <div className="grid gap-3 sm:grid-cols-[1fr_220px]">
          <label className="relative block">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="input pl-10" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search expenses..." />
          </label>
          <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>All</option>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="hidden grid-cols-[1fr_130px_120px_140px] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 md:grid">
          <span>Expense</span><span>Category</span><span>Date</span><span className="text-right">Amount</span>
        </div>
        <div className="divide-y divide-slate-100">
          {filtered.map((expense) => (
            <div key={expense.id} className="flex flex-col gap-3 p-5 md:grid md:grid-cols-[1fr_130px_120px_140px] md:items-center md:gap-4">
              <div className="min-w-0">
                <Link to={`/expenses/${expense.id}`} className="font-semibold hover:underline">{expense.title}</Link>
                <p className="mt-1 truncate text-xs text-slate-500">{expense.note || "No note"}</p>
              </div>
              <span className="w-fit rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{expense.category}</span>
              <span className="text-sm text-slate-500">{expense.date}</span>
              <div className="flex items-center justify-between gap-3 md:justify-end">
                <strong>{currency.format(Number(expense.amount))}</strong>
                <div className="flex gap-1">
                  <Link className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" to={`/expenses/${expense.id}`} title="View"><Eye size={16} /></Link>
                  <Link className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" to={`/expenses/${expense.id}/edit`} title="Edit"><Edit3 size={16} /></Link>
                  <button className="rounded-lg p-2 text-red-500 hover:bg-red-50" onClick={() => handleDelete(expense.id)} title="Delete"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
          {!filtered.length && <div className="p-10 text-center text-sm text-slate-500">No expenses match your filters.</div>}
        </div>
      </div>
    </div>
  );
}