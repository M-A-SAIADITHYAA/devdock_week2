import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  IconButton,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

interface CartItem {
  _id: string;
  listing: {
    _id: string;
    title: string;
    price: number;
    language: string;
  };
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [isAuthenticated, navigate]);

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cart');
      setCartItems(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching cart items');
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (listingId: string, quantity: number) => {
    try {
      await axios.put(`http://localhost:5000/api/cart/${listingId}`, { quantity });
      fetchCart();
    } catch (error) {
      setError('Error updating quantity');
    }
  };

  const handleRemoveItem = async (listingId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${listingId}`);
      fetchCart();
    } catch (error) {
      setError('Error removing item from cart');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.listing.price * item.quantity;
    }, 0);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Shopping Cart
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {cartItems.length === 0 ? (
          <Typography variant="body1">Your cart is empty</Typography>
        ) : (
          <>
            {cartItems.map((item) => (
              <Paper key={item._id} elevation={1} sx={{ p: 2, mb: 2 }}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">{item.listing.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Language: {item.listing.language}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography variant="body1">
                      ${item.listing.price}
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sm={2}>
                    <TextField
                      type="number"
                      size="small"
                      value={item.quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value > 0) {
                          handleUpdateQuantity(item.listing._id, value);
                        }
                      }}
                      inputProps={{ min: 1 }}
                    />
                  </Grid>
                  <Grid item xs={4} sm={2}>
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveItem(item.listing._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            ))}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" align="right" gutterBottom>
                Total: ${calculateTotal().toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={() => {
                  // Implement checkout functionality
                  alert('Checkout functionality will be implemented here');
                }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Cart; 