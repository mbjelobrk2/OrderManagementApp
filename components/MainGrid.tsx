'use client';

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChartUserByCountry from '../components/ChartUserByCountry';
import CustomizedTreeView from '../components/CustomizedTreeView';
import HighlightedCard from '../components/HighlightedCard';
import PageViewsBarChart from '../components/PageViewsBarChart';
import SessionsChart from '../components/SessionsChart';
import StatCard, { StatCardProps } from '../components/StatCard';
import OrdersDataGrid from '../components/OrdersDataGrid';
import { useState,useEffect } from 'react';

const processOrdersData = (orders: any[]) => {
  const ordersByDate: { [key: string]: number } = {};
  const revenueByDate: { [key: string]: number } = {};
  const uniqueCustomersByDate: { [key: string]: Set<string> } = {};
  const customersWithValidOrders = new Set<string>(); // NEW

  orders.forEach((order) => {
    const orderDate = new Date(order.datum_kreiranja).toLocaleDateString('en-US');

    // Initialize date-based buckets if not already set
    if (!ordersByDate[orderDate]) {
      ordersByDate[orderDate] = 0;
      revenueByDate[orderDate] = 0;
      uniqueCustomersByDate[orderDate] = new Set();
    }

    // Only include in counts if NOT canceled
    const isValid = order.status_narudzbe !== "OTKAZANA";

    if (isValid) {
      ordersByDate[orderDate] += 1;
      revenueByDate[orderDate] += order.cijena_po_komadu * order.kolicina;
      uniqueCustomersByDate[orderDate].add(order.kupac);
      customersWithValidOrders.add(order.kupac);
    }
  });

  const orderDates = Object.keys(ordersByDate).sort();

  const orderCounts = orderDates.map((date) => ordersByDate[date]);
  const revenues = orderDates.map((date) => revenueByDate[date]);
  const uniqueCustomers = orderDates.map((date) => uniqueCustomersByDate[date].size);

  return {
    orderCounts,
    revenues,
    uniqueCustomers,
    orderDates,
    totalUniqueCustomers: customersWithValidOrders.size, // NEW
  };
};

const calculateTrend = (data: number[]): 'up' | 'down' | 'neutral' => {
  if (data.length < 2) return 'neutral';

  const latest = data[data.length - 1];
  const previous = data[data.length - 2];

  if (latest > previous) return 'up';
  if (latest < previous) return 'down';
  return 'neutral';
};

export default function MainGrid({narudzbe}) {
  const [statsData, setStatsData] = useState<any[]>([]);

  useEffect(() => {
    const {
      orderCounts,
      revenues,
      uniqueCustomers,
      orderDates,
      totalUniqueCustomers,
    } = processOrdersData(narudzbe);
  
    const newStatsData = [
      {
        title: 'Broj aktivnih narudžbi',
        value: `${orderCounts.reduce((a, b) => a + b, 0)}`,
        interval: 'Od prve narudžbe',
        trend: calculateTrend(orderCounts),
        data: orderCounts,
        xAxisLabels: orderDates,
      },
      {
        title: 'Broj kupaca',
        value: `${totalUniqueCustomers}`,
        interval: 'Od prvog kupca',
        trend: calculateTrend(uniqueCustomers),
        data: uniqueCustomers,
        xAxisLabels: orderDates,
      },
      {
        title: 'Ukupni prihod',
        value: `${revenues.reduce((a, b) => a + b, 0).toFixed(2)} BAM`,
        interval: 'Za sve aktivne narudžbe',
        trend: calculateTrend(revenues),
        data: revenues,
        xAxisLabels: orderDates,
      },
    ];
  
    setStatsData(newStatsData);
  }, [narudzbe]);


  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Statistike
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {statsData.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard narudzbe={narudzbe}/>
        </Grid>
      {/*  <Grid size={{ xs: 12, md: 6 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
        */}
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Narudžbe
      </Typography>
      <Grid container spacing={2} columns={8}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <OrdersDataGrid narudzbe={narudzbe || []} />
        </Grid>
        {/*<Grid size={{ xs: 12, lg: 3 }}>
           <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
          </Stack>
        </Grid>*/}
      </Grid>
    </Box>
  );
}
