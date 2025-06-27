import { supabase } from '../../lib/supabaseClient';
import DashboardWrapper from '../../components/DashboardWrapper';

export default async function Page() {
  const { data: narudzbe } = await supabase
    .from('narudzbe')
    .select('*')
    .order('datum_kreiranja', { ascending: false });

  return <DashboardWrapper narudzbe={narudzbe || []} />;
}


