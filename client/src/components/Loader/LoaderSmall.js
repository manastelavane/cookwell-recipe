import React from 'react'
import './Loader.css'
const LoaderSmall = () => {
  return (
    <div className="small-loader-container">
      	  <div className="small-spinner"></div>
          <h3 style={{textAlign:'center'}}>Loading your dishes...</h3>
    </div>
  )
}

export default LoaderSmall
