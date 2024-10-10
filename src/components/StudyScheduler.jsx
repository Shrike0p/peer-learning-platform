import React, { useState } from 'react';
import { Button, Container, Typography, Paper, Box } from '@mui/material';
import DateTimePicker from 'react-datetime-picker';

const StudyScheduler = () => {
  const [date, setDate] = useState(new Date());

  const handleSchedule = () => {
    console.log('Study session scheduled for:', date);
    // Here you can add navigation to a confirmation page or dashboard
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Paper elevation={4} style={{ padding: '30px', textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Select a Mutual Study Time
        </Typography>
        
        <Box marginTop="20px">
          <DateTimePicker onChange={setDate} value={date} />
        </Box>

        <Box marginTop="30px">
          <Button variant="contained" color="primary" onClick={handleSchedule}>
            Confirm Study Schedule
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default StudyScheduler;
