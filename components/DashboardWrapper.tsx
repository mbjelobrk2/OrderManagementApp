'use client';

import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './AppNavbar';
import Header from './Header';
import MainGrid from './MainGrid';
import SideMenu from './SideMenu';

interface DashboardWrapperProps {
  narudzbe: any[];
}

export default function DashboardWrapper({ narudzbe }: DashboardWrapperProps) {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <SideMenu />
      <AppNavbar />
      {/* Main content */}
      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            : alpha(theme.palette.background.default, 1),
          overflow: 'auto',
          height: '100vh',
        })}
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: 'center',
            mx: 3,
            pb: 5,
            mt: { xs: 8, md: 0 },
            pt: { xs: 2, md: 3 },
          }}
        >
          <Header />
          <MainGrid narudzbe={narudzbe} />
        </Stack>
      </Box>
    </Box>
  );
} 