import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTransactions } from "../context/TransactionContext";

import {
  ArrowLeft,
  Pencil,
  Trash2,
} from "lucide-react";

import CategoryDropdown from "../components/CategoryDropdown";

function TransactionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    transactions,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();

  const transaction = transactions.find(
    (transaction) => transaction.id === Number(id)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/dashboard");
    }
  };

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center p-6 transition-colors">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-200 dark:border-gray-800 text-center transition-colors">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">
            Transaction not found
          </h2>

          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-purple-700 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setName(transaction.name);
    setCategory(transaction.category);
    setAmount(transaction.amount);
    setType(transaction.type);
    setDate(transaction.date);
    setNotes(transaction.notes || "");

    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert("Please enter a transaction name.");
      return;
    }
    if (!category) {
      alert("Please select a category.");
      return;
    }
    if (!type) {
      alert("Please select a transaction type.");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    if (!date) {
      alert("Please select a date.");
      return;
    }

    updateTransaction(transaction.id, {
      name,
      category,
      amount: Number(amount),
      type,
      date,
      notes,
    });

    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTransaction(transaction.id);
    navigate("/dashboard");
  };

  const formattedDate = new Date(
    transaction.date + "T00:00:00"
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex flex-col items-center pt-12 p-6 transition-colors">

      {/* Back Button */}
      <div className="w-full max-w-2xl mb-4">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      {/* Details Card */}
      <div className={`w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl p-8 border dark:border-gray-800 transition-colors ${
          isEditing ? "shadow-xl shadow-gray-200/50 dark:shadow-black/20 border-gray-200/80" : "shadow-sm border-gray-200"
      }`}>

        {/* VIEW MODE */}
        {!isEditing ? (
          <>
            {/* View Header */}
            <div className="border-b border-gray-200 dark:border-gray-800 pb-6 transition-colors">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 transition-colors">
                Transaction Details
              </p>

              <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
                  {transaction.name}
                </h1>

                <p
                  className={`text-2xl font-bold ${
                    transaction.type === "income"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  } transition-colors`}
                >
                  {transaction.type === "income" ? "+" : "-"}₱
                  {Number(transaction.amount).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            {/* Transaction Information */}
            <div className="py-6 space-y-5">
              {/* Category */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                  Category
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white transition-colors">
                  {transaction.category}
                </p>
              </div>

              {/* Date */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                  Date
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white transition-colors">
                  {formattedDate}
                </p>
              </div>

              {/* Type */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                  Type
                </p>
                <p
                  className={`text-sm font-semibold capitalize ${
                    transaction.type === "income"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  } transition-colors`}
                >
                  {transaction.type}
                </p>
              </div>
            </div>

            {/* Notes */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-6 transition-colors">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors">
                Notes
              </h3>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-800/80 transition-colors">
                <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap transition-colors">
                  {transaction.notes || "No notes added."}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-6 mt-6 transition-colors">
              <div className="flex gap-4">
                {/* Edit */}
                <button
                  onClick={handleEdit}
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-3.5 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Pencil size={18} />
                  Edit
                </button>

                {/* Delete */}
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 rounded-2xl shadow-lg shadow-red-500/20 transition-colors"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* EDIT MODE */}
            
            {/* Edit Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
                Edit Transaction
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors">
                Update your transaction details.
              </p>
            </div>

            <div className="space-y-6">
              {/* Income / Expense Toggle Slider (Moved above Name) */}
              <div className="flex bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl relative transition-colors">
                <button
                  type="button"
                  onClick={() => {
                    setType("expense");
                    setCategory("");
                  }}
                  className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 relative z-10 ${
                    type === "expense"
                      ? "text-red-600 dark:text-red-400 shadow-sm bg-white dark:bg-gray-900"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setType("income");
                    setCategory("");
                  }}
                  className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 relative z-10 ${
                    type === "income"
                      ? "text-green-600 dark:text-green-400 shadow-sm bg-white dark:bg-gray-900"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                >
                  Income
                </button>
              </div>

              {/* Transaction Name (Moved below Toggle) */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
                  Transaction Name
                </label>
                <input
                  type="text"
                  value={name}
                  placeholder="e.g. Groceries"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 dark:border-gray-700 px-4 py-3.5 outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-transparent transition-colors"
                  required
                />
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  placeholder="0.00"
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 dark:border-gray-700 px-4 py-3.5 outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-transparent transition-colors"
                  required
                />
              </div>

              {/* Category & Date Side by Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category Dropdown */}
                <div>
                  <CategoryDropdown
                    type={type}
                    category={category}
                    setCategory={setCategory}
                  />
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-2xl border border-gray-300 dark:border-gray-700 px-4 py-3.5 outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white bg-transparent dark:[color-scheme:dark] transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
                  Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Add a note about this transaction..."
                  className="w-full rounded-2xl border border-gray-300 dark:border-gray-700 px-4 py-3.5 outline-none resize-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-transparent transition-colors"
                />
              </div>
            </div>

            {/* Save / Cancel Buttons */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-6 mt-6 transition-colors">
              <div className="flex gap-4">
                {/* Cancel */}
                <button
                  onClick={handleCancel}
                  className="flex-1 text-center border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-3.5 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
                >
                  Cancel
                </button>

                {/* Save */}
                <button
                  onClick={handleSave}
                  className="flex-1 bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-semibold py-3.5 rounded-2xl shadow-lg shadow-purple-500/30 transition-all flex items-center justify-center"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm p-6 transition-colors">
          <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-gray-800 transition-colors">
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/20 mb-4 transition-colors">
              <Trash2
                size={22}
                className="text-red-600 dark:text-red-400 transition-colors"
              />
            </div>

            {/* Title */}
            <h2 className="text-lg font-bold text-gray-900 dark:text-white transition-colors">
              Delete Transaction?
            </h2>

            {/* Message */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 transition-colors">
              Are you sure you want to delete "{transaction.name}"? This action cannot be undone.
            </p>

            {/* Modal Buttons */}
            <div className="flex gap-3 mt-6">
              {/* Cancel */}
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>

              {/* Confirm Delete */}
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-red-500/20 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionDetails;