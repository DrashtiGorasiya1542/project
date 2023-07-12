import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Switch,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { CryptoState } from "../CryptoContext";
const useStyles = makeStyles(()=>({
  title:{
    flex:1,
    cursor: "pointer",
  }
}))

const Header = ({check , change}) => {
  
  const classes=useStyles();
  const {currency,setCurrency}= CryptoState();

  return (
    
    <AppBar color="transparent" position="satic">
      <Container>
        <Toolbar>
          <Typography className={classes.title} variant="h6" >Cryptocurrency Price Tracker</Typography>
          <Select 
            variant="outlined"
            style={{
              width: 100,
              height: 40,
              marginRight: 15,
            }}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}>
            
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'INR'}>INR</MenuItem>
          </Select>

          <Switch
          defaultChecked
          color="default"
          inputProps={{ 'aria-label': 'switch demo' }}
          onChange={change}
          checked={check}
        />
        </Toolbar>
      </Container>
    </AppBar>

  );
};

export default Header;
