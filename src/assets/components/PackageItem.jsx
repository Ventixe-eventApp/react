import React from 'react'

const PackageItem = ({pkg}) => {
  return (
   <li key={pkg.id} className="package-item">
  <div className="package-info">
    <h4 className="package-name">{pkg.packageName}</h4>
    <div className='description-text'>
    <p className="package-type"><i className="bi bi-check-circle"></i>{pkg.seactionType}</p>
    <p className="package-description"><i className="bi bi-check-circle"></i>{pkg.description}</p>
    </div>
  </div>
  <div className="package-price">
    <span className="price">${pkg.price}</span>
  </div>
</li>
  )
}

export default PackageItem