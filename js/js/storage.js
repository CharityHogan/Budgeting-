// Handles saving and loading data from localStorage
export function saveExpenses(expenses) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

export function loadExpenses() {
  const stored = localStorage.getItem("expenses");
  return stored ? JSON.parse(stored) : [];
}
