import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserTable } from './views/UserTable/UserTable';
import { NewUser } from './views/NewUser/NewUser';
import { UpdateUser } from './views/UpdateUser/UpdateUser';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import { useEffect, useState } from 'react';
import { SignIn } from './auth/SignIn';
import { Signup } from './auth/Sigup';
import { DotLoader } from 'react-spinners'

export const App = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthLoading(false)
      if (user) {
        setAuthUser(user);
        localStorage.setItem('authUser', JSON.stringify(user));
      } else {
        setAuthUser(null);
        localStorage.removeItem('authUser');
      }
    });
    return () => unsubscribe();
  }, []);

  if (authLoading) {
    return <DotLoader color="#36d7b7" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />;
  }

  return (
    <>
      <Routes>
        {authUser ? (
          <>
            <Route path='/signin' element={<Navigate to='/' />} />
            <Route index element={<UserTable />} />
            <Route path='/newuser' element={<NewUser />} />
            <Route path='/updateuser/:id' element={<UpdateUser />} />
          </>
        ) : (
          <>
            <Route path='/' element={<Navigate to='/signin' />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<Signup />} />
          </>
        )}
      </Routes>
    </>
  );
};
