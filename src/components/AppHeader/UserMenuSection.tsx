import React, { useState } from 'react'
import PeopleIcon from '@material-ui/icons/People'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Typography, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core'
import CustomLink from '../CustomLink/CustomLink'

export interface UserMenuSectionProps {}

const UserMenuSection: React.FC<UserMenuSectionProps> = () => {
  const [isUsersExpanded, setIsUsersExpanded] = useState(false)
  const toggleUsersExpansion = () => setIsUsersExpanded(!isUsersExpanded)

  return (
    <section>
      <ListItem button onClick={toggleUsersExpansion}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
        {isUsersExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={isUsersExpanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button>
            <ListItemText>
              <CustomLink href={'/users/manageUsers'}>
                <Typography>Manage Users</Typography>
              </CustomLink>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>
              <CustomLink href={'/users/manageAccess'}>
                <Typography>Manage access</Typography>
              </CustomLink>
            </ListItemText>
          </ListItem>
        </List>
      </Collapse>
    </section>
  )
}

export default UserMenuSection
