import './UserTable.scss'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { deleteUser, deleteUserOnServer, fetchUsers } from '../../state/Users/UserReducer';
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase';
import { useEffect } from 'react';

export const UserTable = () => {
  const users = useSelector((state: RootState) => state.users.user);
  const dispatch = useDispatch<AppDispatch>()

  const signOutHandler = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.log(error);
    }

  }

  const onDeleteHandler = (newId: number) => {
    dispatch(deleteUser(newId))
    dispatch(deleteUserOnServer(newId))
  }

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <div className='container'>
      <div className='container-header'>
        <h1>React CRUD App with Redux</h1>
        <button
          onClick={signOutHandler}
          className='btn btn-danger'>
          Sign Out
        </button>
      </div>
      <Link to='/newuser'>
        <button type="button" className="btn btn-success">Create +</button>
      </Link>
      <table className="table mt-3">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <th scope="row">{user.newId}</th>
              <td>{user.newUserName}</td>
              <td>{user.newEmail}</td>
              <td>
                <Link to={`/updateuser/${user.newId}`}>
                  <button type="button" className="btn btn-primary me-2">Edit</button>
                </Link>
                <button onClick={() => onDeleteHandler(user.newId)} type="button" className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
