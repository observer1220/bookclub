import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleChange = (event) => {
    setInputs(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    // 避免註冊時重整頁面
    event.preventDefault()

    try {
      // 觸發註冊API並導向登入頁面
      await axios.post('/auth/register', inputs)
      navigate('/login')
    } catch (error) {
      setError(error.response.data)
    }
  }

  return (
    <div className='auth'>
      <h1>Register</h1>
      <form action="">
        <input required type="text" placeholder='username' name="username" onChange={handleChange} />
        <input required type="email" placeholder='email' name="email" onChange={handleChange} />
        <input required type="password" placeholder='password' name="password" onChange={handleChange} />
        <button onClick={handleSubmit}>Register</button>
        {error && <p>{error}</p>}
        <span>Don't you have an account? <Link to="/login">Login</Link></span>
      </form>
    </div>
  )
}

export default Register