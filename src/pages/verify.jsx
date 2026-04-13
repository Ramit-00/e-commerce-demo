import React from'react'

const Verify = () =>{
  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-200">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Verify Your Account</h2>
        <p className="mb-6"> ✅ A verification email has been sent to your email address. Please check your inbox and click the link to verify your account.</p>
        {/* <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">Resend Verification Email</button> */}
      </div>
    </div>
  )
}


export default Verify 