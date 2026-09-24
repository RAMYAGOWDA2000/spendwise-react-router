# SpendWise — React Router + Tailwind CRUD

SpendWise is a small real-world expense-tracking application built for practicing React, React Router, Tailwind CSS, CRUD operations, forms, and browser LocalStorage.

## Features

- Dashboard with spending summary
- Expense listing
- Add expense
- Edit expense
- Delete expense
- Expense details
- Search and category filtering
- Reports with category breakdown
- Responsive sidebar/navigation
- 404 page
- LocalStorage persistence
- No Bootstrap
- No separate CSS framework
- Tailwind CSS styling

## Technologies

- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Lucide React icons
- JavaScript
- LocalStorage

## React Router Concepts

The project demonstrates:

- `BrowserRouter`
- `Routes`
- `Route`
- `Link`
- `NavLink`
- `useParams`
- `useNavigate`
- Dynamic routes
- Nested route structure
- Catch-all 404 route

## Routes

| Route | Purpose |
|---|---|
| `/` | Dashboard |
| `/expenses` | Expense list |
| `/expenses/new` | Add expense |
| `/expenses/:id` | Expense details |
| `/expenses/:id/edit` | Edit expense |
| `/reports` | Reports |
| `*` | Not Found |

## Installation

```bash
npm install
```

## Run

```bash
npm run dev
```

Open the local URL shown by Vite, normally:

```text
http://localhost:5173
```

## Production Build

```bash
npm run build
npm run preview
```

## CRUD

### Create
Use **Add Expense** to create an expense.

### Read
Use **Expenses** to browse expenses and open individual details.

### Update
Open an expense and choose **Edit**.

### Delete
Delete an expense from the list or detail page.

## Persistence

Expenses are stored in browser `localStorage`, so refreshing the page does not remove them. There is no backend database in this learning project.

## Project Structure

```text
spendwise-react-router/
├── src/
│   ├── components/
│   │   └── AppLayout.jsx
│   ├── context/
│   │   └── ExpenseContext.jsx
│   ├── data/
│   │   └── seedExpenses.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── ExpenseDetails.jsx
│   │   ├── ExpenseForm.jsx
│   │   ├── Expenses.jsx
│   │   ├── NotFound.jsx
│   │   └── Reports.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Future Enhancements

- Authentication
- Backend API
- Database integration
- User accounts
- Budgets
- Monthly analytics
- Charts
- CSV export/import
- Cloud synchronization
- Dark mode
