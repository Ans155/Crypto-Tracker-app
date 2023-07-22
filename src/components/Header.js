import React from 'react'
import { AppBar,Container,Toolbar,Typography,Select,MenuItem, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';
import icon from "../images/3888px-Cryptocurrency_Logo.svg.png";
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';


const useStyles=makeStyles(() => ({
  title:
  {
    flex:1,
    color: "purple",
    fontFamily: "Montserrat",
    fontWeight:"bold",
    cursor:"pointer",

  }
 

}));

const Header = () => {

  const classes= useStyles();
  const history=useHistory();
  const { currency, setCurrency } = CryptoState();
  return (
    <AppBar color="white" position="static">
      <Container>
        <Toolbar>
        <Avatar 
        onClick={() => history.push("/")}
        style={{
          marginRight:10,
        }}
        src={icon}/>
          <Typography 
          onClick={() => history.push("/")} 
          className={classes.title}>
            Crypto Tracker
          </Typography>
          <Select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            variant="outlined"
            style={{
              border: '1px solid rgba(0, 0, 0, 2)',
              
              borderBlockColor:"black",
              color:"black",
              width:100,
              height:40,
              marginRight:15,
            }}>
            <MenuItem value={"USD"}>
              USD
            </MenuItem>
            <MenuItem value={"INR"}>
              INR
            </MenuItem>
          </Select>
          <AuthModal/>

        </Toolbar>
      </Container>

    </AppBar>
   
  )
}

export default Header