import { useNavigate } from "react-router-dom";
import Header from '../components/Header'
import Modal from '../components/Modal'
import { useEffect, useState } from 'react'
function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/')
  }
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const token = localStorage.getItem('token') || null;
    !token && navigate('/')
    setUser({
      username: localStorage.getItem("username"),
      email: localStorage.getItem('email')
    })
  }, [])


  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="profileCard d-flex flex-column p-3">
          <span>Name: <b>{user.username}</b></span>
          <span>Email: <b>{user.email}</b></span>
          <button className="btn btn-danger mt-4" onClick={() => logOut()}>Log out</button>
          <button className="btn btn-info mt-4 text-light" onClick={() => handleOpen()}>Change password</button>
        </div>
        <Modal isOpen={open} handleClose={handleClose} />
      </main>
    </div>
  )
}

export default Profile