"use client";
import { useForm, SubmitHandler } from "react-hook-form"
import {updateOrderAsync, fetchOrderByIdAsync } from "../lib/actions"
import { error } from "console"
import toast, { Toaster } from 'react-hot-toast'
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
interface IFormInput {
    naziv_proizvoda: string
    kupac: string
    kolicina: number
    cijena_po_komadu: number
    status_narudzbe: string
    adresa_isporuke: string
}


export default function App({showEditForm, ids, onClose}) {
  const { register, handleSubmit, formState: { errors }, reset} = useForm<IFormInput>()
  const router = useRouter();
  const [selectedOrderId, setSelectedOrderId] = useState<number | "">("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (ids && ids.length > 0) {
      setSelectedOrderId(ids[0]);
    }
  }, [ids, showEditForm]);

  const fetchData = async () => {
    const details = await fetchOrderByIdAsync(selectedOrderId as number);
    reset(details);
  }
  useEffect(() => {
    if (selectedOrderId !== "") {
      const fetchData = async () => {
        const details = await fetchOrderByIdAsync(selectedOrderId);
        reset(details);
      };
      fetchData();
    }
  }, [selectedOrderId,reset]);
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('naziv_proizvoda', data.naziv_proizvoda);
      formData.append('kupac', data.kupac);
      formData.append('kolicina', data.kolicina.toString());
      formData.append('cijena_po_komadu', data.cijena_po_komadu.toString());
      formData.append('status_narudzbe', data.status_narudzbe);
      formData.append('adresa_isporuke', data.adresa_isporuke);
 
      const result = await updateOrderAsync(selectedOrderId as number,formData);
      
      if (result) {
        toast.success('Narudžba uspješno izmijenjena!');
        fetchData() // Clear the form
      } else {
        toast.error(`Došlo je do greške prilikom izmjene narudžbe`);
      }
    } catch (error) {
      toast.error('Došlo je do greške prilikom kreiranja narudžbe');
    } finally {
      setIsLoading(false);
    }
  };

  if (!showEditForm) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
      {isLoading && (
                    <div className="loading-overlay">
                        <div className="loading-container">
                            <CircularProgress 
                                size={60}
                                thickness={4}
                                sx={{
                                    color: '#16a34a',
                                    '& .MuiCircularProgress-circle': {
                                        strokeLinecap: 'round',
                                    },
                                }}
                            />
                            <p className="loading-text">Izmjena narudžbe...</p>
                        </div>
                    </div>
                )}
        <button
          style={{ position: "absolute", top: 2, right: 2, background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", lineHeight: 1 }}
          onClick={onClose}
          aria-label="Zatvori"
        >
          &times;
        </button>
        <Toaster position="top-right" />
        <h2 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#1f2937' }}>
          Izmjena postojeće narudžbe
        </h2>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
          Odaberite ID narudžbe
        </label>
        <select
          value={selectedOrderId}
          onChange={e => setSelectedOrderId(Number(e.target.value))}
          style={{ marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
        >
          {ids.map(id => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="naziv_proizvoda">Naziv proizvoda:</label>
            <input 
              id="naziv_proizvoda" 
              {...register("naziv_proizvoda", { 
                required: "Naziv proizvoda je obavezan",
                maxLength: { value: 40, message: "Maksimalna dužina je 20 znakova" }
              })} 
            />
            {errors.naziv_proizvoda && <span className="error">{errors.naziv_proizvoda.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="kupac">Kupac:</label>
            <input 
              id="kupac" 
              {...register("kupac", { 
                required: "Ime kupca je obavezno",
                maxLength: { value: 20, message: "Maksimalna dužina je 20 znakova" }
              })} 
            />
            {errors.kupac && <span className="error">{errors.kupac.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="kolicina">Količina:</label>
            <input 
              id="kolicina" 
              {...register("kolicina", { 
                required: "Količina je obavezna",
                pattern: { 
                  value: /^[0-9]+$/,
                  message: "Količina mora biti broj"
                }
              })} 
            />
            {errors.kolicina && <span className="error">{errors.kolicina.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="cijena_po_komadu">Cijena po komadu:</label>
            <div className="input-with-suffix">
            <input
  id="cijena_po_komadu"
  type="number"
  step="0.01"
  inputMode="decimal"
  {...register("cijena_po_komadu", {
    valueAsNumber: true,
    required: "Cijena je obavezna",
    min: { value: 1, message: "Minimalna cijena je 1" }
  })}
  onChange={(e) => {
    const val = e.target.value.replace(",", ".");
    e.target.value = val;
  }}
/>
              <span className="input-suffix">KM</span>
            </div>
            {errors.cijena_po_komadu && <span className="error">{errors.cijena_po_komadu.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="status_narudzbe">Status narudžbe:</label>
            <select
              id="status_narudzbe"
              {...register("status_narudzbe", { required: "Status narudžbe je obavezan" })}
              defaultValue="KREIRANA"
              style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d1d5db" }}
            >
              <option value="KREIRANA">KREIRANA</option>
              <option value="U_OBRADI">U_OBRADI</option>
              <option value="POSLATA">POSLATA</option>
              <option value="ISPORUCENA">ISPORUCENA</option>
              <option value="OTKAZANA">OTKAZANA</option>
            </select>
            {errors.status_narudzbe && <span className="error">{errors.status_narudzbe.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="adresa_isporuke">Adresa isporuke:</label>
            <input 
              id="adresa_isporuke" 
              {...register("adresa_isporuke", { 
                required: "Adresa isporuke je obavezna",
                maxLength: { value: 40, message: "Maksimalna dužina je 20 znakova" }
              })} 
            />
            {errors.adresa_isporuke && <span className="error">{errors.adresa_isporuke.message}</span>}
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Učitavanje..." : "Izmijeni narudžbu"}
          </button>
        </form>
      </div>
      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          position: relative;
          background: white;
          padding: 1rem;
          border-radius: 8px;
          max-width: 24rem;
          width: 100%;
          max-height: 95vh;
          overflow-y: auto;
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }
        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1001;
          border-radius: 8px;
        }
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .loading-text {
          margin: 0;
          color: #16a34a;
          font-weight: 500;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #374151;
        }
        input, select {
          width: 100%;
          padding: 0.5rem;
          border-radius: 0.375rem;
          border: 1px solid #d1d5db;
          outline: none;
        }
        input:focus, select:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
        }
        .error {
          color: #ef4444;
          font-size: 0.875rem;
          margin-top: 0.25rem;
          display: block;
        }
        .submit-button {
          width: 100%;
          background-color: #4f46e5;
          color: white;
          padding: 0.75rem;
          border-radius: 0.375rem;
          font-weight: 500;
          margin-top: 1rem;
          cursor: pointer;
          border: none;
        }
        .submit-button:hover {
          background-color: #4338ca;
        }
        .input-with-suffix {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-with-suffix input {
          padding-right: 2.5em; /* Make space for the suffix */
        }
        .input-suffix {
          position: absolute;
          right: 0.75em;
          color: #6b7280;
          pointer-events: none;
          font-size: 1rem;
        }
      `}</style>
    </div>
  )
}