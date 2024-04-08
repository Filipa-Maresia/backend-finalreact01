import React, { useState } from 'react'
import axios from 'axios'
import  {useNavigate} from 'react-router-dom'

const AddUser = () => {
    const [roll, setRoll] = useState('')
    const [username, setUsername] = useState('')
    const [grade, setGrade] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5173/user/register', {roll, username, password})
        .then(res => { 
            if(res.data.registered) {
                navigate('/dashboard')
            }
            console.log(res)
        })
        .catch(err => console.log(err))
      }

  return (
    <div className="user-form-container">
      <form className="user-form" onSubmit={handleSubmit}>
        <h2>Add User</h2>
        <div className="form-group">
          <label htmlFor="roll">Roll:</label>
          <input type="text" id="roll" name="roll" 
          onChange={(e) => setRoll(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="username">User Name:</label>
          <input type="text" id="username" name="username" 
          onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" 
          onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default AddUser