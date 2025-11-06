<script lang="ts">
  import { onMount } from 'svelte';
  import type { Expense } from '$lib/types';
  import { categories } from '$lib/types';

  let expenses: Expense[] = [];
  let amount: number | '' = '';
  let category = '';
  let description = '';
  let filterCategory = 'All';

  // Load expenses from localStorage on mount
  onMount(() => {
    const stored = localStorage.getItem('expenses');
    if (stored) {
      expenses = JSON.parse(stored);
    }
  });

  // Save to localStorage whenever expenses change
  $: if (typeof window !== 'undefined') {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  function addExpense() {
    if (amount === '' || amount <= 0 || !description.trim()) {
      alert('Please fill in all fields with valid values');
      return;
    }

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      amount: Number(amount),
      category,
      description: description.trim(),
      date: new Date().toISOString()
    };

    expenses = [newExpense, ...expenses];
    
    // Reset form
    amount = '';
    category = '';
    description = '';
  }


  // Computed values
  $: filteredExpenses = filterCategory === 'All' 
    ? expenses 
    : expenses.filter(e => e.category === filterCategory);

  $: totalAmount = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  $: categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  }

  function formatCurrency(amount: number): string {
    return `Ksh ${amount.toFixed(2)}`;
  }
</script>

<div class="min-h-screen bg-white py-8 px-4">
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <header class="text-center text-gray-800 mb-8">
      <h1 class="text-5xl font-bold mb-2"> Expense Tracker</h1>
      <p class="text-xl opacity-90">Track your spending with ease</p>
    </header>

    <!-- Add Expense Form -->
    <section class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Add New Expense</h2>
      <form on:submit|preventDefault={addExpense}>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label for="amount" class="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <input 
              id="amount"
              type="number" 
              bind:value={amount}
              placeholder="0.00"
              min="0"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition"
            />
          </div>
          
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select 
              id="category" 
              bind:value={category}
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition"
            >
              {#each categories as cat}
                <option value={cat}>{cat}</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <input 
            id="description"
            type="text" 
            bind:value={description}
            placeholder="What did you spend on?"
            class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition"
          />
        </div>

        <button 
          type="submit" 
          class="w-full bg-linear-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all shadow-md hover:shadow-xl"
        >
          Add Expense
        </button>
      </form>
    </section>

    <!-- Summary Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- Total Expenses Card -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
          Total Expenses
        </h3>
        <p class="text-4xl font-bold text-purple-600">
          {formatCurrency(totalAmount)}
        </p>
      </div>

      <!-- Category Breakdown Card -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
          Category Breakdown
        </h3>
        <div class="space-y-2 max-h-40 overflow-y-auto">
          {#each Object.entries(categoryTotals) as [cat, total]}
            <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
              <span class="text-gray-700">{cat}</span>
              <span class="font-semibold text-purple-600">{formatCurrency(total)}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Expenses List -->
    <section class="bg-white rounded-xl shadow-md p-6">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h2 class="text-2xl font-bold text-gray-800">Recent Expenses</h2>
        <div class="flex items-center gap-2">
          <label for="filter" class="text-sm font-medium text-gray-700">
            Filter:
          </label>
          <select 
            id="filter" 
            bind:value={filterCategory}
            class="px-3 py-1.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition text-sm"
          >
            <option value="All">All Categories</option>
            {#each categories as cat}
              <option value={cat}>{cat}</option>
            {/each}
          </select>
        </div>
      </div>

      {#if filteredExpenses.length === 0}
        <p class="text-center text-gray-500 py-12 italic">
          No expenses yet. Add your first expense above!
        </p>
      {:else}
        <div class="space-y-3">
          {#each filteredExpenses as expense (expense.id)}
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group">
              <div class="flex-1">
                <div class="flex justify-between items-start mb-2">
                  <span class="font-semibold text-gray-800">{expense.description}</span>
                  <span class="text-lg font-bold text-purple-600 ml-4">
                    {formatCurrency(expense.amount)}
                  </span>
                </div>
                <div class="flex gap-3 text-sm">
                  <span class="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                    {expense.category}
                  </span>
                  <span class="text-gray-500">{formatDate(expense.date)}</span>
                </div>
              </div>
             
            </div>
          {/each}
        </div>
      {/if}
    </section>
  </div>
</div>