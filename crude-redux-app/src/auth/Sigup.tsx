import './Signup.scss'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FormEvent, useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import backArrow from '../png-transparent-arrow-free-content-quiver-arrow-line-s-angle-text-bow-and-arrow.png'

export const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorSignUp, setErrorSignUp] = useState('')

  const navigate = useNavigate()

  const signUpHandler = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate('/signin')
    } catch (error) {
      setErrorSignUp('User is already in use ')
    }
  }

  setTimeout(() => {
    setErrorSignUp('')
  }, 5000)


  return (
    <div className='form-container'>

      <form onSubmit={signUpHandler}
        className="p-3">
        <div className="form-group mb-3">
          <label className='mb-1'>Email:</label>
          <input
            type="email"
            className="form-control"
            placeholder='Enter email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="form-group mb-3">
          <label className='mb-1'>Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder='Enter password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button onClick={signUpHandler} type="submit" className="btn btn-info btn-block">Sign Up</button>

        {errorSignUp && (
          <div className='alert alert-danger mt-3' role='alert'>
            {errorSignUp}
          </div>
        )}

        <Link to='/signin'>
          <div className='prev-navigation'>
            <img className='arrow' src={backArrow} alt="" />
            <p className='back-signin'>Back to sign in</p>
          </div>
        </Link>

      </form>

    </div>

  )
}
