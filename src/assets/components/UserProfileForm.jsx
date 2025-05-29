import React from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

const UserProfileForm = () => {
    const { register, handleSubmit, formState: { errors }, reset, setError, clearErrors } = useForm()
    const navigate = useNavigate();
    const { state } = useLocation();
    const userId = state?.userId || sessionStorage.getItem('userId');
    const email = state?.email || sessionStorage.getItem('email');

   if (!userId) {
    return <p>Missing information about profile.</p>;
  }

     const onSubmit = async (data) => {
      const formData = {
        userId: userId,
        firstName: data.firstName,
        lastName: data.lastName,
        streetName: data.streetName,
        postalCode: data.postalCode,
        city: data.city,
        country: data.country
    }

    try {

      const res = await fetch('https://localhost:7221/api/Auth/createprofile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
     if (res.ok) {
        navigate('/Auth/login');

      } else {
        setError('form', { type: 'manual', message: 'Something went wrong. Please try again.' })
      }
    } catch (error) {
      console.error("Error:", error);
      setError('form', { type: 'manual', message: 'A network error occurred. Please try again later.' })
    }
  }

    
  return (
    <>
    <div><h1>Please fill in contact-information to complete your registration</h1></div>
 <form className='profile-form' onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group-readonly">
        <label>Username</label>
        <input className='readonly-input' value={email} readOnly />
          </div> 
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" type="text" {...register('firstName', { required: 'First name is required' })}
                className={errors.firstName ? 'input-error' : ''} />
              {errors.firstName && <p className="validation-error"><i className="bi bi-exclamation-octagon"></i>{errors.firstName.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" type="text" {...register('lastName', { required: 'Last name is required' })}
                className={errors.lastName ? 'input-error' : ''} />
              {errors.lastName && <p className="validation-error"><i className="bi bi-exclamation-octagon"></i>{errors.lastName.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="streetName">Street name</label>
              <input id="streetName" type="text" {...register('streetName', { required: 'Street name is required' })}
                className={errors.streetName ? 'input-error' : ''} />
              {errors.street && <p className="validation-error"><i className="bi bi-exclamation-octagon"></i>{errors.streetName.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">PostalCode</label>
              <input id="postalCode" type="text" {...register('postalCode', { required: 'PostalCode is required' })}
                className={errors.postalCode ? 'input-error' : ''} />
              {errors.postalCode && <p className="validation-error"><i className="bi bi-exclamation-octagon"></i>{errors.postalCode.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input id="city" type="text" {...register('city', { required: 'City is required' })}
                className={errors.city ? 'input-error' : ''} />
              {errors.city && <p className="validation-error"><i className="bi bi-exclamation-octagon"></i>{errors.city.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input id="country" type="text" {...register('country', { required: 'Country is required' })}
                className={errors.country ? 'input-error' : ''} />
              {errors.country && <p className="validation-error"><i className="bi bi-exclamation-octagon"></i>{errors.country.message}</p>}
            </div>
            <button type="submit" className="btn btn-primary">Save profile</button>
            </form>

    </>
  )
}

export default UserProfileForm