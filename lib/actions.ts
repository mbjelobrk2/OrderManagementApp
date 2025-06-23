"use server";
import { supabase } from './supabaseClient'



export interface Order {
    id?: number
    naziv_proizvoda: string
    kupac: string
    kolicina: number
    cijena_po_komadu: number
    status_narudzbe: string
    adresa_isporuke: string
    created_at?: Date
  }
export async function fetchOrdersAsync() {
  const { data, error } = await supabase
    .from('narudzbe')
    .select('*')
  if (error) throw error
  return data
}
export async function createOrderAsync(formData: FormData) {
    try {
      const orderData = {
        naziv_proizvoda: formData.get('naziv_proizvoda') as string,
        kupac: formData.get('kupac') as string,
        kolicina: parseInt(formData.get('kolicina') as string),
        cijena_po_komadu: parseFloat(formData.get('cijena_po_komadu') as string),
        status_narudzbe: formData.get('status_narudzbe') as string,
        adresa_isporuke: formData.get('adresa_isporuke') as string,
        datum_kreiranja: new Date().toISOString()
      };
  
      const { data, error } = await supabase
        .from('narudzbe')
        .insert([orderData])
        .select();
  
      if (error) {
        throw new Error(error.message);
      }
  
      return { success: true, data };
    } catch (error) {
      return { error: { message: "Kreiranje narudžbe nije uspjelo" } };
    }
  }
  export async function updateOrderAsync(id: number, formData: FormData) {
    try {
      const orderData = {
        naziv_proizvoda: formData.get('naziv_proizvoda') as string,
        kupac: formData.get('kupac') as string,
        kolicina: parseInt(formData.get('kolicina') as string),
        cijena_po_komadu: parseFloat(formData.get('cijena_po_komadu') as string),
        status_narudzbe: formData.get('status_narudzbe') as string,
        adresa_isporuke: formData.get('adresa_isporuke') as string,

      };
      const { data, error } = await supabase
        .from('narudzbe')
        .update(orderData)
        .eq('id', id)
        .select()
  
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { error: { message: "Ažuriranje narudžbe nije uspjelo" } }
    }
  }
  export async function fetchOrderByIdAsync(id: number) {
    const { data, error } = await supabase
      .from('narudzbe')
      .select('*')
      .eq('id', id)
    if (error) throw error
    if (!data || data.length === 0) {
      throw new Error('Narudžba nije pronađena');
    }
    return {
      naziv_proizvoda: data[0].naziv_proizvoda,
      kupac: data[0].kupac,
      kolicina: data[0].kolicina,
      cijena_po_komadu: data[0].cijena_po_komadu,
      status_narudzbe: data[0].status_narudzbe,
      adresa_isporuke: data[0].adresa_isporuke
    }
  }
  export async function deleteOrder(ids: number[]) {
    try {
      for (const id of ids) {
      const { data, error } = await supabase
        .from('narudzbe')
        .delete()
        .eq('id', id)
        .select()
        if (error) throw error
      }
      return { data: null, error: null }
  } catch (error) {
    return { error: { message: "Brisanje narudžbe nije uspjelo" } }
  }
}
