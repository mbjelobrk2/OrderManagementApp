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
  const prompt = `Ti si AI asistent koji odgovara isključivo na bosanskom jeziku. 
Nikada nemoj koristiti engleski. Izgenerisati statistike na osnovu sljedećih narudžbi na bosanskom jeziku:

${content}. Ukoliko ni jedna narudžba nije poslana generiši poruku: Trenutno nema dostupnih narudžbi.`;

  console.log(prompt);
  const groq = new Groq({ apiKey:process.env.GROQ_API_KEY })

  const completion = await groq.chat.completions.create({
    model: "llama3-70b-8192", // you can also try "mixtral-8x7b-32768"
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0]?.message?.content ?? "Nema uvida.";
}
