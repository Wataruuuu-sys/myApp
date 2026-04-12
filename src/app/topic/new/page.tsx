import { TopicForm } from "../topic-form";

export default function TopicNewPage() {
  return (
    <div>
      <h1>新規Topic作成</h1>
      <TopicForm />
      <a href="/topic">一覧に戻る</a>
    </div>
  );
}
