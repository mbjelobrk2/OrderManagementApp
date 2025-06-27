'use client';

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import {
  IndiaFlag,
  UsaFlag,
  BrazilFlag,
  GlobeFlag,
} from '../components/CustomIcons';

const data = [
  { label: 'India', value: 50000 },
  { label: 'USA', value: 35000 },
  { label: 'Brazil', value: 10000 },
  { label: 'Other', value: 5000 },
];

const countries = [
  {
    name: 'India',
    value: 50,
    flag: <IndiaFlag />,
    color: 'hsl(220, 25%, 65%)',
  },
  {
    name: 'USA',
    value: 35,
    flag: <UsaFlag />,
    color: 'hsl(220, 25%, 45%)',
  },
  {
    name: 'Brazil',
    value: 10,
    flag: <BrazilFlag />,
    color: 'hsl(220, 25%, 30%)',
  },
  {
    name: 'Other',
    value: 5,
    flag: <GlobeFlag />,
    color: 'hsl(220, 25%, 20%)',
  },
];

function SimplePieChart({ data }: { data: { label: string; value: number }[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const colors = ['hsl(220, 25%, 65%)', 'hsl(220, 25%, 45%)', 'hsl(220, 25%, 30%)', 'hsl(220, 25%, 20%)'];
  
  let currentAngle = 0;
  const radius = 40;
  const centerX = 50;
  const centerY = 50;
  
  const createArc = (value: number, color: string, index: number) => {
    const angle = (value / total) * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    
    const largeArcFlag = angle > Math.PI ? 1 : 0;
    
    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');
    
    currentAngle += angle;
    
    return (
      <path
        key={index}
        d={pathData}
        fill={color}
        stroke="white"
        strokeWidth="1"
      />
    );
  };

  return (
    <svg width="200" height="200" viewBox="0 0 100 100">
      {data.map((item, index) => createArc(item.value, colors[index], index))}
      <circle cx={centerX} cy={centerY} r={25} fill="white" />
      <text x={centerX} y={centerY - 5} textAnchor="middle" fontSize="8" fill="#666">
        98.5K
      </text>
      <text x={centerX} y={centerY + 5} textAnchor="middle" fontSize="6" fill="#999">
        Total
      </text>
    </svg>
  );
}

export default function ChartUserByCountry() {
  return (
    <Card
      variant="outlined"
      sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Users by country
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SimplePieChart data={data} />
        </Box>
        {countries.map((country, index) => (
          <Stack
            key={index}
            direction="row"
            sx={{ alignItems: 'center', gap: 2, pb: 2 }}
          >
            {country.flag}
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  {country.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {country.value}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                aria-label="Number of users by country"
                value={country.value}
                sx={{
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: country.color,
                  },
                }}
              />
            </Stack>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}
