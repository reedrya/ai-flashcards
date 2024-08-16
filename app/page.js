import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Typography, Container, Button, Box, Grid } from "@mui/material";
import Head from 'next/head'

export default function Home() {
  return (
     <Container maxWidth="100vw">
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box textAlign="center" marginTop={4}>
        <Typography variant="h2" gutterBottom>Welcome to Flashcard SaaS</Typography>
        <Typography variant="h5" gutterBottom>
          {' '}
          The easiest way to make flashcards from text
        </Typography>
        <Button variant="contained" color='primary' sx = {{mt: 2}}>
          Get Started
        </Button>
      </Box>

      <Box sx = {{my: 6}}>
        <Typography variant = "h4" paddingBottom={3}>
          Features
        </Typography>
        <Grid container spacing = {4}>
          <Grid item xs = {12} md = {4}>
            <Typography variant = "h6">Easy Text Input</Typography>
            <Typography>
              {' '}
              Simply input your text and let our software do the rest.
            </Typography>
          </Grid>

          <Grid item xs = {12} md = {4}>
            <Typography variant = "h6">Smart Flashcards</Typography>
            <Typography>
              {' '}
              Our AI intelligently breaks down your text into concise flashcards, 
              perfect for studying.
            </Typography>
          </Grid>
          <Grid item xs = {12} md = {4}>
            <Typography variant = "h6">Accessible Anywhere</Typography>
            <Typography>
              {' '}
              Access your flashcards from any device, at any time.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{my: 6, textAlign: 'center'}}>
        <Typography variant = "h4" paddingBottom={3}>Pricing</Typography>
        <Grid container spacing = {4}>
          <Grid item xs = {12} md = {6}>
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>5$ / month</Typography>
              <Typography>
                {' '}
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained" color="primary" sx={{mt: 2}}>
                Choose Basic
              </Button>
            </Box>
          </Grid>
          <Grid item xs = {12} md = {6}>
          <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>$10 / month</Typography>
              <Typography>
                {' '}
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained" color="primary" sx={{mt: 2}}>
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
     </Container>
  )
}
