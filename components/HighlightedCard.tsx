'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import InsightsModal from './InsightsModal';
import { generateLLMInsights } from '../lib/insightHelper';
import { useState } from 'react';
import { error } from 'console';

export default function HighlightedCard({narudzbe}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [openInsightsModal,setOpenInsightsModal] = useState(false);
  const [loading,setLoading] = useState(false);
  const [content,setContent] = useState('');
  const handleOpen = async() => {
    setOpenInsightsModal(true);
    setLoading(true);
    generateLLMInsights(narudzbe)
      .then((insights) => {
        setContent(insights);
      })
      .catch(() => {
        setContent("Greška prilikom dobivanja uvida.");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <InsightsRoundedIcon />
        <Typography
          component="h2"
          variant="subtitle2"
          gutterBottom
          sx={{ fontWeight: '600' }}
        >
          Sumarizacija podataka
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
          Mogućnost generisanja detaljnog uvida u podatke o korisničkim narudžbama 
        </Typography>
        <Button variant="contained"
          onClick={() => handleOpen()}
          size="small"
          color="primary"
          endIcon={<ChevronRightRoundedIcon />}
          fullWidth={isSmallScreen}
        >
          Uvid u narudžbe
        </Button>
      </CardContent>
    <InsightsModal 
       open={openInsightsModal} 
       onClose={() => setOpenInsightsModal(false)} 
       content={content}
       loading={loading}>
    </InsightsModal>
    </Card>
  );
}
