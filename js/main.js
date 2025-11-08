import { saveExpenses, loadExpenses } from "./storage.js";
import { renderExpenses } from "./ui.js";

const expenseForm = document.getElementById("expense-form");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const categorySelect = document.getElementById("expense-category");
const expensesList = document.getElementById("expenses");
const totalExpensesEl = document.getElementById("total-expenses");

let expenses = loadExpenses();

// Fetch categories from data.json
fetch("../data.json")
  .then(res => res.json())
  .then(data => {
    data.categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categorySelect.appendChild(option);
    });
  });

// Initial render
renderExpenses(expenses, expensesList, totalExpensesEl);

// Handle new expense
expenseForm.addEventListener("submit", e => {
  e.preventDefault();
  const expense = {
    name: nameInput.value.trim(),
    amount: parseFloat(amountInput.value),
    category: categorySelect.value
  };

  if (!expense.name || isNaN(expense.amount) || !expense.category) {
    alert("Please fill out all fields correctly.");
    return;
  }

  expenses.push(expense);
  saveExpenses(expenses);
  renderExpenses(expenses, expensesList, totalExpensesEl);
  expenseForm.reset();
});

// Handle delete (event delegation)
expensesList.addEventListener("click", e => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.dataset.index;
    expenses.splice(index, 1);
    saveExpenses(expenses);
    renderExpenses(expenses, expensesList, totalExpensesEl);
  }
});
