import { saveExpenses, loadExpenses } from "./storage.js";
import { renderExpenses, renderSummary, renderChart } from "./ui.js";

// DOM Elements
const expenseForm = document.getElementById("expense-form");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const categorySelect = document.getElementById("expense-category");
const expensesList = document.getElementById("expenses");
const totalExpensesEl = document.getElementById("total-expenses");
const totalItemsEl = document.getElementById("total-items");
const avgExpenseEl = document.getElementById("avg-expense");
const categoryChartEl = document.getElementById("category-chart");
const filterCategory = document.getElementById("filter-category");
const editModal = document.getElementById("edit-modal");
const editForm = document.getElementById("edit-form");
const editNameInput = document.getElementById("edit-name");
const editAmountInput = document.getElementById("edit-amount");
const editCategorySelect = document.getElementById("edit-category");
const modalCloseBtn = document.getElementById("modal-close-btn");

// State
let expenses = loadExpenses();
let editingIndex = null;

// Fetch categories from data.json and populate dropdowns
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const categoryEmojis = {
      "Food": "🍔",
      "Transport": "🚗",
      "Entertainment": "🎬",
      "Bills": "📱",
      "Shopping": "🛍️",
      "Other": "📦"
    };

    data.categories.forEach(cat => {
      // Add to main form
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = `${categoryEmojis[cat] || ""} ${cat}`;
      categorySelect.appendChild(option);

      // Add to filter
      const filterOption = document.createElement("option");
      filterOption.value = cat;
      filterOption.textContent = `${categoryEmojis[cat] || ""} ${cat}`;
      filterCategory.appendChild(filterOption);

      // Add to edit form
      const editOption = document.createElement("option");
      editOption.value = cat;
      editOption.textContent = `${categoryEmojis[cat] || ""} ${cat}`;
      editCategorySelect.appendChild(editOption);
    });
  })
  .catch(err => {
    console.error("Failed to load categories:", err);
    // Fallback categories
    const fallbackCategories = ["Food", "Transport", "Entertainment", "Bills", "Shopping", "Other"];
    fallbackCategories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categorySelect.appendChild(option);

      const filterOption = document.createElement("option");
      filterOption.value = cat;
      filterOption.textContent = cat;
      filterCategory.appendChild(filterOption);

      const editOption = document.createElement("option");
      editOption.value = cat;
      editOption.textContent = cat;
      editCategorySelect.appendChild(editOption);
    });
  });

// Render all UI elements
function render() {
  const filter = filterCategory.value;
  renderExpenses(expenses, expensesList, filter);
  renderSummary(expenses, totalExpensesEl, totalItemsEl, avgExpenseEl);
  renderChart(expenses, categoryChartEl);
}

// Add new expense
expenseForm.addEventListener("submit", e => {
  e.preventDefault();
  
  const expense = {
    name: nameInput.value.trim(),
    amount: parseFloat(amountInput.value),
    category: categorySelect.value,
    date: new Date().toLocaleDateString()
  };

  if (!expense.name || isNaN(expense.amount) || !expense.category) {
    alert("Please fill out all fields correctly.");
    return;
  }

  expenses.push(expense);
  saveExpenses(expenses);
  render();
  expenseForm.reset();
});

// Handle delete and edit clicks (event delegation)
expensesList.addEventListener("click", e => {
  const index = parseInt(e.target.dataset.index);
  
  if (e.target.classList.contains("delete-btn")) {
    if (confirm("Are you sure you want to delete this expense?")) {
      expenses.splice(index, 1);
      saveExpenses(expenses);
      render();
    }
  }
  
  if (e.target.classList.contains("btn-edit")) {
    openEditModal(index);
  }
});

// Open edit modal
function openEditModal(index) {
  editingIndex = index;
  const expense = expenses[index];
  
  editNameInput.value = expense.name;
  editAmountInput.value = expense.amount;
  editCategorySelect.value = expense.category;
  
  editModal.classList.add("active");
}

// Close edit modal
function closeEditModal() {
  editModal.classList.remove("active");
  editingIndex = null;
  editForm.reset();
}

// Close modal button
modalCloseBtn.addEventListener("click", closeEditModal);

// Save edited expense
editForm.addEventListener("submit", e => {
  e.preventDefault();
  
  expenses[editingIndex] = {
    name: editNameInput.value.trim(),
    amount: parseFloat(editAmountInput.value),
    category: editCategorySelect.value,
    date: expenses[editingIndex].date // Keep original date
  };
  
  saveExpenses(expenses);
  render();
  closeEditModal();
});

// Filter change
filterCategory.addEventListener("change", render);

// Close modal on outside click
editModal.addEventListener("click", e => {
  if (e.target === editModal) {
    closeEditModal();
  }
});

// Initial render
render();