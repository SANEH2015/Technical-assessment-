import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you would integrate your Firebase or authentication logic
    if (email === '' || password === '') {
      setError('Please fill in both fields.');
    } else {
      setError('');
      // Simulate a successful login (you can replace this with actual login logic)
      alert('Login successful!');
    }
  };

  const handleSignup = () => {
    // Redirect to signup page or handle signup logic
    alert('Signup page');
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.header}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.btn}>Login</button>
        </form>
        <div style={styles.signupLink}>
          <p style={styles.signupText}>Don't have an account? <span onClick={handleSignup} style={styles.signupSpan}>Sign Up</span></p>
        </div>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8',
  },
  loginBox: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontWeight: '600',
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  },
  inputFocus: {
    borderColor: '#007BFF',
    outline: 'none',
  },
  btn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  btnHover: {
    backgroundColor: '#0056b3',
  },
  signupLink: {
    textAlign: 'center',
    marginTop: '15px',
  },
  signupText: {
    fontSize: '14px',
    color: '#555',
  },
  signupSpan: {
    color: '#007BFF',
    cursor: 'pointer',
  },
  signupSpanHover: {
    textDecoration: 'underline',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    textAlign: 'center',
    marginBottom: '15px',
  },
};

export default Login;
