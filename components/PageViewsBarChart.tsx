'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

function SimpleBarChart({ data, colors }: { data: number[][]; colors: string[] }) {
  const maxValue = Math.max(...data.flat());
  const barWidth = 100 / data[0].length;
  const barSpacing = barWidth * 0.1;
  const actualBarWidth = barWidth - barSpacing;
  
  const createBars = (seriesData: number[], color: string, seriesIndex: number) => {
    return seriesData.map((value, index) => {
      const height = (value / maxValue) * 80; // 80% max height
      const x = index * barWidth + barSpacing / 2;
      const y = 100 - height;
      
      return (
        <rect
          key={`${seriesIndex}-${index}`}
          x={x}
          y={y}
          width={actualBarWidth}
          height={height}
          fill={color}
          fillOpacity={0.8}
          rx={2}
        />
      );
    });
  };

  return (
    <svg width="100%" height="250" viewBox="0 0 100 100" preserveAspectRatio="none">
      {data.map((series, index) => createBars(series, colors[index], index))}
    </svg>
  );
}

export default function PageViewsBarChart() {
  const theme = useTheme();
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
  ];

  const chartData = [
    [2234, 3872, 2998, 4125, 3357, 2789, 2998], // Page views
    [3098, 4215, 2384, 2101, 4752, 3593, 2384], // Downloads
    [4051, 2275, 3129, 4693, 3904, 2038, 2275], // Conversions
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Pregledi stranice i preuzimanja
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
              1.3M
            </Typography>
            <Chip size="small" color="error" label="-8%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Pregledi stranice i preuzimanja za posljednjih 6 mjeseci
          </Typography>
        </Stack>
        <Box sx={{ mt: 2 }}>
          <SimpleBarChart data={chartData} colors={colorPalette} />
        </Box>
      </CardContent>
    </Card>
  );
}
