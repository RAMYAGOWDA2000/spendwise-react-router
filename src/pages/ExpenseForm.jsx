import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { useMemo, useState } from "react";
import { useExpenses } from "../context/ExpenseContext";

const categories = ["Food", "Transport", "Bills", "Entertainment", "Shopping", "Health", "Other"];

export default function ExpenseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { expenses, addExpense, updateExpense } = useExpenses();
  const existing = useMemo(() => expenses.find((item) => item.id === id), [expenses, id]);
  const editing = Boolean(id);

  const [form, setForm] = useState(() => existing || {
    title: "", amount: "", category: "Food", date: new Date().toISOString().slice(0, 10), note: ""
  });

  const [error, setError] = useState("");

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || Number(form.amount) <= 0 || !form.date) {
      setError("Please enter a title, a valid amount, and a date.");
      return;
    }
    const payload = { ...form, title: form.title.trim(), amount: Number(form.amount) };
    if (editing) updateExpense(id, payload);
    else addExpense(payload);
    navigate(editing ? `/expenses/${id}` : "/expenses");
  };

  if (editing && !existing) {
    return (
      <div className="card p-8 text-center">
        <h1 className="text-xl font-bold">Expense not found</h1>
        <Link to="/expenses" className="btn-primary mt-5">Back to expenses</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link to={editing ? `/expenses/${id}` : "/expenses"} className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900">
        <ArrowLeft size={17} /> Back
      </Link>

      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">{editing ? "Edit expense" : "Add expense"}</h1>
        <p className="mt-1 text-sm text-slate-500">{editing ? "Update the transaction details." : "Record a new transaction."}</p>
      </div>

      <form onSubmit={submit} className="card space-y-5 p-5 sm:p-7">
        {error && <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

        <div>
          <label className="label">Title</label>
          <input className="input" value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="e.g. Grocery shopping" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label">Amount</label>
            <input className="input" type="number" min="0.01" step="0.01" value={form.amount} onChange={(e) => update("amount", e.target.value)} placeholder="0.00" />
          </div>
          <div>
            <label className="label">Category</label>
            <select className="input" value={form.category} onChange={(e) => update("category", e.target.value)}>
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="label">Date</label>
          <input className="input" type="date" value={form.date} onChange={(e) => update("date", e.target.value)} />
        </div>

        <div>
          <label className="label">Note</label>
          <textarea className="input min-h-28 resize-y" value={form.note} onChange={(e) => update("note", e.target.value)} placeholder="Optional note..." />
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <Link to={editing ? `/expenses/${id}` : "/expenses"} className="btn-secondary">Cancel</Link>
          <button className="btn-primary" type="submit"><Save size={18} /> {editing ? "Save changes" : "Add expense"}</button>
        </div>
      </form>
    </div>
  );
}