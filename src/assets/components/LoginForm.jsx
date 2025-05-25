import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'


const LoginForm = () => {
  
  const { register, handleSubmit, formState: { errors }, reset, setError, clearErrors } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {

    try {

      const res = await fetch('', {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

       if (!res.ok) {
        setError('form', { type: 'manual',  message: 'Invalid email or password' });
        return
      }

    }
    catch (error) {
      console.error("Something went wrong:", error)
      setError('form', { type: 'manual', message: 'An error occurred. Please try again later.' })
      return
    }

    navigate('/events');

  }


  return (
  <form className='auth-form' onSubmit={handleSubmit(onSubmit)} noValidate>
  <div className='form-header'>
        <h1>Log In</h1>
      </div>

      <div className="form-group">
        <label htmlFor="login-email">Email</label>
        <input id="login-email" type="email" {...register('email', { required: 'Email is required' })}
          className={errors.email ? 'input-error' : ''}/>
         {errors.email && <p className="validation-error"><i className="bi bi-exclamation-octagon"></i>{errors.email.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="-login-password">Password</label>
        <input id="login-password" type="password" {...register('password', { required: 'Password is required' })}
           className={errors.password ? 'input-error' : ''} />
         {errors.password && <p className="validation-error"><i className="bi bi-exclamation-octagon"></i>{errors.password.message}</p>}
         </div> 

    <div className="validation-error">
      {errors.form && ( <p> <i className="bi bi-exclamation-octagon"></i>{errors.form.message}</p> )}
    </div>   

      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  )
}

export default LoginForm