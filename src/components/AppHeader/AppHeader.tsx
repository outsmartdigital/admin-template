import React, { useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import InfoIcon from '@material-ui/icons/Info'
import HomeIcon from '@material-ui/icons/Home'
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'

import UserMenuSection from './UserMenuSection'
import CustomLink from '../CustomLink/CustomLink'

export const AppHeader: React.FC = () => {
  const [drawerToggle, setDrawerToggle] = useState(false)
  const toggleDrawer = () => setDrawerToggle(!drawerToggle)

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon htmlColor="#fff" />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" open={drawerToggle} onClose={toggleDrawer}>
        <Box>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Divider />
        <List component="nav">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>
              <CustomLink href="/">
                <Typography>Home</Typography>
              </CustomLink>
            </ListItemText>
          </ListItem>
          {/* USER SECTION */}
          <UserMenuSection />
          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText>
              <CustomLink href="/about" as="/sobre">
                <Typography>About</Typography>
              </CustomLink>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}
