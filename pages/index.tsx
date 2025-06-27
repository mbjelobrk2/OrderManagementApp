import { GetServerSideProps } from 'next';
import { redirect } from 'next/navigation';
import App from './Dashboard';
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: '/orders',
      permanent: false,
    },
  };
};

export default function Home() {
  return null;
}