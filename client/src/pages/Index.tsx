import { useState } from "react";
import { trpc } from "../util/trpc.ts";

const Index = () => {
	const { data, isLoading, error, refetch } = trpc.expenses.list.useQuery();
	const updateExpense = trpc.expenses.update.useMutation({
		onSuccess: () => {
			refetch();
		},
	});
	const deleteExpense = trpc.expenses.delete.useMutation({
		onSuccess: () => {
			refetch();
		},
	});

	const [editingId, setEditingId] = useState<string | null>(null);
	const [editForm, setEditForm] = useState({
		description: "",
		amount: 0,
		interval: "monthly" as "yearly" | "monthly" | "weekly" | "custom",
		date: "",
		customIntervalDays: undefined as number | undefined,
	});

	const handleEdit = (expense: any) => {
		setEditingId(expense.id);
		setEditForm({
			description: expense.description,
			amount: expense.amount,
			interval: expense.interval,
			date: expense.date,
			customIntervalDays: expense.customIntervalDays,
		});
	};

	const handleSave = () => {
		if (!editingId) return;
		
		const updateData: any = {
			description: editForm.description,
			amount: editForm.amount,
			interval: editForm.interval,
			date: editForm.date,
		};

		if (editForm.interval === "custom" && editForm.customIntervalDays) {
			updateData.customIntervalDays = editForm.customIntervalDays;
		}

		updateExpense.mutate({
			id: editingId,
			data: updateData,
		});
		setEditingId(null);
	};

	const handleCancel = () => {
		setEditingId(null);
	};

	const handleDelete = (id: string, description: string) => {
		if (confirm(`Are you sure you want to delete "${description}"?`)) {
			deleteExpense.mutate(id);
		}
	};

	return (
		<div style={{ padding: "20px" }}>
			<h1>Expenses</h1>
			{isLoading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			{data && (
				<div>
					{data.map((expense) => (
						<div key={expense.id} style={{ 
							border: "1px solid #ccc", 
							padding: "10px", 
							margin: "10px 0",
							borderRadius: "5px"
						}}>
							{editingId === expense.id ? (
								<div>
									<div style={{ marginBottom: "10px" }}>
										<label>Description: </label>
										<input
											type="text"
											value={editForm.description}
											onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
											style={{ marginLeft: "10px", padding: "5px" }}
										/>
									</div>
									<div style={{ marginBottom: "10px" }}>
										<label>Amount: </label>
										<input
											type="number"
											value={editForm.amount}
											onChange={(e) => setEditForm(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
											style={{ marginLeft: "10px", padding: "5px" }}
										/>
									</div>
									<div style={{ marginBottom: "10px" }}>
										<label>Interval: </label>
										<select
											value={editForm.interval}
											onChange={(e) => setEditForm(prev => ({ ...prev, interval: e.target.value as any }))}
											style={{ marginLeft: "10px", padding: "5px" }}
										>
											<option value="yearly">Yearly</option>
											<option value="monthly">Monthly</option>
											<option value="weekly">Weekly</option>
											<option value="custom">Custom</option>
										</select>
									</div>
									{editForm.interval === "custom" && (
										<div style={{ marginBottom: "10px" }}>
											<label>Custom Interval Days: </label>
											<input
												type="number"
												value={editForm.customIntervalDays || ""}
												onChange={(e) => setEditForm(prev => ({ ...prev, customIntervalDays: parseInt(e.target.value) || undefined }))}
												style={{ marginLeft: "10px", padding: "5px" }}
											/>
										</div>
									)}
									<div style={{ marginBottom: "10px" }}>
										<label>Date: </label>
										<input
											type="date"
											value={editForm.date}
											onChange={(e) => setEditForm(prev => ({ ...prev, date: e.target.value }))}
											style={{ marginLeft: "10px", padding: "5px" }}
										/>
									</div>
									<button 
										onClick={handleSave}
										style={{ 
											backgroundColor: "#28a745", 
											color: "white", 
											padding: "5px 10px", 
											border: "none", 
											borderRadius: "3px",
											marginRight: "10px"
										}}
									>
										Save
									</button>
									<button 
										onClick={handleCancel}
										style={{ 
											backgroundColor: "#6c757d", 
											color: "white", 
											padding: "5px 10px", 
											border: "none", 
											borderRadius: "3px"
										}}
									>
										Cancel
									</button>
								</div>
							) : (
								<div>
									<div style={{ marginBottom: "10px" }}>
										<strong>{expense.description}</strong> - ${expense.amount}
										<br />
										<small>Interval: {expense.interval}{expense.customIntervalDays ? ` (${expense.customIntervalDays} days)` : ""}</small>
										<br />
										<small>Date: {expense.date}</small>
									</div>
									<button 
										onClick={() => handleEdit(expense)}
										style={{ 
											backgroundColor: "#007bff", 
											color: "white", 
											padding: "5px 10px", 
											border: "none", 
											borderRadius: "3px",
											marginRight: "10px"
										}}
									>
										Edit
									</button>
									<button 
										onClick={() => handleDelete(expense.id, expense.description)}
										style={{ 
											backgroundColor: "#dc3545", 
											color: "white", 
											padding: "5px 10px", 
											border: "none", 
											borderRadius: "3px"
										}}
									>
										Delete
									</button>
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Index;
