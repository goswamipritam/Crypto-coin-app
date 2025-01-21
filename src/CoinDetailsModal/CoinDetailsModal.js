import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCoinDetails, updateCoin } from '../Redux/coinSlice';
import { addToCart } from '../Redux/cartSlice';
import { Modal, Box, TextField, Button, CircularProgress } from '@mui/material';

const CoinDetailsModal = ({ coin, open, onClose }) => {
  const [coinDetails, setCoinDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (coin) {
      setLoading(true);
      dispatch(fetchCoinDetails(coin.id))
        .then((response) => {
          setCoinDetails(response.payload);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [coin, dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCoinDetails({
      ...coinDetails,
      [name]: value,
    });
  };

  const handleSave = () => {
    if (coinDetails) {
      dispatch(updateCoin(coinDetails));
    }
    onClose();
  };

  const handleAddToCart = () => {
    if (coinDetails) {
      dispatch(addToCart(coinDetails));
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 2, backgroundColor: 'white', margin: '100px auto', width: '400px', borderRadius: '10px' }}>
        {loading ? (
          <CircularProgress />
        ) : coinDetails ? (
          <>
            <h2>{coinDetails.name} Details</h2>
            <TextField
              label="Name"
              name="name"
              value={coinDetails.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price (USD)"
              name="priceUsd"
              value={coinDetails.priceUsd}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
            <Button variant="contained" color="primary" onClick={handleAddToCart} style={{ marginLeft: 10 }}>
              Add to Cart
            </Button>
          </>
        ) : (
          <p>Error loading coin details</p>
        )}
      </Box>
    </Modal>
  );
};

export default CoinDetailsModal; 

