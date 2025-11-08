import { loadExpenses } from "./storage.js";

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
const detailContent = document.getElementById("detail-content");

const expenses = loadExpenses();

if (isNaN(id) || id < 0 || id >= expenses.length) {
  detailContent.innerHTML = "<p>Invalid expense ID.</p>";
} else {
  const expense = expenses[id];
  detailContent.innerHTML = `
    <h2>${expense.name}</h2>
    <p><strong>Amount:</strong> $${expense.amount.toFixed(2)}</p>
    <p><strong>Category:</strong> ${expense.category}</p>
    <p><strong>Date Added:</strong> ${new Date().toLocaleDateString()}</p>
  `;
}
