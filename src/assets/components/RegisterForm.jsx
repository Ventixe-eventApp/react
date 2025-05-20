import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const res = await fetch('', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const errorData = await response.json();
        if (errorData.message === 'Email already exists') {
          setError('email', { type: 'manual', message: 'Email already exists' });
        }
        else {
          setError('form', { type: 'manual', message: 'An error occurred. Please try again.' });
        }
        return
      }
    }
    catch (error) {
      console.error("Something went wrong:", error)
    }

    navigate('/login');

  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className='form-header'>
         <h1>Register</h1>
         </div>
      
     
      <div className='form-group'>
        <input type='email' placeholder='Enter email'
          {...register('email', { required: 'Email field is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Ogiltig e-post'  }})} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div className='form-group'>
        <input type="password" placeholder="Enter a password"
          {...register('password', { required: 'Password is required' })} />
        <span>{errors.password && <p>{errors.password.message}</p>}</span>
      </div>
      <div className='form-group'>
        <input type="password" placeholder="Confirm password"
          {...register('confirmPassword', { required: 'Confirm password', validate: value => value === password || 'Passwords dosent match' })} />
        <span>{errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}</span>
      </div>
      <button className='btn btn-primary' type='submit'>Register</button>
    </form>
  )
}

export default RegisterForm