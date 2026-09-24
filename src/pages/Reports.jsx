import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { useMemo } from "react";
import { useExpenses } from "../context/ExpenseContext";

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

export default function Reports() {
  const { expenses, resetExpenses } = useExpenses();

  const rows = useMemo(() => {
    const map = {};
    expenses.forEach((expense) => {
      map[expense.category] = (map[expense.category] || 0) + Number(expense.amount);
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [expenses]);

  const total = rows.reduce((sum, [, value]) => sum + value, 0);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-slate-500">Analytics</p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Reports</h1>
        <p className="mt-1 text-sm text-slate-500">Spending grouped by category.</p>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-slate-100 p-3"><BarChart3 size={20} /></div>
          <div>
            <p className="text-sm text-slate-500">Total tracked spending</p>
            <p className="text-2xl font-bold">{currency.format(total)}</p>
          </div>
        </div>

        <div className="mt-7 space-y-5">
          {rows.map(([category, amount]) => {
            const percent = total ? (amount / total) * 100 : 0;
            return (
              <div key={category}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">{category}</span>
                  <span className="text-slate-500">{currency.format(amount)} · {percent.toFixed(1)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-slate-900" style={{ width: `${percent}%` }} />
                </div>
              </div>
            );
          })}
          {!rows.length && <p className="text-sm text-slate-500">No data available.</p>}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/expenses" className="btn-secondary"><ArrowLeft size={17} /> Expenses</Link>
        <button className="btn-secondary" onClick={() => window.confirm("Reset all expenses to the demo data?") && resetExpenses()}>
          Reset demo data
        </button>
      </div>
    </div>
  );
}