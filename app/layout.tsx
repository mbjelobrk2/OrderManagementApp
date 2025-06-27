import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import AppTheme from '../components/AppTheme';
import './globals.css';

export const metadata = {
  title: 'Order Management Dashboard',
  description: 'A comprehensive order management system built with Next.js and Material-UI',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <CssVarsProvider>
          <CssBaseline />
          <AppTheme>
            {children}
          </AppTheme>
        </CssVarsProvider>
      </body>
    </html>
  )
}
