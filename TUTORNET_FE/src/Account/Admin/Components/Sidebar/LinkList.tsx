import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Dashboard } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PaymentIcon from '@mui/icons-material/Payment';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import LogoutIcon from '@mui/icons-material/Logout';
import { Font } from '../../../../Components/CSS/CSS';
import Badge from '@mui/material/Badge';
import '../../css/Admin.css'
import { Link, useNavigate } from 'react-router-dom';

export default function LinkList() {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const user = () => {
    navigate('/admin/user');
  };
  const payment = () => {
    navigate('/admin/payment');
  };
  const dashboard = () => {
    navigate('/admin');
  };
  const AdsManage = () => {
    navigate('/admin/ads');
  };
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 230, bgcolor: 'background.paper', fontFamily: Font.PrimaryFont }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
        </ListSubheader>
      }
    ><br />
      <ListItemButton className='active' onClick={dashboard} >
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary={<span style={{ fontFamily: Font.PrimaryFont }}>Dashboard</span>} />
      </ListItemButton>
      <br />
      <br />
      <ListItemButton onClick={user}>
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary={<span style={{ fontFamily: Font.PrimaryFont }}>Users</span>} />
      </ListItemButton>

      <br />
      <br />
      <ListItemButton onClick={payment}>
        <ListItemIcon>
          <Badge badgeContent={1} color="success">
            <PaymentIcon />

          </Badge>
        </ListItemIcon>
        <ListItemText primary={<span style={{ fontFamily: Font.PrimaryFont }}>Payment</span>} />
      </ListItemButton>
      {/* <br />
      <ListItemButton>
        <ListItemIcon>
          <Badge badgeContent={4} color="error">
            <InboxIcon />
          </Badge>
        </ListItemIcon>
        <ListItemText primary={<span style={{ fontFamily: Font.PrimaryFont }}>Inbox</span>} />
      </ListItemButton> */}

      <br />
      <br />
      <ListItemButton onClick={AdsManage}>
        <ListItemIcon>
          <AddBoxIcon />
        </ListItemIcon>
        <ListItemText primary={<span style={{ fontFamily: Font.PrimaryFont }}>ADS Mange</span>} />
      </ListItemButton>
      <br />
      <br />

      <ListItemButton>
        <ListItemIcon>
          <AddAlertIcon />
        </ListItemIcon>
        <ListItemText primary={<span style={{ fontFamily: Font.PrimaryFont }}>Notification</span>} />
      </ListItemButton>
      <br />
      <br />

      <Link to='/' >  <ListItemButton>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary={<span style={{ fontFamily: Font.PrimaryFont }}>Logout</span>} />
      </ListItemButton></Link>

    </List>
  );
}
