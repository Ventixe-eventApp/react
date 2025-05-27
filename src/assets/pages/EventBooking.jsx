import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { EventContext } from '../contexts/EventContext';
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Hero from '../images/hero-booking.jpg'
import SeatMap from '../images/seat-map.svg';
import PackageItem from '../components/PackageItem';


const EventBooking = () => {
  const { id } = useParams();
  const { selectedEvent, fetchEventsById } = useContext(EventContext)
  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    fetchEventsById(id)

  }, [id])

  const onSubmit = async (data) => {
    const formData = {
      id: crypto.randomUUID(),
      eventId: id,
      userId: "",
      ticketQuatity: data.packageQuantity,
      bookingDate: new Date().toISOString(),
      packageId: data?.packageId || null,
      guestInfo: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        street: data.street,
        postalCode: data.postalCode,
        city: data.city,
        country: data.country
      }
    };

    try {
    
      const res = await fetch('https://booking-service-ventixe-ana6b3azaketebav.swedencentral-01.azurewebsites.net/api/Booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        navigate(`/event/booking/confirmation`, {
          state: {
            bookingId: formData.id,
            eventId: formData.eventId
          }
        })

      } else {
        setError('form', { type: 'manual', message: 'Something went wrong with your booking. Please try again.' })
      }
    } catch (error) {
      console.error("Error:", error);
      setError('form', { type: 'manual', message: 'A network error occurred. Please try again later.' })
    }
  }
  if (!selectedEvent) {
    return <p>Loading event...</p>;
  } else if (!selectedEvent.packages) {
    return <p>This event has no available packages.</p>;


  }
  return (
    <>
      <div className='hero-booking ' style={{ backgroundImage: `url(${Hero})` }}>
        <div className='booking-info'>
          <h1 className='header-booking'>{selectedEvent.eventName}</h1>
          <h2>{selectedEvent.artistName}</h2>
          <p className='booking-location'><i className="bi bi-geo-alt"></i> {selectedEvent.location}</p>
          <div className='booking-date'>
            <span className='header-date'>
              <i className="bi bi-calendar4-event"></i>
              {new Date(selectedEvent.startDate).toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              })}
            </span>
          </div>
        </div>
      </div>
      <div className='booking-container'>





        <div className='form-center'>
          <div className='booking-description'>
            <span>{selectedEvent.description}</span></div>
          {selectedEvent.packages && selectedEvent.packages.length > 0 && (
            <div className='package-card-booking'>
              <div className='package-list-booking'>
                <div className='package-image'>
                  <img src={SeatMap} alt="Map over seat plan" />
                </div>
                <ul className='package-list-booking'>
                  {selectedEvent.packages.map((pkg) => (
                    <PackageItem key={pkg.id} pkg={pkg} />
                  ))}
                </ul>
              </div>
            </div>
          )}

          <form className='booking-form' onSubmit={handleSubmit(onSubmit)} noValidate>
            <span className='form-text'>Please select the number of tickets you'd like to book (maximum 10 per person).
              If you're already a member, <Link to="/auth/login">log in here</Link> to access your account and enjoy a faster booking process.
              Not a member? Simply fill out the contact form below to complete your reservation.
            </span>
            <div className="form-group">
              <label htmlFor="packageId">Select Package</label>
              <select key={selectedEvent.eventId}
                id="packageId"
                {...register('packageId', {

                })}
                className={errors.packageId ? 'input-error' : ''}>
                <option value="">Choose a package</option>
                {selectedEvent.packages?.map(pkg => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.packageName}
                  </option>
                ))}
              </select>
              {errors.packageId && (
                <p className="validation-error">
                  <i className="bi bi-exclamation-octagon"></i> {errors.packageId.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="packageQuantity">Ticket Quantity</label>
              <select
                id="packageQuantity"
                {...register('packageQuantity', {
                  required: 'Select a quantity',
                  valueAsNumber: true
                })}
                className={errors.packageQuantity ? 'input-error' : ''}
              >
                <option value="">Select quantity</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              {errors.packageQuantity && (
                <p className="validation-error">
                  <i className="bi bi-exclamation-octagon"></i> {errors.packageQuantity.message}
                </p>
              )}
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
              <label htmlFor="email">Email</label>
              <input id="email" type="email" {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })}
                className={errors.email ? 'input-error' : ''} />
              {errors.email && <p className="validation-error"><i className="bi bi-exclamation-octagon"></i>{errors.email.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone</label>
              <input id="phoneNumber" type="text" {...register('phoneNumber', { required: 'Phone number is required' })}
                className={errors.phoneNumber ? 'input-error' : ''} />
              {errors.phoneNumber && <p className="validation-error"><i className="bi bi-exclamation-octagon"></i>{errors.phoneNumber.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="street">Street name</label>
              <input id="street" type="text" {...register('street', { required: 'Street name is required' })}
                className={errors.street ? 'input-error' : ''} />
              {errors.street && <p className="validation-error"><i className="bi bi-exclamation-octagon"></i>{errors.street.message}</p>}
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
            {errors.form && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <p>{errors.form.message}</p>
                  <button className='btn-primary' onClick={() => { clearErrors('form'); }}>OK</button> </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary">Buy tickets</button>
          </form>

        </div>
      </div>
    </>

  )
}
export default EventBooking