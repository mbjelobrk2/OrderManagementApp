'use client';

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../components/Copyright';
import ChartUserByCountry from '../components/ChartUserByCountry';
import CustomizedTreeView from '../components/CustomizedTreeView';
import HighlightedCard from '../components/HighlightedCard';
import PageViewsBarChart from '../components/PageViewsBarChart';
import SessionsChart from '../components/SessionsChart';
import StatCard, { StatCardProps } from '../components/StatCard';
import OrdersDataGrid from '../components/OrdersDataGrid';

const data: StatCardProps[] = [
  {
    title: 'Broj narudžbi',
    value: '14k',
    interval: 'Posljednjih 30 dana',
    trend: 'up',
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
      360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: 'Kupci',
    value: '325',
    interval: 'Posljednjih 30 dana',
    trend: 'up',
    data: [
      220, 300, 360, 400, 480, 520, 500, 840, 620, 660, 740, 380, 760, 800, 780, 820,
      600, 840, 820, 920, 450, 900, 1080, 720, 900, 1050, 1130, 970, 1250, 1640
    ],
  },
  {
    title: 'Ukupni prihod',
    value: '200k',
    interval: 'Posljednjih 30 dana',
    trend: 'neutral',
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
      520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    ],
  },
];

export default function MainGrid({narudzbe}) {
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
        {data.map((card, index) => (
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
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
