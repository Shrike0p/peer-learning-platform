import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from '@mui/material';
import OnboardingForm from './components/OnboardingForm';
import ProfileSwipe from './components/ProfileSwipe';
import StudyScheduler from './components/StudyScheduler';
import Dashboard from './components/Dashboard';
import MatchPage from './components/MatchPage';
import theme from './theme'; // Import the custom theme
import RoomPage from "./components/RoomPage";
import './tailwind.css';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />  {/* Apply global background color */}
      <Router>
        <Routes>
          <Route path="/onboarding" element={<OnboardingForm />} />
          <Route path="/swipe" element={<ProfileSwipe />} />
          <Route path="/schedule" element={<StudyScheduler />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/match" element={<MatchPage />} />
          <Route path="/room" element={<RoomPage/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
