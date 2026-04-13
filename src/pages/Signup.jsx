import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
  Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Eye,EyeOff, Loader2} from "lucide-react"
import { toast } from "sonner"
import axios from 'axios'

const Signup = () => {
  const formRef = useRef(null)

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  })

  const navigate = useNavigate();
  const handleChange = (e) => {     // e -> event object
    const {name,value} = e.target; // Destructuring
    setFormData((prev)=>({       // Updating state
      ...prev,        // spread operator , prev -> previous state
      [name] : value     //Dynamic key update
    }))
  }

  useEffect(() => {
    const handleEnterKey = (event) => {
      if (event.key !== 'Enter') return
      const targetTag = event.target.tagName.toLowerCase()
      if (targetTag === 'button') return
      submitHandler(event)
    }

    const current = formRef.current
    if (!current) return

    current.addEventListener('keydown', handleEnterKey)
    return () => current.removeEventListener('keydown', handleEnterKey)
  }, [formData])

  const submitHandler = async(e) => {
    if (e && e.preventDefault) {
      e.preventDefault();  // Page does NOT reload. You handle everything with JS
    }
  console.log(formData);
  try{
    setLoading(true);
    const res = await axios.post(`http://localhost:8000/api/v1/user/register`, formData, {
      headers:{
        "Content-Type":"application/json"
      }
    })

    if(res.data.success){
      navigate('/verify')
      toast.success(res.data.message)
    }
  }
  catch(error){
    console.log(error);
    toast.error(error.response?.data?.message || "Something went wrong")

  } finally{    // it works in both cases (success and error) , it is used to stop the loading state
    setLoading(false);
  }
}

  return(
    <div ref={formRef} className="flex items-center justify-center min-h-screen bg-pink-200">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>

            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name = "firstName"
                    type="text"
                    placeholder="John"
                    required
                    value = {formData.firstName}
                    onChange = {handleChange}
                  />
                </div>
                <div className = "grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName"
                    name = "lastName"
                    type="text"
                    placeholder="Doe"  
                    value = {formData.lastName}
                    onChange = {handleChange}          
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value = {formData.email}
                  onChange = {handleChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className = "relative">
                  <Input 
                  id="password" 
                  name = "password"
                  placeholder="Create a password"
                  type={showPassword ? "text" : "password"}
                  required 
                  value = {formData.password}
                  onChange = {handleChange}
                  />
                  {
                    showPassword ? <EyeOff onClick={() => setShowPassword(false)} className="w-5 h-5 text-gray-700 absolute right-5 bottom-2" />:<Eye onClick ={()=> setShowPassword(true)} className="w-5 h-5 text-gray-700 absolute right-5 bottom-2 "/>
                  }
                </div>
              </div>
            </div>
          
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={submitHandler} type="submit" className="w-full cursor-pointer bg-black hover:bg-gray-600">
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" mr-2 /> Please wait </> : "Signup"}
          </Button>
          <p className='text-gray-700 text-sm'> Already have an account? <Link className='hover:underline cursor-pointer text-pink-800' to='/login'> Login </Link></p>
        </CardFooter>
      </Card>
    </div>
  )
}


export default Signup