import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Soft green
    },
    secondary: {
      main: '#2196F3', // Soft blue
    },
    background: {
      default: '#f0f4f8', // Light grayish background
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
