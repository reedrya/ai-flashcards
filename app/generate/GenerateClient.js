'use client';

import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { doc, collection, getDoc, writeBatch } from 'firebase/firestore';
import { db } from '../../firebase'; // Ensure this path is correct
import { useRouter } from 'next/navigation'; // Note the change here

export default function GenerateClient() {
  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [setName, setSetName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter(); // Using useRouter within a client component

  const handleSubmit = async () => {
    setError(null); // Clear any previous errors
    if (!text.trim()) {
      setError('Please enter some text to generate flashcards.');
      return;
    }

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ text }), // Ensure the body is JSON stringified
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to generate flashcards');
      }

      const data = await response.json();
      console.log('Generated flashcards:', data); // Log the data
      setFlashcards(data.flashcards || []); // Ensure flashcards is set properly
    } catch (error) {
      console.error('Error generating flashcards:', error);
      setError('An error occurred while generating flashcards. Please try again.');
    }
  };

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const saveFlashcards = async () => {
    setError(null); // Clear any previous errors
    if (!setName.trim()) {
      setError('Please enter a name for your flashcard set.');
      return;
    }

    try {
      const userDocRef = doc(collection(db, 'users'), 'user-id'); // Replace 'user-id' with actual user ID
      const userDocSnap = await getDoc(userDocRef);

      const batch = writeBatch(db);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedSets = [...(userData.flashcardSets || []), { name: setName }];
        batch.update(userDocRef, { flashcardSets: updatedSets });
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] });
      }

      const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName);
      batch.set(setDocRef, { flashcards });

      await batch.commit();

      alert('Flashcards saved successfully!');
      handleCloseDialog();
      setSetName('');
    } catch (error) {
      console.error('Error saving flashcards:', error);
      setError('An error occurred while saving flashcards. Please try again.');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Generate Flashcards
        </Typography>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ 
            mb: 2,
            // Text color
            '& .MuiInputBase-input': {
              color: 'white',
            },
            // Outline color
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.5)', 
              },
              // Outline color on hover
              '&:hover fieldset': {
                borderColor: 'white', 
              },
              // Outline color when focused
              '&.Mui-focused fieldset': {
                borderColor: 'white', 
              },
            },
            // Label color
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.5)', 
            },
            // Label color when focused
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'white', 
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Generate Flashcards
        </Button>
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>

      {flashcards.length > 0 && (
        <>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Generated Flashcards
            </Typography>
            <Grid container spacing={2}>
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Front:</Typography>
                      <Typography>{flashcard.front}</Typography>
                      <Typography variant="h6" sx={{ mt: 2 }}>Back:</Typography>
                      <Typography>{flashcard.back}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleOpenDialog}>
              Save Flashcards
            </Button>
          </Box>
        </>
      )}

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Save Flashcard Set</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcard set.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Set Name"
            type="text"
            fullWidth
            value={setName}
            onChange={(e) => setSetName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={saveFlashcards} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
