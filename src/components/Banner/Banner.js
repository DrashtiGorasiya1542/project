import { Container, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel';

const useStyles=makeStyles(() =>( {
    banner: {
        backgroundImage: "url(./banner4.jpg)",
        backgroundSize: "100% 100%",
        
    },
    bannerContent:{
        height: 400,
        display:"flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagline:{
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    },
}))
const Banner = () => {
    const classes =useStyles();
  return (
    <div className={classes.banner}>
    <Container className={classes.bannerContent}>
    <div className={classes.tagline}>
    <Typography
    variant='h4'
    style={{
        fontWeight:"bold",
        marginBottom: 15,

    }}>
    Cryptocurrency Price Tracker
    </Typography>
    <Typography
    variant='subtitle2'
    style={{
        color: "darkgrey",
        textTransform: "capitalize",

    }}>
    Get all the Info regarding your favorite Crypto Curruncy.
    </Typography>
    </div>

     <Carousel></Carousel>
    </Container>
      
    </div>
  )
}

export default Banner
