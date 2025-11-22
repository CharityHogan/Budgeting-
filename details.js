import { loadExpenses } from "./storage.js";

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
const detailContent = document.getElementById("detail-content");

const expenses = loadExpenses();

if (isNaN(id) || id < 0 || id >= expenses.length) {
  detailContent.innerHTML = `
    <div class="error">
      <strong>Error:</strong> Invalid expense ID. This expense may have been deleted.
    </div>
    <p style="margin-top: 1rem; text-align: center;">
      <a href="index.html" style="color: #667eea; font-weight: 600;">Return to Dashboard</a>
    </p>
  `;
} else {
  const expense = expenses[id];
  detailContent.innerHTML = `
    <div class="detail-card">
      <div class="detail-header">
        <h2>${expense.name}</h2>
        <div class="category-badge">${expense.category}</div>
      </div>
      
      <div class="detail-amount">$${expense.amount.toFixed(2)}</div>
      
      <div class="detail-grid">
        <div class="detail-item">
          <div class="detail-label">Category</div>
          <div class="detail-value">${expense.category}</div>
        </div>
        
        <div class="detail-item">
          <div class="detail-label">Date Added</div>
          <div class="detail-value">${expense.date || new Date().toLocaleDateString()}</div>
        </div>
        
        <div class="detail-item">
          <div class="detail-label">Amount</div>
          <div class="detail-value">$${expense.amount.toFixed(2)}</div>
        </div>
      </div>
    </div>
  `;
}