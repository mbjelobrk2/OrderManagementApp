import { fetchOrdersAsync } from "../../../lib/actions";
import { generateLLMInsights } from "../../../lib/insightHelper";
import { notFound } from "next/navigation";



export default async function InsightsPage() {

  const orders = await fetchOrdersAsync();
  if (!orders.length) return notFound();

  const insights = await generateLLMInsights(orders);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Uvid u dostupne narudžbe</h1>
      <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap text-gray-800">
        {insights}
      </pre>
    </main>
  );
}