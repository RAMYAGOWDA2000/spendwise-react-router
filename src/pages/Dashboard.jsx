import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Receipt, TrendingDown } from "lucide-react";
import { useExpenses } from "../context/ExpenseContext";

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

export default function Dashboard() {
  const { expenses } = useExpenses();
  const total = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const average = expenses.length ? total / expenses.length : 0;
  const categories = [...new Set(expenses.map((e) => e.category))].length;
  const recent = expenses.slice(0, 5);

  const cards = [
    { label: "Total spending", value: currency.format(total), icon: TrendingDown },
    { label: "Transactions", value: expenses.length, icon: Receipt },
    { label: "Average expense", value: currency.format(average), icon: CalendarDays },
    { label: "Categories used", value: categories, icon: Receipt },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-slate-500">Overview</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Good morning 👋</h1>
        <p className="mt-1 text-sm text-slate-500">Here is your spending snapshot.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">{label}</span>
              <Icon size={19} className="text-slate-400" />
            </div>
            <p className="mt-4 text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <section className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div>
            <h2 className="font-semibold">Recent expenses</h2>
            <p className="mt-1 text-sm text-slate-500">Your latest transactions.</p>
          </div>
          <Link to="/expenses" className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-slate-950">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="divide-y divide-slate-100">
          {recent.length ? recent.map((expense) => (
            <Link key={expense.id} to={`/expenses/${expense.id}`} className="flex items-center justify-between gap-4 p-5 hover:bg-slate-50">
              <div className="min-w-0">
                <p className="truncate font-medium">{expense.title}</p>
                <p className="mt-1 text-xs text-slate-500">{expense.category} · {expense.date}</p>
              </div>
              <p className="shrink-0 font-semibold">{currency.format(Number(expense.amount))}</p>
            </Link>
          )) : (
            <div className="p-8 text-center text-sm text-slate-500">No expenses yet.</div>
          )}
        </div>
      </section>
    </div>
  );
}