import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../Redux/cartSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * parseFloat(item.priceUsd), 0);

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemove = () => {
    if (itemToRemove) {
      dispatch(removeFromCart(itemToRemove));
    }
    setConfirmDialogOpen(false);
    setItemToRemove(null);
  };

  const openConfirmDialog = (id) => {
    setItemToRemove(id);
    setConfirmDialogOpen(true);
  };

  return (
    <>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price (USD)</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>${parseFloat(item.priceUsd).toFixed(2)}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                    style={{ width: '60px' }}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => openConfirmDialog(item.id)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div style={{ padding: 20 }}>
          <h3>Total Quantity: {totalQuantity}</h3>
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          <Button variant="contained" color="primary" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </Button>
        </div>
      </TableContainer>

      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to remove this item from the cart?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRemove} color="secondary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CartPage;
