import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { toast } from "sonner"
import axios from 'axios'

const SellerSignup = () => {
  const formRef = useRef(null)
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Personal Information
    sellerName: "",
    email: "",
    password: "",
    mobileNumber: "",

    // Business Details
    buissnessName: "",
    buissnessEmail: "",
    buissnessNumber: "",
    buissnessAddress: "",

    // Bank Details
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",

    // Pickup Address
    country: "",
    state: "",
    district: "",
    city: "",
    postalCode: "",
    addressLine1: "",
    addressLine2: "",

    // Additional Info
    GSTIN: ""
  })

  const countries = ["India", "United States", "United Kingdom", "Canada", "Australia"]
  const indianStates = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    const handleEnterKey = (event) => {
      if (event.key !== 'Enter') return
      const targetTag = event.target.tagName.toLowerCase()
      if (targetTag === 'button') return
      if (targetTag === 'textarea') return
      submitHandler(event)
    }

    const current = formRef.current
    if (!current) return

    current.addEventListener('keydown', handleEnterKey)
    return () => current.removeEventListener('keydown', handleEnterKey)
  }, [formData])

  const submitHandler = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault()
    }

    // Validation
    if (!formData.sellerName.trim()) { toast.error("Seller name is required"); return }
    if (!formData.email.trim()) { toast.error("Email is required"); return }
    if (!formData.password.trim()) { toast.error("Password is required"); return }
    if (formData.password.length < 6) { toast.error("Password must be at least 6 characters"); return }
    if (!formData.mobileNumber.toString().trim()) { toast.error("Mobile number is required"); return }
    if (!formData.buissnessName.trim()) { toast.error("Business name is required"); return }
    if (!formData.buissnessEmail.trim()) { toast.error("Business email is required"); return }
    if (!formData.buissnessNumber.toString().trim()) { toast.error("Business contact number is required"); return }
    if (!formData.buissnessAddress.trim()) { toast.error("Business address is required"); return }
    if (!formData.accountHolderName.trim()) { toast.error("Account holder name is required"); return }
    if (!formData.accountNumber.toString().trim()) { toast.error("Account number is required"); return }
    if (!formData.ifscCode.trim()) { toast.error("IFSC code is required"); return }
    if (!formData.bankName.trim()) { toast.error("Bank name is required"); return }
    if (!formData.GSTIN.trim()) { toast.error("GSTIN is required"); return }
    if (!formData.city.trim()) { toast.error("City is required"); return }
    if (!formData.postalCode.trim()) { toast.error("Postal code is required"); return }
    if (!formData.addressLine1.trim()) { toast.error("Address is required"); return }

    setLoading(true)
    try {
      const response = await axios.post('http://localhost:8000/api/v1/seller/register', {
        sellerName: formData.sellerName,
        email: formData.email,
        password: formData.password,
        mobileNumber: parseInt(formData.mobileNumber),
        buisnessDetails: {
          buissnessName: formData.buissnessName,
          buissnessEmail: formData.buissnessEmail,
          buissnessNumber: parseInt(formData.buissnessNumber),
          buissnessAddress: formData.buissnessAddress
        },
        bankDetails: {
          accountHolderName: formData.accountHolderName,
          accountNumber: parseInt(formData.accountNumber),
          ifscCode: formData.ifscCode,
          bankName: formData.bankName
        },
        pickupAddress: {
          country: formData.country,
          state: formData.state,
          district: formData.district,
          city: formData.city,
          postalCode: formData.postalCode,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2 || null
        },
        GSTIN: formData.GSTIN
      })

      if (response.data.success) {
        toast.success(response.data.message || "Seller registration successful!")
        navigate('/login')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Registration failed")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Seller Registration</CardTitle>
          <CardDescription>
            Create your seller account to start selling on eKart
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form ref={formRef} onSubmit={submitHandler} className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sellerName">Full Name *</Label>
                  <Input
                    id="sellerName"
                    name="sellerName"
                    placeholder="John Doe"
                    value={formData.sellerName}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seller@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="mobileNumber">Mobile Number *</Label>
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    placeholder="9876543210"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter a strong password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Business Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="buissnessName">Business Name *</Label>
                  <Input
                    id="buissnessName"
                    name="buissnessName"
                    placeholder="Your Business Name"
                    value={formData.buissnessName}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="buissnessEmail">Business Email *</Label>
                  <Input
                    id="buissnessEmail"
                    name="buissnessEmail"
                    type="email"
                    placeholder="business@example.com"
                    value={formData.buissnessEmail}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="buissnessNumber">Business Contact Number *</Label>
                  <Input
                    id="buissnessNumber"
                    name="buissnessNumber"
                    type="tel"
                    placeholder="9876543210"
                    value={formData.buissnessNumber}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="GSTIN">GSTIN *</Label>
                  <Input
                    id="GSTIN"
                    name="GSTIN"
                    placeholder="27ABCDE1234F2Z5"
                    value={formData.GSTIN}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="buissnessAddress">Business Address *</Label>
                <Input
                  id="buissnessAddress"
                  name="buissnessAddress"
                  placeholder="Complete business address"
                  value={formData.buissnessAddress}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Bank Details Section */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Bank Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Input
                    id="bankName"
                    name="bankName"
                    placeholder="HDFC Bank"
                    value={formData.bankName}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="accountHolderName">Account Holder Name *</Label>
                  <Input
                    id="accountHolderName"
                    name="accountHolderName"
                    placeholder="Name as per bank records"
                    value={formData.accountHolderName}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input
                    id="accountNumber"
                    name="accountNumber"
                    type="tel"
                    placeholder="50100123456789"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="ifscCode">IFSC Code *</Label>
                  <Input
                    id="ifscCode"
                    name="ifscCode"
                    placeholder="HDFC0001234"
                    value={formData.ifscCode}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Pickup Address</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500"
                    >
                      <option value="">Select country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      disabled={formData.country !== "India"}
                      className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 disabled:bg-slate-100"
                    >
                      <option value="">Select state</option>
                      {formData.country === "India" && indianStates.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      name="district"
                      placeholder="District"
                      value={formData.district}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="addressLine1">Address Line 1 *</Label>
                  <Input
                    id="addressLine1"
                    name="addressLine1"
                    placeholder="Street address, P.O. box, company name"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="addressLine2">Address Line 2</Label>
                  <Input
                    id="addressLine2"
                    name="addressLine2"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="postalCode">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    placeholder="110001"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Agreement */}
            <div className="text-sm text-slate-600">
              By registering, you agree to our{' '}
              <a href="#" className="text-slate-900 hover:underline font-medium">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-slate-900 hover:underline font-medium">
                Privacy Policy
              </a>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button
            onClick={submitHandler}
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white"
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Please wait </>
            ) : (
              "Register as Seller"
            )}
          </Button>
          <p className="text-sm text-center text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="text-slate-900 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SellerSignup
