import { trpc } from "../util/trpc.ts";

const Index = () => {
  const { data, isLoading, error } = trpc.expenses.list.useQuery();

  return (
    <div>
      <h1>Expenses</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul>
          {data.map((expense) => (
            <li key={expense.id}>
              {expense.description} - {expense.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Index;
