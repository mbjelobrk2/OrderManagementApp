import { supabase } from '../../lib/supabaseClient';
import DashboardWrapper from '../../components/DashboardWrapper';

// Force dynamic rendering to always get fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  const { data: narudzbe } = await supabase
    .from('narudzbe')
    .select('*')
    .order('datum_kreiranja', { ascending: false });

  return <DashboardWrapper narudzbe={narudzbe || []} />;
}


