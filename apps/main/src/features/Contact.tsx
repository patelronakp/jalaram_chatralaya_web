"use client"

import React, { useState } from "react"

import { Card } from "../components/Card"
import { MaterialIcon } from "../components/Icons"
import { CONTACT_CONTENT } from "../constants/content"

export function Contact() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple verification check / log
    console.log({ name, phone, email, message })
    alert("તમારો સંદેશ સફળતાપૂર્વક મોકલવામાં આવ્યો છે. અમે ટૂંક સમયમાં તમારો સંપર્ક કરીશું.")
    setName("")
    setPhone("")
    setEmail("")
    setMessage("")
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#eff3ff]/40 font-gujarati">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left Column: Details & Map */}
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-6">
            {CONTACT_CONTENT.title}
          </h2>
          <p className="text-base md:text-lg text-on-surface-variant mb-12 max-w-lg font-sans leading-relaxed">
            {CONTACT_CONTENT.subtitle}
          </p>

          {/* Details List */}
          <div className="space-y-8">
            {CONTACT_CONTENT.details.map((detail, idx) => (
              <div key={idx} className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-white shadow-md flex-shrink-0">
                  <MaterialIcon name={detail.icon} className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-bold text-lg md:text-xl mb-1 text-primary">{detail.label}</h4>
                  <p className="text-on-surface-variant text-base md:text-lg leading-relaxed font-sans whitespace-pre-line">
                    {detail.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Map Preview */}
          <div className="mt-12 md:mt-16 rounded-3xl overflow-hidden shadow-2xl border-8 border-white h-72 relative">
            <div className="w-full h-full bg-slate-200 flex items-center justify-center grayscale">
              <MaterialIcon name="map" className="text-primary text-5xl mr-3" />
              <span className="font-bold text-lg md:text-xl text-primary">ગૂગલ મેપ જુઓ</span>
            </div>
          </div>
        </div>

        {/* Right Column: Enquiry Form Card */}
        <Card className="p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl text-primary font-bold mb-8">
            {CONTACT_CONTENT.form.title}
          </h3>

          <form className="space-y-6 md:space-y-8 font-sans" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Name */}
              <div>
                <label className="block font-semibold text-sm md:text-base text-on-surface-variant mb-2">
                  {CONTACT_CONTENT.form.nameLabel}
                </label>
                <input
                  required
                  className="w-full px-5 py-3 md:py-4 bg-[#fdfcf7] border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-base transition-all"
                  placeholder={CONTACT_CONTENT.form.namePlaceholder}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block font-semibold text-sm md:text-base text-on-surface-variant mb-2">
                  {CONTACT_CONTENT.form.phoneLabel}
                </label>
                <input
                  required
                  pattern="[0-9]{10}"
                  className="w-full px-5 py-3 md:py-4 bg-[#fdfcf7] border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-base transition-all"
                  placeholder={CONTACT_CONTENT.form.phonePlaceholder}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold text-sm md:text-base text-on-surface-variant mb-2">
                {CONTACT_CONTENT.form.emailLabel}
              </label>
              <input
                className="w-full px-5 py-3 md:py-4 bg-[#fdfcf7] border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-base transition-all"
                placeholder={CONTACT_CONTENT.form.emailPlaceholder}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block font-semibold text-sm md:text-base text-on-surface-variant mb-2">
                {CONTACT_CONTENT.form.messageLabel}
              </label>
              <textarea
                required
                className="w-full px-5 py-3 md:py-4 bg-[#fdfcf7] border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-base transition-all"
                placeholder={CONTACT_CONTENT.form.messagePlaceholder}
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            {/* Submit */}
            <button
              className="w-full py-4 bg-primary text-white font-bold text-lg md:text-xl rounded-xl hover:bg-primary-container shadow-xl transition-all active:scale-[0.98] font-gujarati"
              type="submit"
            >
              {CONTACT_CONTENT.form.submitBtn}
            </button>
          </form>
        </Card>
      </div>
    </section>
  )
}

export default Contact
