import { todos } from "./actions";
import { TodoForm } from "./todo-form";

export const dynamic = 'force-dynamic';

export default async function TodoPage() {
  const todoList = await todos();

  return (
    <div>
      <h1>TODO</h1>
      <TodoForm />
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
