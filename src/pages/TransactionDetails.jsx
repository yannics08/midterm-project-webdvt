import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTransactions } from "../context/TransactionContext";

import {
  ArrowLeft,
  Pencil,
  Trash2,
} from "lucide-react";

import CategoryDropdown from "../components/CategoryDropdown";
import TypeDropdown from "../components/TypeDropdown";

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

  // Go back to wherever the user came from (Summary, Dashboard, etc.),
  // falling back to Dashboard if there's no previous page in history
  // (e.g. the page was opened directly via a link or refresh).
  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/dashboard");
    }
  };

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center">
          <h2 className="text-xl font-bold text-gray-900">
            Transaction not found
          </h2>

          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-purple-700 hover:text-purple-800"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>
      </div>
    );
  }

  // Start editing
  const handleEdit = () => {
    setName(transaction.name);
    setCategory(transaction.category);
    setAmount(transaction.amount);
    setType(transaction.type);
    setDate(transaction.date);
    setNotes(transaction.notes || "");

    setIsEditing(true);
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Save edited transaction
  const handleSave = () => {
    if (!category) {
      alert("Please select a category.");
      return;
    }

    if (!type) {
      alert("Please select a transaction type.");
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

  // Delete transaction
  const handleDelete = () => {
    deleteTransaction(transaction.id);
    navigate("/dashboard");
  };

  // Format date
  const formattedDate = new Date(
    transaction.date + "T00:00:00"
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-12 p-6">

      {/* Back Button */}
      <div className="w-full max-w-2xl mb-4">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-purple-700 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      {/* Details Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-sm border border-gray-200">

        {/* Header */}
        <div className="border-b border-gray-200 pb-6">

          <p className="text-sm text-gray-500 mb-2">
            Transaction Details
          </p>

          {!isEditing ? (
            <div className="flex items-center justify-between gap-4">

              <h1 className="text-2xl font-bold text-gray-900">
                {transaction.name}
              </h1>

              <p
                className={`text-2xl font-bold ${
                  transaction.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}₱
                {Number(transaction.amount).toLocaleString()}
              </p>

            </div>
          ) : (
            <div className="space-y-2">

              <label className="text-sm font-medium text-gray-700">
                Transaction Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              />

            </div>
          )}

        </div>

        {/* VIEW MODE */}
        {!isEditing ? (
          <>
            {/* Transaction Information */}
            <div className="py-6 space-y-5">

              {/* Category */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Category
                </p>

                <p className="text-sm font-semibold text-gray-900">
                  {transaction.category}
                </p>
              </div>

              {/* Date */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Date
                </p>

                <p className="text-sm font-semibold text-gray-900">
                  {formattedDate}
                </p>
              </div>

              {/* Type */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Type
                </p>

                <p
                  className={`text-sm font-semibold capitalize ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type}
                </p>
              </div>

            </div>

            {/* Notes */}
            <div className="border-t border-gray-200 pt-6">

              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Notes
              </h3>

              <div className="bg-gray-50 rounded-xl p-4">

                <p className="text-sm text-gray-600 whitespace-pre-wrap">
                  {transaction.notes || "No notes added."}
                </p>

              </div>

            </div>

            {/* Action Buttons */}
            <div className="border-t border-gray-200 pt-6 mt-6">

              <div className="flex gap-3">

                {/* Edit */}
                <button
                  onClick={handleEdit}
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-100 transition"
                >
                  <Pencil size={18} />
                  Edit
                </button>

                {/* Delete */}
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white font-semibold py-3 rounded-xl hover:bg-red-700 transition"
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
            <div className="py-6 space-y-5">

              {/* Category + Type */}
              <div className="grid grid-cols-2 gap-4">

                <CategoryDropdown
                  category={category}
                  setCategory={setCategory}
                />

                <TypeDropdown
                  type={type}
                  setType={setType}
                />

              </div>

              {/* Amount + Date */}
              <div className="grid grid-cols-2 gap-4">

                {/* Amount */}
                <div className="space-y-2">

                  <label className="text-sm font-medium text-gray-700">
                    Amount
                  </label>

                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                  />

                </div>

                {/* Date — standard HTML5 date picker */}
                <div className="space-y-2">

                  <label className="text-sm font-medium text-gray-700">
                    Date
                  </label>

                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                  />

                </div>

              </div>

              {/* Notes */}
              <div className="space-y-2">

                <label className="text-sm font-medium text-gray-700">
                  Notes
                </label>

                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Add a note about this transaction..."
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />

              </div>

            </div>

            {/* Save / Cancel Buttons */}
            <div className="border-t border-gray-200 pt-6">

              <div className="flex gap-3">

                {/* Cancel */}
                <button
                  onClick={handleCancel}
                  className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                {/* Save */}
                <button
                  onClick={handleSave}
                  className="flex-1 bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-xl transition"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">

          <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl">

            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
              <Trash2
                size={22}
                className="text-red-600"
              />
            </div>

            {/* Title */}
            <h2 className="text-lg font-bold text-gray-900">
              Delete Transaction?
            </h2>

            {/* Message */}
            <p className="text-sm text-gray-500 mt-2">
              Are you sure you want to delete "{transaction.name}"?
              This action cannot be undone.
            </p>

            {/* Modal Buttons */}
            <div className="flex gap-3 mt-6">

              {/* Cancel */}
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              {/* Confirm Delete */}
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white font-semibold py-3 rounded-xl hover:bg-red-700 transition"
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