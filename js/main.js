const expenseForm = document.getElementById("expense-form");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expensesList = document.getElementById("expenses");
const totalExpensesEl = document.getElementById("total-expenses");

let expenses = [];

expenseForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const expense = {
    name: expenseName.value,
    amount: parseFloat(expenseAmount.value)
  };
  expenses.push(expense);
  updateExpenses();
  expenseForm.reset();
});

function updateExpenses() {
  expensesList.innerHTML = "";
  let total = 0;
  expenses.forEach((expense, index) => {
    total += expense.amount;
    const li = document.createElement("li");
    li.innerHTML = `
      ${expense.name}: $${expense.amount.toFixed(2)}
      <button onclick="removeExpense(${index})">Delete</button>
    `;
    expensesList.appendChild(li);
  });
  totalExpensesEl.textContent = total.toFixed(2);
}

window.removeExpense = function(index) {
  expenses.splice(index, 1);
  updateExpenses();
}
