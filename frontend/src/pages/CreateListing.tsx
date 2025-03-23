import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const CreateListing: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    language: '',
    codeSnippet: '',
    tags: [] as string[],
  });
  const [currentTag, setCurrentTag] = useState('');
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLanguageChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      language: e.target.value,
    }));
  };

  const handleAddTag = () => {
    if (currentTag && !formData.tags.includes(currentTag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag],
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/listings', {
        ...formData,
        price: parseFloat(formData.price),
      });
      navigate(`/listings/${response.data.listing._id}`);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error creating listing');
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Listing
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            margin="normal"
            required
            inputProps={{ min: 0, step: 0.01 }}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Programming Language</InputLabel>
            <Select
              value={formData.language}
              label="Programming Language"
              onChange={handleLanguageChange}
            >
              <MenuItem value="JavaScript">JavaScript</MenuItem>
              <MenuItem value="Python">Python</MenuItem>
              <MenuItem value="Java">Java</MenuItem>
              <MenuItem value="C++">C++</MenuItem>
              <MenuItem value="Ruby">Ruby</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Code Snippet"
            name="codeSnippet"
            value={formData.codeSnippet}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={8}
            required
          />
          <Box sx={{ mt: 2, mb: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                label="Add Tags"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                size="small"
              />
              <Button
                variant="outlined"
                onClick={handleAddTag}
                disabled={!currentTag}
              >
                Add Tag
              </Button>
            </Stack>
            <Box sx={{ mt: 1 }}>
              {formData.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  sx={{ mr: 1, mt: 1 }}
                />
              ))}
            </Box>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 3 }}
          >
            Create Listing
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateListing; 