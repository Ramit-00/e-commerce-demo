import React from "react"
import {
  Card,
  CardContent,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Profile = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-100">

      <Tabs defaultValue="profile" className="max-w-5xl mx-auto">

        {/* Tabs Navigation */}
        <TabsList className="grid w-full grid-cols-2 bg-white border rounded-lg p-1">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-slate-900 data-[state=active]:text-white rounded-md"
          >
            Profile
          </TabsTrigger>

          <TabsTrigger
            value="orders"
            className="data-[state=active]:bg-slate-900 data-[state=active]:text-white rounded-md"
          >
            Orders
          </TabsTrigger>
        </TabsList>

        {/* ================= PROFILE TAB ================= */}
        <TabsContent value="profile" className="mt-6">

          <div className="flex flex-col items-center">

            <h1 className="font-bold mb-6 text-2xl text-gray-800">
              Update Profile
            </h1>

            <div className="w-full flex flex-col md:flex-row gap-10 items-start justify-between">

              {/* ================= PROFILE IMAGE ================= */}
              <div className="flex flex-col items-center">
                <img
                  src="/rt.jpeg"
                  alt="profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-pink-600"
                />

                <label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
                  Change Picture
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>

              {/* ================= PROFILE FORM ================= */}
              <form className="w-full bg-white shadow-lg p-6 rounded-lg space-y-4">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>
                    <Label className="text-sm font-medium">First Name</Label>
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="John"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Last Name</Label>
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      className="mt-1"
                    />
                  </div>

                </div>

                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    disabled
                    className="mt-1 bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Phone Number</Label>
                  <Input
                    type="text"
                    name="phone"
                    placeholder="Enter your Contact No"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Address</Label>
                  <Input
                    type="text"
                    name="address"
                    placeholder="Enter your Address"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>
                    <Label className="text-sm font-medium">City</Label>
                    <Input
                      type="text"
                      name="city"
                      placeholder="Enter your City"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Zip Code</Label>
                    <Input
                      type="text"
                      name="zipCode"
                      placeholder="Enter your Zip Code"
                      className="mt-1"
                    />
                  </div>

                </div>

                <Button
                  type="submit"
                  className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold"
                >
                  Update Profile
                </Button>

              </form>

            </div>
          </div>

        </TabsContent>

        {/* ================= ORDERS TAB ================= */}
        <TabsContent value="orders" className="mt-6">
          <Card className="shadow-sm border">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold text-slate-800">
                My Orders
              </h2>
              <p className="text-sm text-slate-500">
                You have no orders yet.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  )
}

export default Profile