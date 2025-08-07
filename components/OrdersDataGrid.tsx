"use client";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowSelectionModel } from "@mui/x-data-grid";
import  Button from "@mui/material/Button";
import { useState } from "react";
import { Checkbox } from "@mui/material";
import { deleteOrder } from "../lib/actions";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import ConfirmDelete from "./ConfirmDelete";
import EditForm from "./EditForm";

interface Order {
    id: number;
    naziv_proizvoda: string;
    kupac: string;
    kolicina: number;
    cijena_po_komadu: number;
    status_narudzbe: string;
    datum_kreiranja: Date;
    adresa_isporuke: string;
}
  
interface OrdersDataGridProps {
    narudzbe: Order[];
}



export default function OrdersDataGrid({ narudzbe }: OrdersDataGridProps) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const formattedData = narudzbe.map(order => ({
        ...order,
        datum_kreiranja: new Date(order.datum_kreiranja).toISOString().split('T')[0]
    }));

    const handleCheckboxChange = (id: number) => {
        setSelectedIds((prev) =>
          prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
        );
      };

    const handleDeleteSelected = async () => {
        try {
            await deleteOrder(selectedIds);
            setSelectedIds([]);
            router.refresh();
        } catch (error) {
            throw error; // Re-throw to be handled by ConfirmDelete
        }
    };
    const columns: GridColDef[] = [
        {
            field: "select",
            headerName: "",
            width: 50,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
              <Checkbox
                checked={selectedIds.includes(params.row.id)}
                onChange={() => handleCheckboxChange(params.row.id)}
                inputProps={{ "aria-label": "Select row" }}
              />
            ),
          },
        { field: "id", headerName: "ID", width: 60 },
        { field: "naziv_proizvoda", headerName: "Naziv proizvoda", width: 170 },
        { field: "kupac", headerName: "Kupac", width: 120 },
        { field: "kolicina", headerName: "Količina", width: 85, },
        {
            field: "cijena_po_komadu",
            headerName: "Cijena/kom",
            width: 90,
            renderCell: (params) => <span>{params.value} KM</span>
        },
        { field: "status_narudzbe", headerName: "Status", width: 115, },
        {
            field: "datum_kreiranja",
            headerName: "Datum kreiranja",
            width: 140,
            valueFormatter: (params: any) => {
                return params.value?.substring(0, 10);
            }
        },
        { field: "adresa_isporuke", headerName: "Adresa isporuke", width: 170 },
    ];


    return (
        <div style={{ height: 600, width: "100%" }}>
            <Toaster position="top-right" />
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10, gap: 8 }}>
                <Button variant="contained" color="primary" onClick={() => router.push('/orders/create')}>
                    Dodaj narudžbu
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    disabled={ (selectedIds as unknown as Array<number | string>).length === 0}
                    onClick={() => setShowEditModal(true)}
                >
                    Izmijeni
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    disabled={ (selectedIds as unknown as Array<number | string>).length === 0}
                    onClick={() => setShowModal(true)}
                >
                    Obriši
                </Button>
            </div>
            <DataGrid
                rows={formattedData}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[10, 25, 50]}
                disableRowSelectionOnClick
            />
            <ConfirmDelete
                showModal={showModal}
                hideModal={() => setShowModal(false)}
                ids={selectedIds}
                deletefinal={handleDeleteSelected}
            />
            <EditForm 
            showEditForm={showEditModal} 
            ids={selectedIds}
            onClose={() => {
                setShowEditModal(false);
                router.refresh();
              }}/>
        </div>
    );
}