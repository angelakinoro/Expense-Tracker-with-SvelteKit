# Expense Tracker (SvelteKit)

A simple yet powerful **Expense Tracker** built with **SvelteKit** and **TypeScript**.
It allows users to record, filter, and analyze their spending — all stored locally in the browser using **localStorage**.

---

## Features

* **Add and manage expenses** — track your spending by amount, category, and description.
* **Automatic data persistence** — expenses are saved in your browser’s localStorage.
* **Dynamic filtering** — view expenses by category or see all at once.
* **Real-time totals** — total expenses and category breakdown update automatically.
* **Clean UI** — responsive interface styled with Tailwind CSS.

---

## How It Works

1. **Add a new expense** by entering the amount, category, and a short description.
2. When you click **Add Expense**, the app creates a new expense object with:

   * a unique `id`
   * an ISO `date`
   * the selected `category`
   * and the `amount`
3. Expenses are stored in `localStorage`, so your data remains even after refreshing the page.
4. Computed values (like totals) are handled reactively using Svelte’s `$:` syntax — they automatically update whenever the data changes.

---

## Key Files

| File                      | Purpose                                                        |
| ------------------------- | -------------------------------------------------------------- |
| `src/lib/types.ts`        | Defines the `Expense` interface and available `categories`.    |
| `src/routes/+page.svelte` | The main component for adding, viewing, and deleting expenses. |
| `src/app.css`             | Global styles (Tailwind CSS included).                         |

---

## Technologies Used

* **SvelteKit** — framework for reactive, full-stack apps
* **TypeScript** — type safety and cleaner code
* **Tailwind CSS** — modern utility-first styling
* **localStorage API** — client-side persistence

---

## Running the Project Locally

Make sure you have **Node.js (v18+)** installed.

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/expense-tracker-svelte.git
cd expense-tracker-svelte

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

The app will be live at **[http://localhost:5173](http://localhost:5173)** (or as shown in your terminal).


## Author

**Angela Kinoro**
Built using SvelteKit.

---

## Future Improvements

* Connect to a real database (e.g., Supabase or Firebase)
* Add charts for expense trends
* User authentication and multi-user support
