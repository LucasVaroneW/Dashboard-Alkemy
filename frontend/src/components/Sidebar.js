import * as React from 'react';
import '../style/header.css'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Sidebar() {
  const [open, setOpen] = React.useState(true);


  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
    <div className='wrapper'>
        <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.transparent' }}
        component="nav"
        
        >
        <Box 
            flexDirection= "column"
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={4}
            mt={2}
             >
            <AccountCircleIcon sx={{fontSize: 50}} />
            <Typography 
                
                >
                Lucas Varone
            </Typography>

        </Box>

        <hr></hr>
        <Box mt={4} mb={2}>
            <ListItemButton>
                <ListItemIcon>
                    <AddCircleIcon />
                </ListItemIcon>
                    <ListItemText primary="New record" />
            </ListItemButton>
        </Box>
        <ListItemButton onClick={handleClick}>
            <ListItemIcon>
            <LeaderboardIcon />
            </ListItemIcon>
            <ListItemText primary="Record List" />
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <TrendingUpIcon />
                    </ListItemIcon>
                        <ListItemText primary="Income List" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <TrendingDownIcon />
                    </ListItemIcon>
                        <ListItemText primary="Outflow List" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <DonutLargeIcon />
                    </ListItemIcon>
                        <ListItemText primary="All Records" />
                </ListItemButton>
            </List>
        </Collapse>
        </List>
    </div>
    </>
  );
}
