import { prisma } from "@/lib/prisma";
import { TodoForm } from "./todo-form";

export default async function TodoPage() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1>TODO</h1>
      <TodoForm />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
