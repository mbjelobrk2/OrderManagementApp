export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
import { supabase } from '../../lib/supabaseClient';
import OrdersDataGrid from '../../components/OrdersDataGrid';

export default async function Page() {
  let { data: narudzbe } = await supabase
    .from('narudzbe')
    .select('*')
    .order('datum_kreiranja', { ascending: false });

  return <OrdersDataGrid narudzbe={narudzbe || []} />;
}


