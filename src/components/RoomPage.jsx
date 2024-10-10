import React, { useState, useEffect } from 'react';
import { Button, Container, Box, Avatar, Typography, LinearProgress, IconButton, Modal, TextField } from '@mui/material';
import { Mic, MicOff, Videocam, VideocamOff, CallEnd, Chat } from '@mui/icons-material';
import bob from '../assets/bob.webp';
import alice from '../assets/alice.jpg';

// Mock participant data with levels and progress
const participants = [
  {
    id: 1,
    name: 'Prakhar',
    avatar: bob,
    micOn: true,
    cameraOn: true,
    level: 'College Student CSE',
    exercisesCompleted: 5,
    totalExercises: 10,
  },
  {
    id: 2,
    name: 'Bob',
    avatar: alice,
    micOn: false,
    cameraOn: false,
    level: 'College Student IT',
    exercisesCompleted: 3,
    totalExercises: 10,
  },
];

const RoomPage = () => {
  const [cameraOn, setCameraOn] = useState(true); // State for camera
  const [micOn, setMicOn] = useState(true); // State for microphone
  const [openChat, setOpenChat] = useState(false); // State for chat modal
  const [countdown, setCountdown] = useState(30); // Countdown state
  const [exitAllowed, setExitAllowed] = useState(false); // Whether exit is allowed or not

  // Toggle camera
  const toggleCamera = () => {
    setCameraOn(!cameraOn);
  };

  // Toggle microphone
  const toggleMic = () => {
    setMicOn(!micOn);
  };

  // Open chat modal
  const handleOpenChat = () => {
    setOpenChat(true);
  };

  // Close chat modal
  const handleCloseChat = () => {
    setOpenChat(false);
  };

  // End call (simulate leaving the room)
  const handleEndCall = () => {
    if (exitAllowed) {
      console.log('Call ended');
      // Logic to leave the room or redirect
    } else {
      console.log('You must wait for the countdown to end before exiting.');
    }
  };

  // Start the countdown when the component mounts
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount > 1) {
          return prevCount - 1;
        } else {
          setExitAllowed(true); // Enable exit when countdown is complete
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: '#202124',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        width: '100%',
        margin: 0,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: '#202124', // Ensures full black background
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          borderRadius: '15px',
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ width: '100%', marginBottom: '20px' }}
        >
          {/* Display two participants side by side */}
          {participants.map((participant) => (
            <Box
              key={participant.id}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="center"
              style={{
                backgroundColor: '#3C4043',
                padding: '20px',
                borderRadius: '10px',
                margin: '0 20px',
                width: '400px',
                height: '450px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Video and participant status */}
              <Avatar
                src={participant.avatar}
                alt={participant.name}
                style={{ width: '100px', height: '100px', marginBottom: '10px' }}
              />
              <Typography variant="h6" style={{ color: '#ffffff' }}>
                {participant.name}
              </Typography>
              {/* Mic and camera status icons */}
              <Box display="flex" justifyContent="center" alignItems="center" marginTop="10px">
                {participant.micOn ? (
                  <Mic style={{ color: '#ffffff', marginRight: '10px' }} />
                ) : (
                  <MicOff style={{ color: '#ffffff', marginRight: '10px' }} />
                )}
                {participant.cameraOn ? (
                  <Videocam style={{ color: '#ffffff' }} />
                ) : (
                  <VideocamOff style={{ color: '#ffffff' }} />
                )}
              </Box>

              {/* Progress card for participant */}
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  padding: '10px',
                  width: '100%',
                  marginTop: '20px',
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  Occupation: {participant.level}
                </Typography>
                <Typography variant="body2" color="textSecondary" marginTop="5px">
                  Exercises Completed: {participant.exercisesCompleted}/{participant.totalExercises}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(participant.exercisesCompleted / participant.totalExercises) * 100}
                  style={{ width: '100%', height: '10px', borderRadius: '5px', marginTop: '10px', marginBottom: '10px' }}
                />

                {/* Chat button */}
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Chat />}
                  onClick={handleOpenChat}
                  style={{ width: '100%' }}
                >
                  Open Chat
                </Button>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Bottom controls for the current user */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{
            position: 'fixed',
            bottom: '20px',
            backgroundColor: '#3C4043',
            borderRadius: '50px',
            padding: '10px 30px',
          }}
        >
          <IconButton onClick={toggleMic} style={{ color: '#ffffff', marginRight: '10px' }}>
            {micOn ? <Mic /> : <MicOff />}
          </IconButton>
          <IconButton onClick={toggleCamera} style={{ color: '#ffffff', marginRight: '10px' }}>
            {cameraOn ? <Videocam /> : <VideocamOff />}
          </IconButton>
          <IconButton
            onClick={handleEndCall}
            style={{
              color: exitAllowed ? '#ffffff' : 'grey', // Disable the button visually
            }}
            disabled={!exitAllowed} // Disable until countdown finishes
          >
            <CallEnd style={{ color: exitAllowed ? 'red' : 'grey' }} />
          </IconButton>
        </Box>

        {/* Countdown Display */}
        {!exitAllowed && (
          <Typography variant="body1" style={{ color: '#ffffff', marginTop: '10px' }}>
            You can exit in {countdown} seconds
          </Typography>
        )}

        {/* Chat Modal */}
        <Modal
          open={openChat}
          onClose={handleCloseChat}
          aria-labelledby="chat-modal"
          aria-describedby="chat-dialog"
        >
          <Box
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              width: '400px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Chat
            </Typography>
            <TextField
              label="Enter your message"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              style={{ marginBottom: '20px' }}
            />
            <Button variant="contained" color="primary" onClick={handleCloseChat}>
              Send
            </Button>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
};

export default RoomPage;
