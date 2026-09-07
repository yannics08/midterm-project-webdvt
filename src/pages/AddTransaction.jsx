import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTransactions } from "../context/TransactionContext";
import CategoryDropdown from "../components/CategoryDropdown";

function AddTransaction() {
    const { addTransaction } = useTransactions();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        amount: "",
        type: "expense", // Default to expense
        date: "",
        notes: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleTypeSwitch = (type) => {
        setFormData((prev) => ({
            ...prev,
            type,
            category: "", // Reset category when switching type since lists differ
        }));
        if (errors.category) {
            setErrors((prev) => ({ ...prev, category: "" }));
        }
        if (errors.type) {
            setErrors((prev) => ({ ...prev, type: "" }));
        }
    };

    const validate = () => {
        const validationErrors = {};
        if (!formData.name.trim()) validationErrors.name = "Transaction name is required.";
        if (!formData.category) validationErrors.category = "Please select a category.";
        if (!formData.amount) validationErrors.amount = "Amount is required.";
        else if (Number(formData.amount) <= 0) validationErrors.amount = "Amount must be greater than 0.";
        if (!formData.date) validationErrors.date = "Please select a date.";
        return validationErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        addTransaction({
            ...formData,
            amount: Number(formData.amount),
        });
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex flex-col items-center justify-center p-6 transition-colors">
            <form
                onSubmit={handleSubmit}
                noValidate
                className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-200/80 dark:border-gray-800 space-y-6 transition-colors"
            >
                {/* Header */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
                        Add Transaction
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors">
                        Record a new income or expense.
                    </p>
                </div>

                {/* Income / Expense Toggle Slider */}
                <div className="flex bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl relative transition-colors">
                    <button
                        type="button"
                        onClick={() => handleTypeSwitch("expense")}
                        className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 relative z-10 ${
                            formData.type === "expense"
                                ? "text-red-600 dark:text-red-400 shadow-sm bg-white dark:bg-gray-900"
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        }`}
                    >
                        Expense
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTypeSwitch("income")}
                        className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 relative z-10 ${
                            formData.type === "income"
                                ? "text-green-600 dark:text-green-400 shadow-sm bg-white dark:bg-gray-900"
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        }`}
                    >
                        Income
                    </button>
                </div>

                {/* Transaction Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
                        Transaction Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="e.g. Groceries"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full rounded-2xl border px-4 py-3.5 outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-transparent transition-colors ${
                            errors.name
                                ? "border-red-500 bg-red-50/50 dark:bg-red-500/10"
                                : "border-gray-300 dark:border-gray-700"
                        }`}
                    />
                    {errors.name && (
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Amount */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
                        Amount
                    </label>
                    <input
                        type="number"
                        name="amount"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={handleChange}
                        className={`w-full rounded-2xl border px-4 py-3.5 outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-transparent transition-colors ${
                            errors.amount
                                ? "border-red-500 bg-red-50/50 dark:bg-red-500/10"
                                : "border-gray-300 dark:border-gray-700"
                        }`}
                    />
                    {errors.amount && (
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                            {errors.amount}
                        </p>
                    )}
                </div>

                {/* Category & Date Side by Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Category Dropdown */}
                    <div>
                        <CategoryDropdown
                            type={formData.type}
                            category={formData.category}
                            setCategory={(category) => {
                                setFormData((prev) => ({ ...prev, category }));
                                if (errors.category) setErrors((prev) => ({ ...prev, category: "" }));
                            }}
                        />
                        {errors.category && (
                            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                {errors.category}
                            </p>
                        )}
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
                            Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className={`w-full rounded-2xl border px-4 py-3.5 outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white bg-transparent dark:[color-scheme:dark] transition-colors ${
                                errors.date
                                    ? "border-red-500 bg-red-50/50 dark:bg-red-500/10"
                                    : "border-gray-300 dark:border-gray-700"
                            }`}
                        />
                        {errors.date && (
                            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                {errors.date}
                            </p>
                        )}
                    </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
                        Notes (Optional)
                    </label>
                    <textarea
                        name="notes"
                        placeholder="Add a note about this transaction..."
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        className={`w-full rounded-2xl border px-4 py-3.5 outline-none resize-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-transparent transition-colors ${
                            errors.notes
                                ? "border-red-500 bg-red-50/50 dark:bg-red-500/10"
                                : "border-gray-300 dark:border-gray-700"
                        }`}
                    />
                    {errors.notes && (
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                            {errors.notes}
                        </p>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-2">
                    <Link
                        to="/dashboard"
                        className="flex-1 text-center border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-3.5 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="flex-1 bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-semibold py-3.5 rounded-2xl shadow-lg shadow-purple-500/30 transition-all flex items-center justify-center"
                    >
                        Add Transaction
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddTransaction;