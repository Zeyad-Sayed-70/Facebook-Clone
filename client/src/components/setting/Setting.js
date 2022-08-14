import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IconButton, Tooltip } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PublicIcon from '@mui/icons-material/Public';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import General from './components/general'
import Avatar from './components/avatar'
import Account from './components/account'
import { GeneralContext } from '../../contextAPIs/GeneralContext'

const drawerWidth = 240;

const profSettings = [
  {
    id: 0,
    title: 'General',
    icon: <PublicIcon />,
  },
  {
    id: 1,
    title: 'Avatar',
    icon: <AccountCircleIcon />,
  },
  {
    id: 2,
    title: 'Account',
    icon: <KeyIcon />,
  }
]

export default function PermanentDrawerLeft() {
  const [select, setSelect] = React.useState(0)
  const { me } = React.useContext(GeneralContext)
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{ width: `100%`, }}
      >
        <Toolbar style={{ backgroundColor: '#222', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Tooltip title="back home"><IconButton style={{ color: '#888' }}><a href="/" style={{ textDecoration: 'none', color: '#888' }}><ChevronLeftIcon style={{ fontSize: '2rem' }} /></a></IconButton></Tooltip>
          <Typography variant="h6" noWrap component="div" style={{ marginLeft: 'auto' }}>
            Settings
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className='main' style={{ display: 'flex' }}>
      <Drawer
        className="sidebar"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider style={{ backgroundColor: '#888' }} />
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" style={{ padding: '1rem 1rem 0' }}>Profile</Typography>
          <List>
            {profSettings.map((list, index) => (
              <ListItem key={list.id} id={list.id} disablePadding className={`list ${select === list.id ? 'selected' : ''}`} onClick={() => setSelect(list.id)}>
                <ListItemButton>
                  <ListItemIcon>
                    {list.icon}
                  </ListItemIcon>
                  <ListItemText>{list.title}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider style={{ backgroundColor: '#888' }} />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: '#444', p: 3, color: "#dcdcdc" }}
      >
        <Toolbar />
        {select == 0 && <General me={me} />}
        {select == 1 && <Avatar me={me} />}
        {select == 2 && <Account me={me} />}
      </Box>
      </Box>
    </Box>
  );
}
