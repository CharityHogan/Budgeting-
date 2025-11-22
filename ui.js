// Handles rendering and UI updates

export function renderExpenses(expenses, listEl, filterCategory = '') {
  const filtered = filterCategory ? 
    expenses.filter(e => e.category === filterCategory) : 
    expenses;

  if (filtered.length === 0) {
    listEl.innerHTML = `
      <div class="empty-state">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
        <p>No expenses yet. Add your first expense above!</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = filtered.map((expense, index) => {
    const actualIndex = expenses.indexOf(expense);
    return `
      <li class="expense-item">
        <div class="expense-info">
          <div class="expense-name">${expense.name}</div>
          <div class="expense-meta">
            <span class="category-badge">${expense.category}</span>
            <span style="margin-left: 0.5rem;">${expense.date}</span>
          </div>
        </div>
        <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
        <div class="expense-actions">
          <a href="details.html?id=${actualIndex}" class="view-link">View</a>
          <button class="btn-small btn-edit" data-index="${actualIndex}">Edit</button>
          <button class="btn-small btn-delete" data-index="${actualIndex}">Delete</button>
        </div>
      </li>
    `;
  }).join('');
}

export function renderSummary(expenses, totalEl, itemsEl, avgEl) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const count = expenses.length;
  const average = count > 0 ? total / count : 0;

  totalEl.textContent = total.toFixed(2);
  itemsEl.textContent = count;
  avgEl.textContent = average.toFixed(2);
}

export function renderChart(expenses, chartEl) {
  const categoryTotals = {};

  expenses.forEach(expense => {
    categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
  });

  const maxAmount = Math.max(...Object.values(categoryTotals), 1);

  if (Object.keys(categoryTotals).length === 0) {
    chartEl.innerHTML = '<div class="empty-state" style="width: 100%;"><p>No data to display</p></div>';
    return;
  }

  chartEl.innerHTML = Object.entries(categoryTotals).map(([category, amount]) => {
    const height = (amount / maxAmount) * 100;
    return `
      <div class="chart-bar">
        <div class="bar-amount">$${amount.toFixed(0)}</div>
        <div class="bar" style="height: ${height}%"></div>
        <div class="bar-label">${category}</div>
      </div>
    `;
  }).join('');
}