import React, { useState, useEffect } from 'react';
import { Typography, Container, Grid, Tooltip, Checkbox, Paper, Box, Button } from '@mui/material';
import { green } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import './MatchPage.css'; // Import custom styles

// Study plan for the month of October
const studyPlan = {
  1: { morning: "Basic Maths", evening: "HTML" },
  2: { morning: "Arrays", evening: "HTML Tags" },
  3: { morning: "Prefix Sum", evening: "CSS" },
  4: { morning: "Strings", evening: "CSS" },
  5: { morning: "Linked Lists", evening: "JavaScript" },
  31: { morning: "Dynamic Programming", evening: "React" },
  // Add more study plans as needed...
};

// Helper function to calculate the remaining time for the countdown
const calculateTimeLeft = (sessionTime) => {
  const now = new Date().getTime();
  const difference = sessionTime - now;

  let timeLeft = {};
  if (difference > 0) {
    timeLeft = {
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const MatchPage = () => {
  const [sessionTime] = useState(new Date().getTime() + 1 * 10 * 1000); // Set the session time (2 minutes from now)
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(sessionTime)); // Calculate the initial countdown time
  const [canJoin, setCanJoin] = useState(false); // Track if the user can join the room
  const [completedDays, setCompletedDays] = useState({}); // Track completed study days
  const navigate = useNavigate(); // For navigation

  // Update the countdown timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(sessionTime);
      setTimeLeft(newTimeLeft);

      // Check if the countdown is complete
      if (newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        setCanJoin(true); // Enable join button once the countdown is over
        clearInterval(timer); // Stop the timer
      }
    }, 1000);

    return () => clearInterval(timer); // Clear interval on component unmount
  }, [sessionTime]);

  // Toggle the completion status of a specific day
  const toggleCompletion = (day) => {
    setCompletedDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  // Render a calendar day
  const renderDay = (day) => {
    const isCompleted = completedDays[day];
    const plan = studyPlan[day] || { morning: "No plan", evening: "No plan" };

    return (
      <Grid item xs={2} key={day} style={{ textAlign: 'center' }}>
        <Tooltip
          title={
            <div className="tooltip-content">
              <strong className="tooltip-day">Day {day} Plan</strong>
              <div className="tooltip-plan">
                <Typography variant="h6"><strong>Morning:</strong> {plan.morning}</Typography>
                <Typography variant="h6"><strong>Evening:</strong> {plan.evening}</Typography>
              </div>
            </div>
          }
          arrow
          placement="top"
        >
          <div
            className={`calendar-day ${isCompleted ? 'completed' : ''}`}
            onClick={() => toggleCompletion(day)}
          >
            <h3>Oct {day}</h3>
            <Checkbox
              checked={isCompleted || false}
              onChange={() => toggleCompletion(day)}
              color="default"
            />
          </div>
        </Tooltip>
      </Grid>
    );
  };

  // Generate the days for October
  const daysOfOctober = [];
  for (let day = 1; day <= 31; day++) {
    daysOfOctober.push(renderDay(day));
  }

  // Render the countdown banner
  const renderCountdownBanner = () => {
    if (timeLeft.minutes !== undefined && timeLeft.seconds !== undefined) {
      return (
        <Paper
          elevation={4}
          style={{
            backgroundColor: '#ffafbd',
            padding: '10px',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          <Typography variant="h6">
            Your study session starts in {timeLeft.minutes} minutes and {timeLeft.seconds} seconds
          </Typography>
        </Paper>
      );
    } else {
      return (
        <Paper
          elevation={4}
          style={{
            backgroundColor: '#ffafbd',
            padding: '10px',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          <Typography variant="h6">The study session has started!</Typography>
        </Paper>
      );
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '50px' }}>
      <Box textAlign="center">
        {/* Countdown banner */}
        {renderCountdownBanner()}

        <Typography variant="h4" gutterBottom>
          Your Personalized Roadmap for October
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {daysOfOctober}
        </Grid>

        {/* Join Room Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/room')}
          disabled={!canJoin} // Disable the button until the countdown finishes
          style={{ marginTop: '20px' }}
        >
          {canJoin ? 'Join Room' : 'Join Room (Available Soon)'}
        </Button>
      </Box>
    </Container>
  );
};

export default MatchPage;
