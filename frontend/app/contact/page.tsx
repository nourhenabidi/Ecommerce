'use client'
import React ,{ useState,useEffect } from 'react'
import axios from 'axios'
import Fot from "../footer/page"
import Na from "../navBar/page"
import Map from "../map/page"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email'

const Contact: React.FC = () => {
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  

  const notify = () => {
    toast.success("Your email sent successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  
    try {
      const response = await axios.post('http://localhost:5000/api/users/sendEmail', {
        email,
        subject,
        message,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
  notify()
      if (response.status === 200) {
        console.log('Email sent successfully')
        // You can show a success message to the user here
      } else {
        console.error('Failed to send email')
        // You can show an error message to the user here
      }
    } catch (error) {
      console.error('Error:', error)
      // You can handle any additional errors here
    }
  }
  

  return (
    <div className="body">
      <Na />
      <ToastContainer />
      <div style={{ display: 'flex', alignItems: "flex-end" }}>
        <div className="flex flex-col justify-start w-1/2 p-8">
          <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            >
              <div
                className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg]  from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
              />
            </div>

            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h2>
              <p className="mt-2 text-2xl leading-8 text-gray-600">
                Ask, Tell, Express, Inquire <br />
                <PhoneIcon className="mr-2" /> +216 92 623 792 <br />
    <EmailIcon className="mr-2" /> admin@gmail.com 
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="email"
                      type="email"
                      placeholder="Your email address"
                      autoComplete="email"
                      className="block w-full border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-range-850 sm:text-sm sm:leading-6"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold leading-6 text-gray-900">
                    Topic
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="topic"
                      placeholder="........."
                      type="text"
                      className="block w-full border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-range-850 sm:text-sm sm:leading-6"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                    Message
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      id="message"
                      placeholder="Feel free ...."
                      name="message"
                      rows={4}
                      className="block w-full border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-range-850 sm:text-sm sm:leading-6"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                </div>

              </div>
              <div className="mt-10">
                <button
                  type="submit"
                  className="block w-full border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-range-950 sm:text-sm sm:leading-6"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <Map />
        </div>
      </div>
      <Fot />
    </div>
  )
}

export default Contact
