import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import {
  Container,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  makeStyles,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Banner/Carousel";
import { Pagination } from "@material-ui/lab";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page,setPage] =useState(1);
  const navigate = useNavigate();


  const { currency ,symbol} = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
  useEffect(() => {
    return fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#ccffff",
      },
      type: "dark",
    },
  });
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  const useStyles = makeStyles(() => ({
    row:{
      backgroundColor: "#131111",
      cursor: "pointer",
      "&:hover":{
        backgroundColor: "#16171a",

      },
      
    },
    pagination:{
      "& .MuiPaginationItem-root":{
        color : "#ccffff",
      },
    }
  }));
  const classes = useStyles();
  

 
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" style={{ margin: 18 }}>
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          label="Search For Crypto Curruncy.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress
              style={{ backgroundColor: "#ccffff" }}
            ></LinearProgress>
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#ccffff", border:"1px solid white" }}>
                <TableRow>
                  {["Coins", "Price", "24hr Change", "Market Cap"].map(
                    (head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                        }}
                        key={head}
                        align={head === "Coins" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>

              <TableBody style={{border:"1px solid white" }}>
                {handleSearch().slice((page-1)*10,(page-1)*10+10).map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      className={classes.row}
                      key={row.name}
                      
                    >
                      <TableCell component="th" scope="row" style={{display:"flext" ,gap:15,}}>
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10 }}
                        />
                      
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span
                          style={{ textTransform: "uppercase", fontSize: 22 }}
                        >
                          {row.symbol}
                        </span>
                        <span style={{ color: "darkgrey" }}>{row.name}</span>
                      </div>
                      </TableCell>
                      <TableCell align="right" >
                      {symbol} {" "}
                      {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell align="right" style={{color: profit> 0? "rgba(14,203,129)":"red", fontWeight:500}}>
                      {profit&& "+"}
                      {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right" >
                      {symbol} {" "}
                      {numberWithCommas(row.market_cap.toString().slice(0.-6))}M
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent:"center",
        }}
        shape="rounded"
        classes={{ul: classes.pagination}}
        count={(handleSearch()?.length/10).toFixed(0)}
        onChange={(_,value)=>{
          setPage(value);
          window.scroll(0,450);
        }}
        >
        </Pagination>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;