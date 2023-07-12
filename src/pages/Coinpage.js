import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin, marketsDetails } from "../config/api";
import {
  LinearProgress,
  ThemeProvider,
  Typography,
  makeStyles,
} from "@material-ui/core";
import HTMLReactParser from "html-react-parser";
import { numberWithCommas } from "../components/Banner/Carousel";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import showStore from "../components/showStore";

const Coinpage = () => {
  let { id } = useParams();
  const [coin, setCoin] = useState();
  const store = showStore();
  const params = useParams();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    slidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
    },
    description: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },

    marketData: {
      display: "flex",
      justifyContent: "space-around",
      padding:25,
      width: "100%",
      // Making it responsive
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignltems: " center ",
      },
      [theme.breakpoints.down("xs ")]: {
        alignltems: "start",
      },
    },
  }));
  const classes = useStyles();

  if (!coin) {
    <LinearProgress style={{ backgroundColor: "#ccffff" }} />;
  }
  React.useEffect(() => {
    store.fetchData(params.id);
  }, []);
  return (
    <div className={classes.container}>
      <img
        src={coin?.image.large}
        alt={coin?.name}
        height="200"
        style={{ marginBottom: 20 }}
      />
      <Typography variant="h3" className={classes.heading}>
        {coin?.name}
      </Typography>
      <Typography variant="subtitlel" className={classes.description}>
        {HTMLReactParser(String(coin?.description.en.split(". ")[0]))}.
      </Typography>

      <div className={classes.marketData}>
        <span style={{ display: "flex" }}>
          <Typography variant="h5">Market cap Rank:</Typography>
          &nbsp; &nbsp;
          <Typography variant="h5">{coin?.market_cap_rank}</Typography>
        </span>

        <span style={{ display: "flex" }}>
          <Typography variant="h5">Currunt Price:</Typography>
          &nbsp; &nbsp;
          <Typography variant="h5">
            {symbol}{" "}
            {numberWithCommas(
              coin?.market_data.current_price[currency.toLowerCase()] ?? ""
            )}
          </Typography>
        </span>

        <span style={{ display: "flex" }}>
          <Typography variant="h5">Rank:</Typography>
          &nbsp; &nbsp;
          <Typography variant="h5">
            {symbol}{" "}
            {numberWithCommas(
              coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6) ?? ""
            )}
            M
          </Typography>
        </span>
        <span style={{ display: "flex" }}>
          <Typography variant="h5">Price Change in 24h:</Typography>
          &nbsp; &nbsp;
          <Typography variant="h5">
            {coin?.market_data.price_change_24h}
          </Typography>
        </span>
      </div>
      <AreaChart
        width={500}
        height={400}
        data={store.graphData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </div>
  );
};

export default Coinpage;
