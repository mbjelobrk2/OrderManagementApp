"use client";
import { useForm, SubmitHandler } from "react-hook-form"
import { createOrderAsync } from "../lib/actions"
import { error } from "console"
import toast, { Toaster } from 'react-hot-toast'
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface IFormInput {
    naziv_proizvoda: string
    kupac: string
    kolicina: number
    cijena_po_komadu: number
    status_narudzbe: string
    adresa_isporuke: string
}

export default function App() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>()
  const router = useRouter();
  
  // Auto-redirect after success message
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push('/orders');
      }, 2000); // 2 seconds delay
      
      return () => clearTimeout(timer);
    }
  }, [success, router]);
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('naziv_proizvoda', data.naziv_proizvoda);
      formData.append('kupac', data.kupac);
      formData.append('kolicina', data.kolicina.toString());
      formData.append('cijena_po_komadu', data.cijena_po_komadu.toString());
      formData.append('status_narudzbe', "KREIRANA");
      formData.append('adresa_isporuke', data.adresa_isporuke);

      const result = await createOrderAsync(formData);
      
      if (result.success) {
        reset(); // Clear the form
        setSuccess(true);
      } else {
        toast.error(`Greška: ${result.error}`);
      }
    } catch (error) {
      toast.error('Došlo je do greške prilikom kreiranja narudžbe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container" style={{position: "relative"}}>
            <Toaster position="top-right" />
      {loading && (
        <div className="loading-overlay">
          <CircularProgress />
        </div>
      )}
      {!success ? (
      <div className="form-box">
        <h2>Nova narudžba</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="naziv_proizvoda">Naziv proizvoda:</label>
            <input 
              id="naziv_proizvoda" 
              {...register("naziv_proizvoda", { 
                required: "Naziv proizvoda je obavezan",
                maxLength: { value: 20, message: "Maksimalna dužina je 20 znakova" }
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
                {...register("cijena_po_komadu", {
                  required: "Cijena je obavezna",
                  min: { value: 1, message: "Minimalna cijena je 1" }
                })}
              />
              <span className="input-suffix">KM</span>
            </div>
            {errors.cijena_po_komadu && <span className="error">{errors.cijena_po_komadu.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="adresa_isporuke">Adresa isporuke:</label>
            <input 
              id="adresa_isporuke" 
              {...register("adresa_isporuke", { 
                required: "Adresa isporuke je obavezna",
                maxLength: { value: 20, message: "Maksimalna dužina je 20 znakova" }
              })} 
            />
            {errors.adresa_isporuke && <span className="error">{errors.adresa_isporuke.message}</span>}
          </div>

          <button type="submit" className="submit-button">
            Kreiraj narudžbu
          </button>
        </form>
      </div>
             ) : ( 
         <div className="success-message">
           <div className="success-icon">
             <CheckCircleIcon />
           </div>
           <h2>Narudžba uspješno kreirana!</h2>
         </div>
       )}
      <style jsx>{`
        .form-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f3f4f6;
          padding: 2rem;
        }

        .form-box {
          background-color: white;
          padding: 2rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          width: 100%;
          max-width: 32rem;
        }

        h2 {
          text-align: center;
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 2rem;
          color: #1f2937;
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

        input {
          width: 100%;
          padding: 0.5rem;
          border-radius: 0.375rem;
          border: 1px solid #d1d5db;
          outline: none;
        }

        input:focus {
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
        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 9999;
          background-color: rgba(255, 255, 255, 0.7);
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
                 .success-message {
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
           padding: 3rem 2rem;
           border-radius: 1rem;
           box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
           width: 100%;
           max-width: 32rem;
           text-align: center;
           border: 2px solid #16a34a;
           animation: successFadeIn 0.6s ease-out;
         }

         .success-icon {
           margin-bottom: 1.5rem;
           animation: iconBounce 0.8s ease-out 0.2s both;
         }

         .success-icon svg {
           font-size: 4rem;
           color: #16a34a;
           filter: drop-shadow(0 2px 4px rgba(22, 163, 74, 0.3));
         }

         .success-message h2 {
           color: #16a34a;
           font-size: 1.5rem;
           font-weight: 700;
           margin-bottom: 0.5rem;
           animation: textSlideUp 0.6s ease-out 0.4s both;
         }

         .success-message p {
           color: #6b7280;
           font-size: 0.875rem;
           margin: 0;
           animation: textSlideUp 0.6s ease-out 0.6s both;
         }

         @keyframes successFadeIn {
           from {
             opacity: 0;
             transform: scale(0.9) translateY(20px);
           }
           to {
             opacity: 1;
             transform: scale(1) translateY(0);
           }
         }

         @keyframes iconBounce {
           0% {
             transform: scale(0) rotate(-180deg);
             opacity: 0;
           }
           50% {
             transform: scale(1.2) rotate(-90deg);
           }
           100% {
             transform: scale(1) rotate(0deg);
             opacity: 1;
           }
         }

         @keyframes textSlideUp {
           from {
             opacity: 0;
             transform: translateY(10px);
           }
           to {
             opacity: 1;
             transform: translateY(0);
           }
         }
      `}</style>
    </div>
  )
}