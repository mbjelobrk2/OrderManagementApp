-- Create orders table
CREATE TABLE narudzbe (
    id BIGSERIAL PRIMARY KEY,
    naziv_proizvoda TEXT NOT NULL,
    kupac TEXT NOT NULL,
    kolicina INTEGER NOT NULL CHECK (kolicina > 0),
    cijena_po_komadu NUMERIC(10,2) NOT NULL CHECK (cijena_po_komadu >= 0),
    status_narudzbe TEXT NOT NULL DEFAULT 'CREATED' 
        CHECK (status_narudzbe IN ('CREATED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED')),
    datum_kreiranja TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    adresa_isporuke TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on status for faster queries
CREATE INDEX idx_narudzbe_status ON narudzbe(status_narudzbe);

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_narudzbe_updated_at
    BEFORE UPDATE ON narudzbe
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Rename table from orders to narudzbe
ALTER TABLE orders RENAME TO narudzbe;

-- Rename the index
ALTER INDEX idx_orders_status RENAME TO idx_narudzbe_status;

-- Rename the trigger
ALTER TRIGGER update_orders_updated_at ON narudzbe RENAME TO update_narudzbe_updated_at; 