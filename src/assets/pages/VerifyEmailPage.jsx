import react from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyEmailPage = () => {
  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();
  const navigate = useNavigate();
  const {state} = useLocation();
  const userId = state?.userId || sessionStorage.getItem('userId');
  const email = state?.email || sessionStorage.getItem('email');

  const onSubmit = async (data) => {
        
    try {
      const res = await fetch('https://verificationprovider-service-ventixe-fpgxf9ddg8e7g5hp.swedencentral-01.azurewebsites.net/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, verificationCode: data.code })
      })

      const result = await res.json();

      if (res.ok && result.success) {
        navigate('/auth/register/profile', { state: { email, userId } });
      } else {
        setError('form', { type: 'manual', message: 'Invalid or expired verification code.' });
      }
    } catch (error) {
      console.error(error);
      setError('form', { type: 'manual', message: 'Something went wrong. Please try again.' });
    }
  };

  return (
   <div className='verification-card'>
     <h2>Verify Your Email</h2>
      <p>We sent a 6-digit code to <strong>{email}</strong>.</p> <p>Please enter it below:</p>
   <form className="verification-form" onSubmit={handleSubmit(onSubmit)} noValidate>
 
    <input  placeholder="xxxxxx"
          {...register('code', { required: 'Verification code is required',   
          minLength: { value: 6, message: 'Code must be 6 digits' },
          maxLength: { value: 6, message: 'Code must be 6 digits' }, })} className={errors.code ? 'input-error' : ''} />
        {errors.code && <p className="validation-error"><i className="bi bi-exclamation-octagon"></i>{errors.code.message}</p>}
     
      {errors.form && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{errors.form.message}</p>
            <button className='btn btn-primary' onClick={() => { clearErrors('form'); }}>OK</button> </div>
        </div>
      )}

      <button type="submit" className="btn btn-primary btn-verify">Verify</button>
    </form>
    </div>
  )
}

export default VerifyEmailPage;