import './SignIn.scss'
import { FormEvent, useState } from "react"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../firebase"
import { Link } from 'react-router-dom'

export const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signInError, setSignInError] = useState('')


  const signInHandler = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setSignInError('')

    } catch (error) {
      setSignInError('Invalid email or password. Please try again.')
    }
  }

  setTimeout(() => {
    setSignInError('')
  }, 5000);

  return (
    <div className='form-container'>

      <form onSubmit={signInHandler}
        className="p-3">
        <div className="form-group mb-3">
          <label className='mb-1'>Email</label>
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
          <button
            type="submit"
            className="btn btn-info btn-block mt-3">
            Sign In

          </button>
          <button
            type="submit"
            className="btn btn-info btn-block ms-2 mt-3">
            <Link to='/signup'>
              Sign up
            </Link>
          </button>

          {signInError && (
            <div className='alert alert-danger mt-3' role='alert'>
              {signInError}
            </div>
          )}
        </div>

      </form >
    </div>
  )
}