import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { seedExpenses } from "../data/seedExpenses";

const ExpenseContext = createContext(null);
const STORAGE_KEY = "spendwise-expenses";

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : seedExpenses;
    } catch {
      return seedExpenses;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses((current) => [
      { ...expense, id: crypto.randomUUID?.() || String(Date.now()) },
      ...current,
    ]);
  };

  const updateExpense = (id, updates) => {
    setExpenses((current) =>
      current.map((expense) =>
        expense.id === id ? { ...expense, ...updates } : expense
      )
    );
  };

  const deleteExpense = (id) => {
    setExpenses((current) => current.filter((expense) => expense.id !== id));
  };

  const resetExpenses = () => setExpenses(seedExpenses);

  const value = useMemo(
    () => ({ expenses, addExpense, updateExpense, deleteExpense, resetExpenses }),
    [expenses]
  );

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (!context) throw new Error("useExpenses must be used inside ExpenseProvider");
  return context;
}