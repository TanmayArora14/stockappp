import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid, Typography, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(10),
  },
  title: {
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },
  line: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: theme.spacing(2, 0),
  },
  table: {
    width: "100%",
    "& th, td": {
      padding: theme.spacing(1), // Adjust padding as needed
    },
  },
  error: {
    color: "red",
  },
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();

  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stockData, setStockData] = useState<{
    [symbol: string]: { name: string; price: number };
  }>({});
  const [newSymbol, setNewSymbol] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://stockappp-u4ue.onrender.com/api/watchlist",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (Array.isArray(response.data.watchlist.symbols)) {
          setWatchlist(response.data.watchlist.symbols);
          setLoading(false);
        } else {
          setError("Invalid data format for watchlist");
          setLoading(false);
        }
      } catch (error) {
        setError("Failed to fetch watchlist");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const token = localStorage.getItem("token");
        let allSymbols = [...watchlist, newSymbol];
        allSymbols.filter((s) => s.trim() !== "");
        const promises = allSymbols
          .slice(0, allSymbols.length - 1)
          .map(async (symbol, index) => {
            const response = await axios.get(
              `https://stockappp-u4ue.onrender.com/api/stock/${symbol}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            return { symbol, data: response.data };
          });
        const data = await Promise.all(promises);
        const stockInfo = data.reduce((acc, { symbol, data }) => {
          acc[symbol] = {
            name: data["Meta Data"]["2. Symbol"],
            price: parseFloat(
              data["Time Series (1min)"][
                Object.keys(data["Time Series (1min)"])[0]
              ]["4. close"]
            ),
          };
          return acc;
        }, {} as { [symbol: string]: { name: string; price: number } });
        setStockData(stockInfo);
      } catch (error) {
        setError("Failed to fetch stock information");
      }
    };
    if (watchlist.length > 0 || newSymbol !== "") {
      fetchStockData();
    }
  }, [watchlist, newSymbol]);

  const addToWatchlist = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://stockappp-u4ue.onrender.com/api/watchlist",
        { symbol: newSymbol },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWatchlist((prevWatchlist) => [...prevWatchlist, newSymbol]);
      setNewSymbol("");
    } catch (error) {
      setError("Failed to add symbol to watchlist");
    }
  };

  const removeFromWatchlist = async (symbol: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://stockappp-u4ue.onrender.com/api/watchlist/${symbol}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setWatchlist((prevWatchlist) =>
        prevWatchlist.filter((item) => item !== symbol)
      );
    } catch (error) {
      setError("Failed to remove symbol from watchlist");
    }
  };

  return (
    <div>
      <h1 className={classes.title}>Dashboard</h1>
      <div className={classes.line}></div>
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={6}>
          <div>
            <Typography variant="h6">Add Symbol to Watchlist</Typography>
            <TextField
              type="text"
              value={newSymbol}
              onChange={(e) => setNewSymbol(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={addToWatchlist}
            >
              Add
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography variant="body1" className={classes.error}>
              {error}
            </Typography>
          ) : (
            <div>
              <Typography variant="h6">Stock Information</Typography>
              <table className={classes.table}>
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {watchlist.map((symbol) => (
                    <tr key={symbol}>
                      <td>{symbol}</td>
                      <td>{stockData[symbol]?.name}</td>
                      <td>{stockData[symbol]?.price}</td>
                      <td>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => removeFromWatchlist(symbol)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
