import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import RedirectProtected from './components/Redirect'
import Auth from './pages/auth/auth'
import Home from './pages/home/home'
import Setting from './pages/setting/setting'

function App() {
  return (
    <React.Fragment>
      <RedirectProtected />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
    </React.Fragment>
  );
}

export default App;
