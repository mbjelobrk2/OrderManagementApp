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
  console.log(narudzbe);
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
          Explore your data
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
          Uncover performance and visitor insights with our data wizardry.
        </Typography>
        <Button variant="contained"
          onClick={() => handleOpen()}
          size="small"
          color="primary"
          endIcon={<ChevronRightRoundedIcon />}
          fullWidth={isSmallScreen}
        >
          Get insights
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
