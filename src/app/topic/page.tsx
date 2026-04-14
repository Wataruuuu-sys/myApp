import Link from "next/link";
import { topics } from "./actions";

export const dynamic = 'force-dynamic';

export default async function TopicPage() {
  const topicList = await topics();

  return (
    <div>
      <h1>Topics</h1>
      <a href="/topic/new">新規作成</a>
      <ul>
        {topicList.map((topic) => (
          <li key={topic.id}>
            <Link href={`/topic/${topic.id}`}>{topic.title}</Link> [{topic.status}]
          </li>
        ))}
      </ul>
    </div>
  );
}
