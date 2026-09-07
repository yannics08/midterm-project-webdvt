import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Summary from "./pages/Summary";
import AddTransaction from "./pages/AddTransaction";
import TransactionDetails from "./pages/TransactionDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors">
        <Sidebar />

        <main className="ml-64 flex-1 p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/add-transaction" element={<AddTransaction />} />
            <Route
              path="/transactions/:id"
              element={<TransactionDetails />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;