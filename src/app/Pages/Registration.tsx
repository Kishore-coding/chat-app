
import React from "react"
import FormFields from "../Components/FormFields/FormFields"

const Registration = () => {
  return (
    <div className="registration-page">
      <div className="bg-image"></div>
      <div className="content-wrapper">
        <h1>Sign In</h1>
        <div className="form-container">
            <FormFields/>
        </div>
      </div>
    </div>
  )
}

export default Registration