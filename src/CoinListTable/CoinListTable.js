import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoinList } from '../Redux/coinSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import CoinDetailsModal from '../CoinDetailsModal/CoinDetailsModal';

const CoinListTable = () => {
  const dispatch = useDispatch();
  const coins = useSelector((state) => state.coins.coins);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    dispatch(fetchCoinList());
  }, [dispatch]);

  useEffect(() => {
    setFilteredCoins(coins);
  }, [coins]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearch(searchTerm);
    setFilteredCoins(coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm)));
  };

  const handleSort = (column) => {
    const sortedCoins = [...filteredCoins].sort((a, b) => {
      if (column === 'priceUsd') {
        return parseFloat(a[column]) - parseFloat(b[column]);
      }
      return a[column].localeCompare(b[column]);
    });
    setFilteredCoins(sortedCoins);
  };

  const handleOpenModal = (coin) => {
    setSelectedCoin(coin);
  };

  const handleCloseModal = () => {
    setSelectedCoin(null);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={() => dispatch(fetchCoinList())} style={{ marginBottom: 20 }}>
        Refresh
      </Button> */}
      <TextField
        value={search}
        onChange={handleSearch}
        placeholder="Search Coins"
        variant="outlined"
        style={{ marginBottom: 20, marginLeft:15 }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort('rank')} style={{ cursor: 'pointer' }}>
                Rank
              </TableCell>
              <TableCell onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                Name
              </TableCell>
              <TableCell onClick={() => handleSort('priceUsd')} style={{ cursor: 'pointer' }}>
                Price (USD)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCoins.map((coin) => (
              <TableRow key={coin.id} onClick={() => handleOpenModal(coin)} style={{ cursor: 'pointer' }}>
                <TableCell>{coin.rank}</TableCell>
                <TableCell>{coin.name}</TableCell>
                <TableCell>${parseFloat(coin.priceUsd).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedCoin && (
        <CoinDetailsModal coin={selectedCoin} open={Boolean(selectedCoin)} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default CoinListTable;
