'use client';

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { useTheme } from '@mui/material/styles';

const menuItems = [
  { text: 'Narudžbe', icon: AssignmentRoundedIcon, bg: '#fff', iconColor: '#fff' }, // white
  { text: 'Korisnici', icon: PeopleRoundedIcon, bg: '#fff', iconColor: '#fff' }, // white 
  { text: 'Postavke', icon: SettingsRoundedIcon, bg: '#fff', iconColor: '#fff' }, // white
  { text: 'Korisnička podrška', icon: SupportAgentRoundedIcon, bg: '#fff', iconColor: '#fff' }, // white
  { text: 'Pomoć', icon: HelpRoundedIcon, bg: '#fff', iconColor: '#fff' }, // white
];

export default function MenuContent() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        borderRadius: 2,
        boxShadow: 1,
        p: 2,
        minWidth: 200,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <List
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          height: '100%',
        }}
      >
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                borderRadius: 1,
                mb: 0.5,
                '&.Mui-selected, &.Mui-selected:hover': {
                  backgroundColor: theme.palette.action.selected,
                },
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
                transition: 'background 0.2s',
              }}
            >
              <ListItemIcon sx={{ minWidth: 44 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: item.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: item.bg === '#fff' ? '1px solid #e0e0e0' : 'none',
                  }}
                >
                  <item.icon sx={{ color: item.iconColor }} />
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
