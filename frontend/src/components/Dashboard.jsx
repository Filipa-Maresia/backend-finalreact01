import React, { useEffect, useState } from 'react'
import '../css/dashboard.css'
import axios from 'axios'

const Dashboard = () => {
  const [user, setUsers] = useState(0)
  const [admin, setAdmin] = useState(0)
  const [books, setBooks] = useState(0)

  useEffect(() => {
    axios.get('http://localhost:5173/dashboard')
    .then(res => {
      if(res.data.ok) {
        setUsers(res.data.user)
        setAdmin(res.data.admin)
        setBooks(res.data.book)
      }
    }).catch(err => console.log(err))
  } , [])
  return (
    <div className="dashboard">
      <div className="dashboard-box">
        <h2>Total Books</h2> <br />
        <h2>{books}</h2>
      </div>
      <div className="dashboard-box">
        <h2>Total Users</h2> <br />
        <h2>{user}</h2>
      </div>
      <div className="dashboard-box">
        <h2>Total Admins</h2> <br />
        <h2>{admin}</h2>
      </div>
    </div>
  )
}

export default Dashboard