import React from 'react';
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material';
import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <Container>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#2C2C2C',
          boxShadow: '0 4px 15px rgba(0, 114, 255, 0.4)',
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#00c6ff', fontWeight: 'bold' }}>
            FlashBot
          </Typography>
          <Button color="inherit" sx={{ color: '#fff' }}>
            <Link href="/sign-in" passHref>
              Login
            </Link>
          </Button>
          <Button color="inherit" sx={{ color: '#fff' }}>
            <Link href="/sign-up" passHref>
              Sign Up
            </Link>
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          textAlign: 'center',
          my: 4,
          color: '#fff',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textShadow: '0px 0px 10px rgba(255,255,255,0.8)' }}
        >
          Sign Up
        </Typography>
        <SignUp />
      </Box>
    </Container>
  );
}
