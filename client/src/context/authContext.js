import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const login = async (inputs) => {
    const res = await axios.post('/auth/login', inputs)
    setCurrentUser(res.data)
  }

  const logout = async () => {
    await axios.post('/auth/logout')
    setCurrentUser(null)
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])

  return (
    // 設置全域變數: 可以在網站的所有區域使用
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}