import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  Chip,
  Alert,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  language: string;
  codeSnippet: string;
  tags: string[];
  seller: {
    username: string;
    email: string;
  };
}

const ListingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/listings/${id}`);
      setListing(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching listing details');
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/cart/add', {
        listingId: id,
        quantity: 1,
      });
      navigate('/cart');
    } catch (error) {
      setError('Error adding item to cart');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!listing) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          Listing not found
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Typography variant="h4" gutterBottom>
          {listing.title}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="body1" paragraph>
              {listing.description}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Code Preview:
              </Typography>
              <Paper
                sx={{
                  p: 2,
                  backgroundColor: '#f5f5f5',
                  maxHeight: '300px',
                  overflow: 'auto',
                }}
              >
                <pre style={{ margin: 0 }}>
                  <code>{listing.codeSnippet}</code>
                </pre>
              </Paper>
            </Box>
            <Box sx={{ mb: 2 }}>
              {listing.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h5" color="primary" gutterBottom>
                ${listing.price}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Language: {listing.language}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Seller: {listing.seller.username}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleAddToCart}
                sx={{ mt: 2 }}
              >
                Add to Cart
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ListingDetails; 