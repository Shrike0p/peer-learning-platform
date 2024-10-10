import React, { useState } from 'react';
import { Button, TextField, Stepper, Step, StepLabel, Paper, Container, Typography, Box, Avatar, Fade, AppBar, Toolbar, Link } from '@mui/material';
import { CheckCircle, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/image.png'; 
import footerLogo from '../assets/image.png'; 
import './OnboardingForm.css'; // Import your CSS styles


const steps = ['Profile Info', 'Skills & Goals', 'Availability'];

const OnboardingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    skills: [],
    learningGoal: '',
    availableHours: '',
  });

  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const isFormComplete = () => {
    if (activeStep === 0 && !formData.name) return false;
    if (activeStep === 1 && (formData.skills.length === 0 || !formData.learningGoal)) return false;
    if (activeStep === 2 && !formData.availableHours) return false;
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      console.log('Form Data:', formData);
      navigate('/swipe');
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-pink-300 via-red-300 to-orange-300">
      {/* Header */}
      <AppBar position="static" sx={{ backgroundImage: 'linear-gradient(to right, #FB8C00, #E91E63)', boxShadow: 3 }}>
  <Toolbar sx={{ justifyContent: 'space-between', zIndex: 10 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', animation: 'fadeIn 2s ease-in-out' }}>
      <img src={logo} alt="StudyBuddy Logo" className="h-12 mr-4" />
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FFF', letterSpacing: 2 }}>
        StudyBuddy
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', gap: 4 }}>
      <Link 
        href="#" 
        sx={{ color: '#FFF', '&:hover': { color: '#FFEB3B' }, transition: 'color 0.3s ease-in-out' }}
      >
        Competitions 
      </Link>
      <Link 
        href="#" 
        sx={{ color: '#FFF', '&:hover': { color: '#FFEB3B' }, transition: 'color 0.3s ease-in-out' }}
      >
        Community
      </Link>
      <Link 
        href="#" 
        sx={{ color: '#FFF', '&:hover': { color: '#FFEB3B' }, transition: 'color 0.3s ease-in-out' }}
      >
        Opportunities
      </Link>
    </Box>
    <TextField
      variant="outlined"
      size="small"
      placeholder="Search..."
      sx={{
        backgroundColor: '#FFF',
        borderRadius: 50, // Full rounded
        width: '18rem', // Make it wider for elegance
        padding: '10px 20px', // Give more padding
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', // Subtle shadow
        border: 'none', // Remove default border
        outline: 'none', // No outline on focus
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', // Transparent by default
          },
          '&:hover fieldset': {
            borderColor: '#E91E63', // Pink on hover
            borderWidth: '2px', // Thicker border on hover
          },
          '&.Mui-focused fieldset': {
            borderColor: '#FB8C00', // Orange on focus
            borderWidth: '2px',
          },
        },
        '& input': {
          padding: '10px 0', // Add more padding for space
          color: '#333', // Text color inside input
        },
        '&::placeholder': {
          color: '#888', // Placeholder color for subtle effect
          fontSize: '1rem', // Slightly increase font size
        },
      }}
    />
  </Toolbar>
</AppBar>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <Container maxWidth="md">
          <Fade in={true} timeout={500}>
            <Paper className="p-10 rounded-xl shadow-2xl bg-white bg-opacity-90 transform hover:scale-105 transition-transform duration-300">
            <Typography
  variant="h4"
  align="center"
  className="mb-6 text-pink-600 font-extrabold bounce-text"
>
  Let's Get Started!
</Typography>




              {/* Avatar with Zoom effect */}
              <Box display="flex" justifyContent="center" marginBottom="20px">
                <Avatar
                  src={formData.avatar || footerLogo}
                  alt="User Avatar"
                  className="w-24 h-24 mb-6 transform hover:scale-110 transition-transform duration-300"
                />
              </Box>

              <Stepper activeStep={activeStep} alternativeLabel className="mb-8">
                {steps.map((label, index) => (
                  <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {/* Step 1: Profile Information */}
              {activeStep === 0 && (
                <Box className="flex flex-col items-center">
                  <TextField
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    className="mb-4"
                    InputLabelProps={{
                      className: 'text-pink-600',
                    }}
                  />
                  <TextField
                    label="Avatar URL"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    helperText="Add a link to your avatar image"
                    variant="outlined"
                    className="mb-4"
                    InputLabelProps={{
                      className: 'text-pink-600',
                    }}
                  />
                </Box>
              )}

              {/* Step 2: Skills and Learning Goal */}
              {activeStep === 1 && (
                <Box>
                  <TextField
                    label="Skills"
                    name="skills"
                    value={formData.skills.join(', ')}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        skills: e.target.value.split(',').map((skill) => skill.trim()),
                      })
                    }
                    fullWidth
                    margin="normal"
                    helperText="Enter skills separated by commas"
                    className="mt-4"
                    InputLabelProps={{
                      className: 'text-pink-600',
                    }}
                  />
                  <TextField
                    label="Learning Goal"
                    name="learningGoal"
                    value={formData.learningGoal}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    helperText="E.g., Prepare for interviews, learn new technology"
                    className="mt-4"
                    InputLabelProps={{
                      className: 'text-pink-600',
                    }}
                  />
                </Box>
              )}

              {/* Step 3: Availability */}
              {activeStep === 2 && (
                <Box>
                  <TextField
                    label="Available Hours"
                    name="availableHours"
                    value={formData.availableHours}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    helperText="E.g., Mornings, Afternoons, Evenings"
                    className="mt-4"
                    InputLabelProps={{
                      className: 'text-pink-600',
                    }}
                  />
                </Box>
              )}

              <Box display="flex" justifyContent="space-between" marginTop="30px">
                {activeStep > 0 && (
                  <Button
                    onClick={handleBack}
                    variant="outlined"
                    startIcon={<Edit />}
                    className="hover:scale-105 transition-transform duration-300"
                    color="secondary"
                  >
                    Back
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  variant="contained"
                  className="bg-pink-600 text-white hover:bg-pink-500 hover:scale-105 transition-transform duration-300"
                  disabled={!isFormComplete()}
                  endIcon={activeStep === steps.length - 1 ? <CheckCircle /> : null}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Container>
      </div>

      {/* Footer */}
      <Box
        component="footer"
        className="bg-gradient-to-r from-pink-500 to-orange-400 py-4 text-white flex justify-between items-center shadow-lg"
      >
        <Typography variant="body2">
          © 2024 StudyBuddy. All Rights Reserved.
        </Typography>
        <img src={footerLogo} alt="Footer Logo" className="h-8" />
        <Box className="flex space-x-4">
          <Link href="#" className="hover:text-gray-200 transition duration-300">
            FAQ
          </Link>
          <Link href="#" className="hover:text-gray-200 transition duration-300">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-gray-200 transition duration-300">
            Contact
          </Link>
        </Box>
      </Box>
    </div>
  );
};

export default OnboardingForm;
