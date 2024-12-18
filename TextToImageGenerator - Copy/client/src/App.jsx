import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { logo } from './assets';
import { Home, CreatePost,LoginForm,SignupForm} from './pages';

const App = () => {
  // Theme state, with default from localStorage or light theme
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [loggedIn, setLoggedIn] = useState(false); // Track login status

  // Save the theme in localStorage on change
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Define inline styles for light and dark themes
  const styles = {
    header: {
      backgroundColor: theme === 'light' ? '#ffffff' : '#2d2d2d',
      color: theme === 'light' ? '#222328' : '#ffffff',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid',
      borderBottomColor: theme === 'light' ? '#e6ebf4' : '#444444',
    },
    main: {
      padding: '2rem 1rem',
      backgroundColor: theme === 'light' ? '#f9fafe' : '#1e1e1e',
      color: theme === 'light' ? '#222328' : '#ffffff',
      minHeight: 'calc(100vh - 73px)',

    },
    toggleButton: {
      marginRight: '1rem',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      backgroundColor: theme === 'light' ? '#6469ff' : '#444444',
      color: theme === 'light' ? '#ffffff' : '#cccccc',
      border: 'none',
      cursor: 'pointer',
    },
    createButton: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: '500',
      backgroundColor: '#6469ff',
      color: '#ffffff',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      textDecoration: 'none',
    },
  };

  return (
    <BrowserRouter>
      <header style={styles.header}>
        <Link to="/">
          <img src={logo} alt="logo" style={{ width: '7rem', objectFit: 'contain' }} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {loggedIn &&(
            <button onClick={toggleTheme} style={styles.toggleButton}>
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
          )}
          <Link to="/create-post" style={styles.createButton}>
            Create
          </Link>
          
        </div>
      </header>
      <main style={styles.main}>
        <Routes>
          {/* <Route path="/login" element={<LoginForm onLogin={() => setLoggedIn(true)} />} />
          <Route path="/signup" element={<SignupForm />} />*/}

          {/* Protected Routes */}
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/create-post"
            element={<CreatePost />}
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
