/*import OpenAI from 'openai';
import { Order } from './actions';
export async function generateLLMInsights(orders: Order[]): Promise<string> {
  const content = orders
    .map(
      (o) =>
        `ID: ${o.id}, Kupac: ${o.kupac}, Proizvod: ${o.naziv_proizvoda}, Količina: ${o.kolicina}, Cijena po komadu: ${o.cijena_po_komadu}, Status narudzbe: ${o.status_narudzbe}, Adresa isporuke: ${o.adresa_isporuke}`
    )
    .join("\n");

  const prompt = `Na osnovu sljedećih narudžbi generiši analitički uvid na bosanskom jeziku. Analiza treba sadržavati broj narudžbi, ukupan prihod, i eventualne zaključke (npr. najčešći proizvodi, veliki kupci, itd):

${content}`;
  const openai = new OpenAI({ apiKey:process.env.OPENAI_API_KEY })

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0]?.message?.content ?? "Nema uvida.";
}*/
