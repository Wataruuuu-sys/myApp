import { topicUsecase } from "@/lib/container";
import { notFound } from "next/navigation";
import { submitAnswer } from "./actions";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AnswerPage({ params }: Props) {
  const { id } = await params;
  const topicId = parseInt(id, 10);
  if (isNaN(topicId)) {
    notFound();
  }

  const topicList = await topicUsecase.topics();
  const topic = topicList.find((t) => t.id === topicId);
  if (!topic) {
    notFound();
  }

  const action = submitAnswer.bind(null, topicId);

  return (
    <div>
      <h1>{topic.title}</h1>
      <form action={action}>
        <input type="number" name="answer" step="any" required />
        <button type="submit">回答する</button>
      </form>
    </div>
  );
}
