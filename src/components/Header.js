import React from 'react';
import { AppBar, Container, Toolbar, Typography, Select, MenuItem, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';
import icon from "../images/3888px-Cryptocurrency_Logo.svg.png";
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#fff', // White background color
    color: '#212121', // Black text color
    boxShadow: 'none', // Remove the default box-shadow
  },
  title: {
    flex: 1,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
  avatar: {
    marginRight: 10,
    cursor: 'pointer',
    width: 40,
    height: 40,
  },
  select: {
    border: '1px solid #212121', // Black border
    borderRadius: 4,
    color: '#212121', // Black text color
    width: 100,
    height: 40,
    marginRight: 15,
    '& .MuiSelect-selectMenu': {
      paddingLeft: 10,
    },
  },
  menuItem: {
    backgroundColor: '#fff', // White background color for menu items
    color: '#212121', // Black text color for menu items
  },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const { currency, setCurrency, user } = CryptoState();

  return (
    <AppBar className={classes.appBar} position="static">
      <Container>
        <Toolbar>
          <Avatar
            onClick={() => history.push("/")}
            className={classes.avatar}
            src={icon}
          />
          <Typography
            onClick={() => history.push("/")}
            variant="h6"
            className={classes.title}
          >
            Crypto Tracker
          </Typography>
          <Select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            variant="outlined"
            className={classes.select}
            classes={{
              icon: classes.menuItem,
              selectMenu: classes.menuItem,
            }}
          >
            <MenuItem value={"USD"} className={classes.menuItem}>
              USD
            </MenuItem>
            <MenuItem value={"INR"} className={classes.menuItem}>
              INR
            </MenuItem>
          </Select>
          {user ? <UserSidebar /> : <AuthModal />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
