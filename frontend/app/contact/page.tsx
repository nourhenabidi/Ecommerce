
'use client'

import { useState } from 'react'
import Fot from"../footer/page"
import Na from "../navBar/page"
import Map from "../map/page"

const Contact:React.FC=()=> {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="body" >
      <Na />
     
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
        Ask, tell, express, inquire
        {/* Are you experiencing a technical issue? Do you want to share your thoughts on a beta feature? Inform us. */}
        </p>
      </div>
      <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className=" grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">



          <div className="sm:col-span-2 ">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                type="email"
                placeholder='Your email adress'
                autoComplete="email"
                className="block w-full border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-range-850 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Topic
            </label>
            <div className="mt-2.5">
              <input
                id="company"
                placeholder='.........'
                type="text"
                autoComplete="organization"
                className="block w-full border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-range-850 sm:text-sm sm:leading-6"
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
                placeholder='Feel free ....'
                name="message"
                rows={4}
                className="block w-full border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-range-850 sm:text-sm sm:leading-6"
                defaultValue={''}
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
  
    <Map />  


    <Fot/>
    </div>
  )
}
export default Contact