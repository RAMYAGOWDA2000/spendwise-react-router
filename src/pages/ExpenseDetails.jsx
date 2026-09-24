import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Edit3, Trash2 } from "lucide-react";
import { useExpenses } from "../context/ExpenseContext";

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

export default function ExpenseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { expenses, deleteExpense } = useExpenses();
  const expense = expenses.find((item) => item.id === id);

  if (!expense) {
    return (
      <div className="card p-10 text-center">
        <h1 className="text-xl font-bold">Expense not found</h1>
        <Link to="/expenses" className="btn-primary mt-5">Back to expenses</Link>
      </div>
    );
  }

  const remove = () => {
    if (window.confirm("Delete this expense?")) {
      deleteExpense(id);
      navigate("/expenses");
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link to="/expenses" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900">
        <ArrowLeft size={17} /> Back to expenses
      </Link>

      <div className="card overflow-hidden">
        <div className="border-b border-slate-100 bg-slate-50 p-6">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">{expense.category}</span>
          <h1 className="mt-4 text-2xl font-bold sm:text-3xl">{expense.title}</h1>
          <p className="mt-2 text-sm text-slate-500">{expense.date}</p>
        </div>
        <div className="space-y-6 p-6">
          <div>
            <p className="text-sm text-slate-500">Amount</p>
            <p className="mt-1 text-3xl font-bold">{currency.format(Number(expense.amount))}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Note</p>
            <p className="mt-1 text-sm leading-6 text-slate-700">{expense.note || "No note added."}</p>
          </div>
          <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row">
            <Link to={`/expenses/${id}/edit`} className="btn-primary"><Edit3 size={17} /> Edit</Link>
            <button onClick={remove} className="btn-danger"><Trash2 size={17} /> Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}