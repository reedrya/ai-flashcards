'use client';
import { Container, Box, Typography, AppBar, Toolbar, Button, Grid } from '@mui/material';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Head from 'next/head';
import Link from 'next/link';
import getStripe from '@/utils/get-stripe';

export default function Home() {

  const handleCheckout = async (priceId) => {
    const stripe = await getStripe();  // Initialize Stripe
    try {
        const response = await fetch('/api/checkout_sessions', {  // Initiate request to your backend
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ priceId }),  // Pass the priceId from the button click
        });

        const session = await response.json();

        if (session.error) {  // Check if there's an error from the backend
            console.error('Stripe session creation failed:', session.error);
            alert(`Error: ${session.error}`);  // Show error message on the screen
            return;
        }

        const { error } = await stripe.redirectToCheckout({ sessionId: session.id });

        if (error) {  // Handle any errors during the Stripe redirection
            console.error('Stripe checkout error:', error.message);
            alert(`Error: ${error.message}`);  // Show error message on the screen
        }
    } catch (error) {
        console.error('Checkout error:', error.message);
        alert(`Error: ${error.message}`);  // Handle any other errors that occur
    }
};


  return (
    <Container maxWidth="md">
      <Head>
        <title>FlashBot - Your AI Study Partner</title>
        <meta name="description" content="Create flashcards from your text effortlessly." />
      </Head>

      {/* Updated Navbar with Shadow and Consistent Styling */}
      <AppBar position="static" sx={{ backgroundColor: '#333', boxShadow: '0px 0px 10px #00c6ff' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#00c6ff', fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 'bold' }}>
            FlashBot
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in" sx={{ color: '#7d4cdb', fontFamily: 'Roboto, Arial, sans-serif', textTransform: 'uppercase' }}>Login</Button>
            <Button color="inherit" href="/sign-up" sx={{ color: '#7d4cdb', fontFamily: 'Roboto, Arial, sans-serif', textTransform: 'uppercase' }}>Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
          textAlign: 'center',
          color: '#fff',
          fontFamily: 'Roboto, Arial, sans-serif'
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to FlashBot
        </Typography>
        <Typography variant="h6" gutterBottom>
          Who would have thought that quick and effective exam revision is just a click away?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            borderRadius: '20px',
            padding: '10px 30px',
            fontSize: '1rem',
            textTransform: 'uppercase',
            fontFamily: 'Roboto, Arial, sans-serif',
            '&:hover': {
              backgroundColor: '#005bb5',
            },
          }}
          component={Link}
          href="/generate"
        >
          Get Started
        </Button>
      </Box>

      {/* Features Section */}
      <Box sx={{ my: 8 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ color: '#00c6ff', fontFamily: 'Roboto, Arial, sans-serif', textAlign: 'center' }}>
              Easy Text Input
            </Typography>
            <Box sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: '#444',
              mt: 2,
              textAlign: 'center',
              color: '#fff',
              fontFamily: 'Roboto, Arial, sans-serif',
            }}>
              Simply copy and paste your text, click 'Generate', and your flashcards are ready.
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ color: '#00c6ff', fontFamily: 'Roboto, Arial, sans-serif', textAlign: 'center' }}>
              Smart Flashcards
            </Typography>
            <Box sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: '#444',
              mt: 2,
              textAlign: 'center',
              color: '#fff',
              fontFamily: 'Roboto, Arial, sans-serif',
            }}>
              FlashBot intelligently creates concise and effective flashcards from your notes.
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ color: '#00c6ff', fontFamily: 'Roboto, Arial, sans-serif', textAlign: 'center' }}>
              Accessible Anywhere
            </Typography>
            <Box sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: '#444',
              mt: 2,
              textAlign: 'center',
              color: '#fff',
              fontFamily: 'Roboto, Arial, sans-serif',
            }}>
              Study on any device, anytime, anywhere.
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ my: 8 }}>
        <Typography variant="h4" paddingBottom={4} sx={{ textAlign: 'center', color: '#fff', fontFamily: 'Roboto, Arial, sans-serif' }}>
          Pricing
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={5}>
            <Box sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: '#444',
              textAlign: 'center',
              color: '#fff',
              fontFamily: 'Roboto, Arial, sans-serif',
            }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#00c6ff' }}>Basic</Typography>
              <Typography variant="h6" gutterBottom>$5 / month</Typography>
              <Typography>
                Access basic features and limited storage.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => handleCheckout('price_1PqLAo2KXeNgEFae3Ug5HDSx')}
              >
                Choose Basic
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: '#444',
              textAlign: 'center',
              color: '#fff',
              fontFamily: 'Roboto, Arial, sans-serif',
            }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#00c6ff' }}>Pro</Typography>
              <Typography variant="h6" gutterBottom>$10 / month</Typography>
              <Typography>
                Get advanced features and extra storage.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => handleCheckout('price_1PqL3H2KXeNgEFaecGhil2DR')}
              >
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
