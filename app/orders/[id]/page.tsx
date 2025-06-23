import Link from 'next/link';
import { fetchOrderByIdAsync } from '../../../lib/actions';
import { notFound } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default async function OrderDetailPage({ params }) {
  const { id } = params;
  let order;
  try {
    order = await fetchOrderByIdAsync(Number(id));
  } catch (e) {
    return notFound();
  }

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: '2rem', position: 'relative' }}>
      <Link href="/orders" style={{ position: "absolute", top: 8, left: 8, color: "#4f46e5" }}>
        <IconButton aria-label="Go back">
          <ArrowBackIcon />
        </IconButton>
      </Link>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#1f2937', marginTop: 0, textAlign: 'center' }}>Detalji narudžbe #{id}</h1>
      <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem' }}>
        <li><strong>Naziv proizvoda:</strong> {order.naziv_proizvoda}</li>
        <li><strong>Kupac:</strong> {order.kupac}</li>
        <li><strong>Količina:</strong> {order.kolicina}</li>
        <li><strong>Cijena po komadu:</strong> {order.cijena_po_komadu}</li>
        <li><strong>Status narudžbe:</strong> {order.status_narudzbe}</li>
        <li><strong>Adresa isporuke:</strong> {order.adresa_isporuke}</li>
      </ul>
    </div>
  );
} 