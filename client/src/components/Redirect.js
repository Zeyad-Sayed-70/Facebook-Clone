import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const unProtectedPages = ['/auth']

const RedirectProtected = () => {
  const [checkAuth, setCheckAuth] = useState(localStorage.getItem('token') !== null)
    const location = useLocation()
  if (!checkAuth && !unProtectedPages.includes(location.pathname))
    return <Navigate to="auth" />
    return ''
}

export default RedirectProtected