import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const UserProfileForm = () => {
    const { register, handleSubmit, formState: { errors }, reset, watch, setError, clearErrors } = useForm()
    const navigate = useNavigate()
    
  return (
    <div>UserProfileForm</div>
  )
}

export default UserProfileForm