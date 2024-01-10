import './UpdateUser.scss'
import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { useParams, useNavigate } from 'react-router-dom'
import { updateUsersOnServer } from "../../state/Users/UserReducer";


export const UpdateUser = () => {
  const { id } = useParams()
  const users = useSelector((state: RootState) => state.users.user);
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const selectedUser = users.filter((user) => user.newId === Number(id))


  const { newUserName, newEmail } = selectedUser.length > 0 ? selectedUser[0] : { newUserName: '', newEmail: '' };
  const [updatedName, setUpdatedName] = useState(newUserName)
  const [UpdatedEmail, setUpdatedEmail] = useState(newEmail)

  const updatedUserHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedName(e.target.value)
  }

  const updatedEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedEmail(e.target.value)
  }

  const onHandlerUpdateSubmit = (e: FormEvent) => {
    e.preventDefault()
    navigate('/')

    dispatch(updateUsersOnServer({
      newId: Number(id),
      newUserName: updatedName,
      newEmail: UpdatedEmail
    }))
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="card container w-25 bg-secondary text-white p-4 rounded">
        <h1 className="mb-4 text-center">Update User</h1>

        <form onSubmit={onHandlerUpdateSubmit}
          className="form-updateuser p-3">
          <div className="form-group mb-3">
            <label className='mb-1'>Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder='Enter name'
              value={updatedName}
              onChange={updatedUserHandler}
            />
          </div>

          <div className="form-group mb-3">
            <label className='mb-1'>Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder='Enter email'
              value={UpdatedEmail}
              onChange={updatedEmailHandler}
            />
          </div>

          <button type="submit" className="btn btn-info btn-block">Update</button>
        </form>
      </div>
    </div>
  );
};
