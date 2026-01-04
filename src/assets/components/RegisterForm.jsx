import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import apiConfig from '../../config/apiConfig';

const RegisterForm = () => {

  const { register, handleSubmit, formState: { errors }, reset, watch, setError, clearErrors } = useForm()
  const navigate = useNavigate()
  const password = watch('password');

  const onSubmit = async (data) => {
    
    const formData = {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      termsAndConditions: data.terms
    }

    try {

      const res = await fetch(`${apiConfig.auth}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      var result = await res.json();
      
      if (res.ok) {

      const userId = result.userId;  
      const email = formData.email

      await fetch(`${apiConfig.verify}/api/verification/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    })

        sessionStorage.setItem('userId', result.userId)
        sessionStorage.setItem('email', formData.email)

        navigate('/auth/register/verify', {
          state: {userId, email }
        })  
        
        return
      }

      if (result.message === 'Email already exists') {
        setError('email', { type: 'manual', message: 'Email already exists' })
      }
      else {
        setError('form', { type: 'manual', message: 'An error occurred. Please try again.' })
      }

    }
    catch (error) {
      console.error("Something went wrong:", error)
      setError('form', { type: 'manual', message: 'An error occurred. Please try again later.' })
      return
    }

  }
  return (
    <form className='auth-form' onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className='form-header'>
        <h1>Register</h1>
      </div>

      <div className='form-group'>
        <label htmlFor="register-email">Email</label>
        <input id='register-email' type='email' placeholder='Enter email'
          {...register('email', { required: 'Email field is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })}
          className={errors.email ? 'input-error' : ''} />
        {errors.email && <p className="validation-error"><i className="bi bi-exclamation-octagon"></i>{errors.email.message}</p>}
      </div>
      <div className='form-group'>
        <label htmlFor="register-password">Password</label>
        <input id='register-password' type="password" placeholder="Enter a password"
          {...register('password', { required: 'Password is required', pattern: {
      value: /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
      message: 'Password must be at least 8 characters and include a special character'} })} className={errors.password ? 'input-error' : ''} />
        {errors.password && <p className="validation-error"><i className="bi bi-exclamation-octagon"></i>{errors.password.message}</p>}
      </div>
      <div className='form-group'>
        <label htmlFor="register-password-confirm">Confim Password</label>
        <input id='register-password-confirm' type="password" placeholder="Confirm password"
          {...register('confirmPassword', { required: 'Confirm password', validate: value => value === password || 'Passwords dosent match' })}
          className={errors.confirmPassword ? 'input-error' : ''} />
        {errors.confirmPassword && <p className="validation-error"><i className="bi bi-exclamation-octagon"></i>{errors.confirmPassword.message}</p>}
      </div>

      <div className="form-group checkbox-group">
        <div className="checkbox-label-wrapper">
          <input
            type="checkbox"
            id="terms-checkbox"
            {...register("terms", { required: "You must agree to the terms and conditions." })}
            className={errors.terms ? 'input-error' : ''} />

          <label htmlFor="terms-checkbox" className="checkbox-label"> I agree to the terms and conditions  </label>
        </div>
        {errors.terms && <p className="validation-error"><i className="bi bi-exclamation-octagon"></i>{errors.terms.message}</p>}
      </div>

      {errors.form && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{errors.form.message}</p>
            <button className='btn btn-primary' onClick={() => { clearErrors('form'); }}>OK</button> </div>
        </div>
      )}

      <button className='btn btn-primary' type='submit'>Register</button>
    </form>
  )
}

export default RegisterForm