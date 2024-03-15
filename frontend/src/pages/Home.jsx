import { useState, useEffect } from 'react'
import Header from '../components/Header'
import ApiFunctions from '../../public/javascripts/api'


function Home() {
  const [hasToken, setHasToken] = useState(null);
  const [toggleLoginRegistration, setToggleLoginRegistration] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  async function onRegistration(values) {
    const responseToken = await ApiFunctions.registration(values)
    console.log(responseToken.token);
    setHasToken(responseToken.token);
    responseToken.token && localStorage.setItem('token', responseToken);
  }
  async function onLogin(values) {
    const responseToken = await ApiFunctions.login(values)
    console.log(responseToken.token);
    setHasToken(responseToken.token);
    hasToken && localStorage.setItem('token', responseToken);
  }
  function clearInputs() {
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setGender('');
  }

  useEffect(() => {
    setHasToken(localStorage.getItem('token') || null)
  }, [hasToken])
  useEffect(() => {
    setHasToken(localStorage.getItem('token') || null)
  }, [])


  return (
    <div className="wrapper">
      {hasToken ?
        <>
          <Header />
          <main>

          </main>
          <footer></footer>
        </> :
        <main className='h-100'>
          {
            toggleLoginRegistration ?
              <div className="registrationForm form bg-secondary-subtle text-secondary-emphasis p-4">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputUsername1" className="form-label">Username</label>
                  <input type="text" className="form-control" id="exampleInputUsername1" value={username} onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputConfirmPassword1" className="form-label">Confirm password</label>
                  <input type="password" className="form-control" id="exampleInputConfirmPassword1" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Choose gender</label>
                  <select defaultValue={'DEFAULT'} className="form-select" aria-label="Default select example" onChange={(event) => setGender(event.target.value)}>
                    <option value="DEFAULT" disabled>Choose a gender ...</option>
                    <option value="Male" >Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <button type="submit" className="w-100 btn btn-primary" onClick={() => {
                  onRegistration({
                    username, email, password, confirmPassword, gender
                  });
                  clearInputs();
                }}>Submit</button>

                <div className="p-2 ps-3 pe-3">
                  <p className='btn btn-link link-underline link-underline-opacity-0' onClick={() => {
                    clearInputs();
                    setToggleLoginRegistration(false);
                  }}>Log In</p>
                </div>
              </div> : <div className="loginForm form bg-secondary-subtle text-secondary-emphasis p-4">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button type="submit" className="w-100 btn btn-primary" onClick={() => {
                  onLogin({
                    email, password
                  });
                  clearInputs();
                }}>Submit</button>
                <div className="p-2 ps-3 pe-3">
                  <p className='btn btn-link link-offset-2 link-underline link-underline-opacity-0' onClick={() => {
                    clearInputs();
                    setToggleLoginRegistration(true);
                  }}>Registration</p>
                </div>
              </div>
          }

        </main>
      }
    </div>
  )
}

export default Home