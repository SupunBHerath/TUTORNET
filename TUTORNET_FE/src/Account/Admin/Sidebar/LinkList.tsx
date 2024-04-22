import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Dashboard } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import PaymentIcon from '@mui/icons-material/Payment';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import LogoutIcon from '@mui/icons-material/Logout';
import { Font } from '../../../Components/CSS/CSS';
import Badge from '@mui/material/Badge';
import '../css/Admin.css'

export default function LinkList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', fontFamily: Font.PrimaryFont }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {/* Nested List Items */}
        </ListSubheader>
      }
    >
      <ListItemButton className='active' >
        <ListItemIcon>
          <Dashboard/>
        </ListItemIcon>
        <ListItemText  primary={<span style={{fontFamily:Font.PrimaryFont}}>Dashboard</span>}/>
      </ListItemButton>
      <br />

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText  primary={<span style={{fontFamily:Font.PrimaryFont}}>Users</span>}/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText  primary={<span style={{fontFamily:Font.PrimaryFont}}>View</span>}/>
          </ListItemButton>
        </List>
      </Collapse>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText  primary={<span style={{fontFamily:Font.PrimaryFont}}>Add</span>}/>
          </ListItemButton>
        </List>
      </Collapse>
      <br />
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
        <Badge badgeContent={1} color="success">
        <PaymentIcon />
          
          </Badge>
        </ListItemIcon>
        <ListItemText  primary={<span style={{fontFamily:Font.PrimaryFont}}>Payment</span>}/>
      </ListItemButton>
      <br />
      <ListItemButton>
        <ListItemIcon>
        <Badge badgeContent={4} color="error">
          <InboxIcon />
        </Badge>
        </ListItemIcon>
        <ListItemText  primary={<span style={{fontFamily:Font.PrimaryFont}}>Inbox</span>}/>
      </ListItemButton>
     
      <br />
      <ListItemButton>
        <ListItemIcon>
          <AddBoxIcon />
        </ListItemIcon>
        <ListItemText  primary={<span style={{fontFamily:Font.PrimaryFont}}>ADS Mange</span>}/>
      </ListItemButton>
      <br />

      <ListItemButton>
        <ListItemIcon>
          <AddAlertIcon />
        </ListItemIcon>
        <ListItemText  primary={<span style={{fontFamily:Font.PrimaryFont}}>Notification</span>}/>
      </ListItemButton>
      <br />

      <ListItemButton>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText  primary={<span style={{fontFamily:Font.PrimaryFont}}>Logout</span>}/>
      </ListItemButton>

    </List>
  );
}
