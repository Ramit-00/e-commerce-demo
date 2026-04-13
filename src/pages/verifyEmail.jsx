import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const VerifyEmail = () =>{
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Verifying...')
  
  const verifyEmail = async () => {
    try{
      const res = await axios.post(`http://localhost:8000/api/v1/user/verify`, {},{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })

      if(res.data.success){
        setStatus(" ✅ Your email has been successfully verified. You can now log in to your account.")
        setTimeout(()=>{
          navigate('/login')
        },2000);
      }

    }
    catch(error){
      console.log(error);
      setStatus(" ❌ Verification failed. Please try again.")
    }
  }

  useEffect(()=>{
    verifyEmail();
  },[token])

  return (
    <div className='relative w-full h-[760px] bg-blue-300 overflow-hidden'>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-md w-full max-w-md text-center'>
        <div className = "bg-white p-6 rounded-2xl shadow-md text-center w-[90%] max-w-md">
          <h2 className="text-xl font-semibold text-gray-800">
            {status}
          </h2>

        </div>
      </div>
      
    </div>
  ) 
}

export default VerifyEmail;