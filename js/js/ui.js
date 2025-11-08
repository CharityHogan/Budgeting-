// Handles rendering and UI updates
export function renderExpenses(expenses, listEl, totalEl) {
  listEl.innerHTML = "";
  let total = 0;

  expenses.forEach((expense, index) => {
    total += expense.amount;
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${expense.name} ($${expense.amount.toFixed(2)}) - <em>${expense.category}</em></span>
      <div>
        <a href="details.html?id=${index}" class="view-link">View</a>
        <button class="delete-btn" data-index="${index}">Delete</button>
      </div>
    `;
    listEl.appendChild(li);
  });

  totalEl.textContent = total.toFixed(2);
}
