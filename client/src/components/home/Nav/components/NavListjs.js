import * as React from 'react';
import { navListRes } from '../../../constant';

import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Drawer, Link, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

export default function TemporaryDrawer({ state, setState }) {

    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
    const list = (anchor) => (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {navListRes.map((list, index) => (
            <Link key={index} href={list.href} style={{ color: '#333', textDecoration: 'none' }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {list.icon}
                  </ListItemIcon>
                  <ListItemText primary={list.title} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        {/* <Divider /> */}
      </Box>
    );
  
    return (
      <div>
            <Drawer
              left={'left'}
              open={state['left']}
              onClose={toggleDrawer('left', false)}
            >
              {list('left')}
            </Drawer>
      </div>
    );
  }
  