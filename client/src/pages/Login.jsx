import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  // 使用全域方法login
  const { login } = useContext(AuthContext)

  const handleChange = (event) => {
    setInputs(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    // 避免註冊時重整頁面
    event.preventDefault()

    try {
      // 觸發全域方法login
      await login(inputs)
      navigate('/')
    } catch (error) {
      setError(error.response.data)
    }
  }

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form action="">
        <input required type="text" placeholder='username' name='username' onChange={handleChange} />
        <input required type="password" placeholder='password' name='password' onChange={handleChange} />
        <button onClick={handleSubmit}>Login</button>
        {error && <p>{error}</p>}
        <span>Don't you have an account? <Link to="/register">Register</Link></span>
      </form>
    </div>
  )
}

export default Login