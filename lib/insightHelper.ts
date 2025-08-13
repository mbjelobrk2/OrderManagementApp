"use server"

import Groq from "groq-sdk";
import { Order } from './actions';
export async function generateLLMInsights(orders): Promise<string> {

  
    orders = Array.isArray(orders)
  ? orders.flat(1)
  : Object.values(orders);
  
  const content = orders
    .map(
      (o) =>
        `Kupac: ${o.kupac}, Proizvod: ${o.naziv_proizvoda}, Količina: ${o.kolicina}, Cijena po komadu: ${o.cijena_po_komadu}, Status narudzbe: ${o.status_narudzbe}, Adresa isporuke: ${o.adresa_isporuke}`
    )
    .join("\n");
  const prompt = `Na osnovu sljedećih narudžbi generiši analitički uvid na bosanskom jeziku. Analiza treba sadržavati broj narudžbi koji odgovara broju redova, ukupan prihod, i eventualne zaključke (npr. najčešći proizvodi, veliki kupci, itd):

${content}. U analizi NE SMIJE BITI ništa na engleskom jeziku. Ukoliko ni jedna narudžba nije poslana generiši poruku: Trenutno nema dostupnih narudžbi.`;

  console.log(prompt);
  const groq = new Groq({ apiKey:process.env.GROQ_API_KEY })

  const completion = await groq.chat.completions.create({
    model: "llama3-70b-8192", // you can also try "mixtral-8x7b-32768"
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0]?.message?.content ?? "Nema uvida.";
}
