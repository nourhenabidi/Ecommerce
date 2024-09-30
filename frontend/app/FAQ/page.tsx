"use client"
import React from 'react'
import Navbar from '../navBar/page'
import Footer from '../footer/page'

function FAQ() {
  return (
    <div>
        <Navbar />
        <div className='body'>
        <section className=" text-black py-32 min-h-screen  ">
    <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
      <h2 className="mb-12 text-4xl font-bold leadi text-center sm:text-5xl">Frequently Asked Questions</h2>
      <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-gray-700">
        <details>
          <summary className="py-2 outline-none cursor-pointer focus:underline text-orange-900">How can I place an order?</summary>
          <div className="px-4 pb-4">
            <p>You can easily place an order on our website by browsing our product catalog, selecting the items you want, and adding them to your cart. Then, proceed to checkout, where you can provide your shipping and payment information to complete the order.</p>
          </div>
        </details>
        <details>
          <summary className="py-2 outline-none cursor-pointer focus:underline text-orange-900">What payment methods do you accept?</summary>
          <div className="px-4 pb-4">
            <p>We accept various payment methods, including credit cards, debit cards, net banking, and mobile wallet payments. You can choose the payment option that is most convenient for you during the checkout process.</p>
          </div>
        </details>
        <details>
          <summary className="py-2 outline-none cursor-pointer focus:underline text-orange-900">How long does shipping take?</summary>
          <div className="px-4 pb-4">
            <p>Shipping times may vary depending on your location and the shipping method chosen. Typically, orders are processed within 1-2 business days, and delivery can take 3-7 business days within India. You will receive a tracking notification once your order is shipped.</p>
          </div>
        </details>
        <details>
          <summary className="py-2 outline-none cursor-pointer focus:underline text-orange-900">Can I return a product if I'm not satisfied?</summary>
          <div className="px-4 pb-4">
            <p>Yes, we have a hassle-free return policy. If you are not satisfied with your purchase, you can initiate a return within 30 days of receiving the product. Please contact our customer support at <a href="/contact" className="underline text-orange-900">example@gmail.com</a> for assistance.</p>
          </div>
        </details>
        <details>
          <summary className="py-2 outline-none cursor-pointer focus:underline text-orange-900">Do you offer international shipping?</summary>
          <div className="px-4 pb-4">
            <p>Currently, we only provide shipping services within India. However, we may consider expanding our shipping options to international locations in the future. Please stay updated with our website for any changes in shipping destinations.</p>
          </div>
        </details>
        <details>
          <summary className="py-2 outline-none cursor-pointer focus:underline text-orange-900">What is your customer support contact?</summary>
          <div className="px-4 pb-4">
            <p>If you have any questions, concerns, or need assistance, you can reach our customer support team at 9911083755 during our business hours, Monday to Saturday from 10 am to 6 pm. You can also contact us via email at <a href="/contact" className="underline text-orange-900">example@gmail.com</a>.</p>
          </div>
        </details>
        <details>
          <summary className="py-2 outline-none cursor-pointer focus:underline text-orange-900">What are your terms and conditions?</summary>
          <div className="px-4 pb-4">
            <p>You can find our detailed terms and conditions by visiting our 
              <a href="/TermsofService" className="underline text-orange-900">Terms of Service</a> 
              page on our website. It includes information about our policies, user guidelines, and more.</p>
          </div>
        </details>
      </div>
    </div>
  </section>
  <Footer />
  </div>
  </div>
  )
}

export default FAQ