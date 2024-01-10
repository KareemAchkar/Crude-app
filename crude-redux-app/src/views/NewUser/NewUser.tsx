import './NewUser.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { newUserType, postUserOnServer } from '../../state/Users/UserReducer';
import { AppDispatch, RootState } from '../../state/store';
import {useNavigate} from 'react-router-dom'
import {  } from 'react-router'


export const NewUser = () => {
  const [newUsername, setNewUserName] = useState('')
  const [newEmail, setNewEmail] = useState('')

  const navigate = useNavigate()

  const users = useSelector((state: RootState) => state.users.user)
  const dispatch = useDispatch<AppDispatch>()


  const newUserHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUserName(e.target.value)
  }

  const newEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value)
  }

  const onHandlerSubmit = async (e: FormEvent) => {
    e.preventDefault()
    navigate('/')

    const maxId = users.reduce((max, user) => (user.newId > max ? user.newId : max), 0)

    const newUser: newUserType = {
      newId: maxId + 1,
      newUserName: newUsername,
      newEmail: newEmail,
    }

    setNewUserName('')
    setNewEmail('')


    dispatch(postUserOnServer(newUser))

  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="card container w-25 bg-secondary text-white p-4 rounded">
        <h1 className="mb-4 text-center">Add New User</h1>

        <form onSubmit={onHandlerSubmit}
          className="form-adduser p-3">
          <div className="form-group mb-3">
            <label className='mb-1'>Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder='Enter name'
              onChange={newUserHandler}
              value={newUsername}
              autoComplete='off'
            />
          </div>

          <div className="form-group mb-3">
            <label className='mb-1'>Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder='Enter email'
              onChange={newEmailHandler}
              value={newEmail}
              autoComplete='off'

            />
          </div>

          <button type="submit" className="btn btn-info btn-block">Submit</button>
        </form>
      </div>
    </div>
  );
};
