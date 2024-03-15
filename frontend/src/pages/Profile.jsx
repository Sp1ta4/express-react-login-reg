import { Link } from "react-router-dom";
import Header from '../components/Header'
function Profile() {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="profileCard d-flex flex-column p-3">
          <span>Name: <b>Glak</b></span>
          <span>Email: <b>admin123@gmail.com</b></span>
          <span>ID: <b>sf8sdf*fZF^</b></span>
          <Link className="btn btn-danger" to='/' onClick={() => {
            localStorage.removeItem('token');
          }}>Log out</Link>
        </div>
      </main>
    </div>
  )
}

export default Profile