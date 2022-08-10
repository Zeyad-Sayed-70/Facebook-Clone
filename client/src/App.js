import Auth from './pages/auth/auth'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import React from 'react';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
