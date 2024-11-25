'use client'

import { useState } from 'react'
import { FiMapPin, FiPhone, FiMail, FiClock, FiMessageSquare, FiUser, FiMail as FiMailOutline } from 'react-icons/fi'

const NAIROBI_COORDINATES = { lat: -1.2921, lng: 36.8219 }

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus({ ...formStatus, isSubmitting: true })
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setFormStatus({
      isSubmitting: false,
      isSubmitted: true,
      error: null,
    })
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-32 mb-16">
        <div className="main-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Have questions about our uniforms? We're here to help you create the perfect uniform solution for your needs.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Visit Us Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FiMapPin className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Visit Us</h3>
              <p className="text-gray-600 text-center">
                Ruvia Enterprise Building<br />
                Kimathi Street<br />
                Nairobi, Kenya
              </p>
            </div>

            {/* Call Us Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FiPhone className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Call Us</h3>
              <p className="text-gray-600 text-center">
                <a href="tel:+254712718863" className="hover:text-blue-900">+254 712 718 863</a><br />
                <a href="tel:+254701740280" className="hover:text-blue-900">+254 701 740 280</a>
              </p>
            </div>

            {/* Business Hours Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FiClock className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Business Hours</h3>
              <p className="text-gray-600 text-center">
                Monday - Friday: 8:00 AM - 6:00 PM<br />
                Saturday: 9:00 AM - 4:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="py-16 bg-white">
        <div className="main-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMailOutline className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMessageSquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="quote">Request a Quote</option>
                    <option value="custom">Custom Order</option>
                    <option value="bulk">Bulk Order</option>
                    <option value="support">Support</option>
                  </select>
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows={6}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus.isSubmitting}
                  className={`w-full py-4 px-6 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                    formStatus.isSubmitting
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-900 hover:bg-blue-800'
                  }`}
                >
                  {formStatus.isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {formStatus.isSubmitted && (
                  <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Our Location</h2>
              <div className="rounded-xl overflow-hidden shadow-lg h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8175454779924!2d36.82039661475453!3d-1.2853697990669783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d62d4fccdd%3A0xd51591efb95f601f!2sKimathi%20Street%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1645783孟"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <p className="text-gray-600 mt-4 text-center">
                Visit us at Kimathi Street, Nairobi, Kenya
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="main-container">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-3">What are your delivery times?</h3>
              <p className="text-gray-600">Standard delivery takes 3-5 business days within Nairobi and 5-7 business days for other regions in Kenya.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Do you offer bulk orders?</h3>
              <p className="text-gray-600">Yes, we specialize in bulk orders for schools, businesses, and organizations with special pricing available.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Can I customize my uniforms?</h3>
              <p className="text-gray-600">Absolutely! We offer customization options including embroidery, printing, and custom designs.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-3">What's your return policy?</h3>
              <p className="text-gray-600">We accept returns within 14 days of delivery for unused items in original packaging.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
