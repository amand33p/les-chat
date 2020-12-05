import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './apolloClient';
import { AuthProvider } from './context/auth';

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
