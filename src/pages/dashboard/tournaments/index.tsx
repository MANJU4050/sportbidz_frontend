import React, { useContext } from 'react'
import { AuthContext } from '../../../context/authcontext'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../app/reduxHooks'
import { logoutAction } from '../../../app/auth/authSlice'

const Tournaments = () => {

  const navigate = useNavigate()

  const { logoutUser } = useContext(AuthContext)
  const dispatch = useAppDispatch()

  const logout = async () => {
    await dispatch(logoutAction())
    return navigate('/')
  }

  return (
    <button onClick={logout}>logout</button>
  )
}

export default Tournaments