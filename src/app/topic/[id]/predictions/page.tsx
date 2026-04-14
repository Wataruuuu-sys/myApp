import { topicUsecase } from "@/lib/container";
import { notFound } from "next/navigation";
import { submitPrediction, predictions } from "./actions";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PredictionPage({ params }: Props) {
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

  const predictionList = await predictions(topicId);
  const action = submitPrediction.bind(null, topicId);

  return (
    <div>
      <h1>{topic.title}</h1>
      {topic.status === "open" && (
        <form action={action}>
          <input type="number" name="predict" step="any" required />
          <button type="submit">予想する</button>
        </form>
      )}
      <ul>
        {predictionList.map((p) => (
          <li key={p.id}>{p.predict}</li>
        ))}
      </ul>
    </div>
  );
}
