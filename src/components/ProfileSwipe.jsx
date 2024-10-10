import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Grow,
  Dialog,
  DialogContent,
  DialogActions,
  Zoom,
  Grid,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaReact, FaPython, FaGithub, FaLinkedin, FaLeetcode, FaCode } from 'react-icons/fa';
import bob from '../assets/bob.webp'
import alice from '../assets/alice.jpg'


const users = [
  {
    id: 1,
    name: "Alice",
    avatar: bob,
    skills: [
      { name: "JavaScript", icon: <FaCode /> },
      { name: "React", icon: <FaReact /> },
      { name: "Python", icon: <FaPython /> },
    ],
    studyGoal: "Prepare for coding interviews",
    availableHours: "Evenings",
    description: "Alice is a passionate web developer who enjoys coding interviews. She spends her evenings learning about new technologies.",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      leetcode: "https://leetcode.com",
    },
    projects: [
      {
        title: "Portfolio Website",
        description: "A personal portfolio website built using React and hosted on GitHub Pages.",
        stack: [<FaReact />, "JavaScript", "CSS"],
      },
      {
        title: "Task Manager App",
        description: "A task management app built with React and Node.js for handling daily tasks.",
        stack: [<FaReact />, "Node.js", "MongoDB"],
      }
    ]
  },
  {
    id: 2,
    name: "Bob",
    avatar: alice,
    skills: [
      { name: "Python", icon: <FaPython /> },
      { name: "React", icon: <FaReact /> },
    ],
    studyGoal: "Participate in hackathons",
    availableHours: "Mornings",
    description: "Bob is a data scientist who loves participating in hackathons and solving complex problems with Python and AI.",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      leetcode: "https://leetcode.com",
    },
    projects: [
      {
        title: "Data Analysis Tool",
        description: "A data analysis tool built with Python and pandas to visualize datasets.",
        stack: ["Python", "pandas", "Jupyter"],
      },
      {
        title: "AI Chatbot",
        description: "An AI chatbot built with Python and TensorFlow, capable of answering questions.",
        stack: ["Python", "TensorFlow", "Flask"],
      }
    ]
  },
];

const ProfileSwipe = () => {
  const [index, setIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const handleSwipeRight = () => {
    if (index < users.length - 1) {
      setIndex(index + 1);
    } else {
      // Pass only serializable data (no JSX elements)
      navigate('/match', {
        state: {
          user1: { name: users[0].name, avatar: users[0].avatar },
          user2: { name: users[1].name, avatar: users[1].avatar },
        },
      });
    }
  };
  
  const handleSwipeLeft = () => {
    if (index < users.length - 1) {
      setIndex(index + 1);
    }
  };
  




  const handleShowMore = () => {
    setShowDetails(true);
  };

  const handleClose = () => {
    setShowDetails(false);
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        marginTop: '50px',
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
        padding: '20px',
        borderRadius: '20px',
      }}
    >
      {users[index] ? (
        <Grow in={true} timeout={500}>
          <Card elevation={4} style={{ borderRadius: '15px' }}>
            <CardMedia
              component="img"
              height="200"
              image={users[index].avatar}
              alt={users[index].name}
              style={{
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: 'bold', color: '#3f51b5' }}>
                {users[index].name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Skills:</strong> {users[index].skills.map(skill => skill.name).join(', ')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Study Goal:</strong> {users[index].studyGoal}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Available Hours:</strong> {users[index].availableHours}
              </Typography>
            </CardContent>
            <div style={{ padding: '10px', textAlign: 'center' }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  borderRadius: '20px',
                  padding: '8px 20px',
                }}
                onClick={handleSwipeLeft}
              >
                Swipe Left
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: '#4caf50',
                  color: 'white',
                  marginLeft: '10px',
                  borderRadius: '20px',
                  padding: '8px 20px',
                }}
                onClick={handleSwipeRight}
              >
                Swipe Right
              </Button>
              <Button
                variant="outlined"
                color="primary"
                style={{ marginLeft: '10px', borderRadius: '20px', padding: '8px 20px' }}
                onClick={handleShowMore}
              >
                Show More
              </Button>
            </div>
          </Card>
        </Grow>
      ) : (
        <Typography style={{ color: '#3f51b5', fontWeight: 'bold', textAlign: 'center' }}>No more profiles</Typography>
      )}

      {/* Detailed view modal */}
      <Dialog open={showDetails} onClose={handleClose} maxWidth="md" fullWidth>
        <Zoom in={showDetails} timeout={500}>
          <DialogContent>
            <Card elevation={6} style={{ padding: '20px', borderRadius: '20px' }}>
              {/* User Info */}
              <CardMedia
                component="img"
                height="250"
                image={users[index].avatar}
                alt={users[index].name}
                style={{ borderRadius: '50%', width: '200px', margin: 'auto' }}
              />
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                style={{ fontWeight: 'bold', color: '#3f51b5', textAlign: 'center', marginTop: '20px' }}
              >
                {users[index].name}
              </Typography>
              <Typography variant="body1" color="text.primary" style={{ textAlign: 'center', marginBottom: '10px' }}>
                {users[index].description}
              </Typography>

              {/* Skills Section */}
              <div style={{ marginTop: '30px' }}>
                <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>
                  Skills
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                  {users[index].skills.map((skill, idx) => (
                    <Grid item key={idx}>
                      <Chip
                        icon={skill.icon}
                        label={skill.name}
                        variant="outlined"
                        color="primary"
                        style={{ fontSize: '16px' }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>

              {/* Projects Section */}
              <div style={{ marginTop: '40px' }}>
                <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>
                  Projects
                </Typography>
                {users[index].projects.map((project, idx) => (
                  <Card key={idx} elevation={4} style={{ margin: '10px 0', padding: '15px', borderRadius: '10px' }}>
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.description}
                    </Typography>
                    <div style={{ marginTop: '10px' }}>
                      {project.stack.map((tech, i) => (
                        <Chip key={i} label={tech} style={{ marginRight: '5px', marginTop: '5px' }} />
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </DialogContent>
        </Zoom>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained" style={{ margin: '10px', borderRadius: '20px' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfileSwipe;
