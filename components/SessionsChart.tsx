'use client';

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

function SimpleAreaChart({ data, colors }: { data: number[][]; colors: string[] }) {
  const maxValue = Math.max(...data.flat());
  const minValue = Math.min(...data.flat());
  const range = maxValue - minValue;
  
  const createPath = (seriesData: number[], color: string, index: number) => {
    const points = seriesData.map((value, i) => {
      const x = (i / (seriesData.length - 1)) * 100;
      const y = 100 - ((value - minValue) / range) * 80;
      return `${x},${y}`;
    });
    
    const areaPath = `M 0,100 L ${points.join(' L ')} L 100,100 Z`;
    const linePath = `M ${points.join(' L ')}`;
    
    return (
      <g key={index}>
        <path
          d={areaPath}
          fill={color}
          fillOpacity={0.3}
        />
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    );
  };

  return (
    <svg width="100%" height="250" viewBox="0 0 100 100" preserveAspectRatio="none">
      {data.map((series, index) => createPath(series, colors[index], index))}
    </svg>
  );
}

export default function SessionsChart() {
  const theme = useTheme();

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  const chartData = [
    [
      300, 900, 600, 1200, 1500, 1800, 2400, 2100, 2700, 3000, 1800, 3300,
      3600, 3900, 4200, 4500, 3900, 4800, 5100, 5400, 4800, 5700, 6000,
      6300, 6600, 6900, 7200, 7500, 7800, 8100,
    ],
    [
      500, 900, 700, 1400, 1100, 1700, 2300, 2000, 2600, 2900, 2300, 3200,
      3500, 3800, 4100, 4400, 2900, 4700, 5000, 5300, 5600, 5900, 6200,
      6500, 5600, 6800, 7100, 7400, 7700, 8000,
    ],
    [
      1000, 1500, 1200, 1700, 1300, 2000, 2400, 2200, 2600, 2800, 2500,
      3000, 3400, 3700, 3200, 3900, 4100, 3500, 4300, 4500, 4000, 4700,
      5000, 5200, 4800, 5400, 5600, 5900, 6100, 6300,
    ],
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Sesije
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              13,277
            </Typography>
            <Chip size="small" color="success" label="+35%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Sesije po danu za posljednjih 30 dana
          </Typography>
        </Stack>
        <Box sx={{ mt: 2 }}>
          <SimpleAreaChart data={chartData} colors={colorPalette} />
        </Box>
      </CardContent>
    </Card>
  );
}
