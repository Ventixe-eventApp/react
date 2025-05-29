import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'


const LoginForm = () => {
  
  const { register, handleSubmit, formState: { errors }, reset, setError, clearErrors } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const formData = {
      email: data.email,
      password: data.password,
     
    }

    try {

      const res = await fetch('https://localhost:7221/api/Auth/login', {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        setError('form', { type: 'manual',  message: 'Invalid email or password' });
        return
      }

      var result = await res.json();
      
      console.log("Login API response:", result);

      const user = result.user;
      console.log("Saving to localStorage:", result.user);
      localStorage.setItem("user", JSON.stringify({
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }))
            navigate('/events')
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