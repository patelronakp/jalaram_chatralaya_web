"use client"

import { useFormik } from "formik"
import { useTranslations } from "next-intl"
import React from "react"
import toast from "react-hot-toast"

import { Card } from "../components/Card"
import { MaterialIcon } from "../components/Icons"
import { submitContactToFormspree } from "../services/contact.service"
import { contactValidationSchema } from "../validations/contact.schema"

const cleanPhoneForDialing = (num: string) => {
  const guToEn: { [key: string]: string } = {
    "૦": "0",
    "૧": "1",
    "૨": "2",
    "૩": "3",
    "૪": "4",
    "૫": "5",
    "૬": "6",
    "૭": "7",
    "૮": "8",
    "૯": "9",
  }
  const replaced = num.replace(/[૦-૯]/g, (char) => guToEn[char] || char)
  return replaced.replace(/[^0-9+]/g, "")
}

export function Contact() {
  const t = useTranslations("contact")

  const details = [
    {
      icon: "location_on",
      label: t("addressLabel"),
      value: t("addressVal"),
      type: "address",
    },
    {
      icon: "call",
      label: t("phoneLabel"),
      value: t("phoneVal"),
      type: "phone",
    },
    {
      icon: "mail",
      label: t("emailLabel"),
      value: t("emailVal"),
      type: "email",
    },
  ]

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
    validationSchema: contactValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      const result = await submitContactToFormspree(values)
      if (result.ok) {
        toast.success(t("form.alert"))
        resetForm()
      } else {
        toast.error(result.error)
      }
    },
  })

  return (
    <section id="contact" className="py-20 md:py-28 bg-surface-container-low/40 font-gujarati">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left Column: Details & Map */}
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-6">
            {t("title")}
          </h2>
          <p className="text-base md:text-lg text-on-surface-variant mb-12 max-w-lg font-sans leading-relaxed">
            {t("subtitle")}
          </p>

          {/* Details List */}
          <div className="space-y-8">
            {details.map((detail, idx) => (
              <div key={idx} className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-white shadow-md flex-shrink-0">
                  <MaterialIcon name={detail.icon} className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-bold text-lg md:text-xl mb-1 text-primary">{detail.label}</h4>
                  {detail.type === "phone" ? (
                    <div className="flex flex-col">
                      {detail.value.split("\n").map((num, i) => {
                        const cleanNum = cleanPhoneForDialing(num.trim())
                        return (
                          <a
                            key={i}
                            href={`tel:${cleanNum}`}
                            className="text-on-surface-variant hover:text-primary transition-colors text-base md:text-lg leading-relaxed font-sans block"
                          >
                            {num.trim()}
                          </a>
                        )
                      })}
                    </div>
                  ) : detail.type === "email" ? (
                    <a
                      href={`mailto:${detail.value}`}
                      className="text-on-surface-variant hover:text-primary transition-colors text-base md:text-lg leading-relaxed font-sans break-all block"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="text-on-surface-variant text-base md:text-lg leading-relaxed font-sans whitespace-pre-line">
                      {detail.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Map Preview */}
          <div className="mt-12 md:mt-16 rounded-3xl overflow-hidden shadow-2xl border-8 border-white h-72 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4337.957493299272!2d70.64394759999999!3d23.5674833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395a636a41f730e9%3A0x90eb2e774dbbc962!2sShree%20Jalaram%20Raghuvanshi%20Lohana%20Kanya%20Chatralaya!5e1!3m2!1sen!2sin!4v1784294854575!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
            ></iframe>
          </div>
        </div>

        {/* Right Column: Enquiry Form Card */}
        <Card className="p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl text-primary font-bold mb-8">{t("form.title")}</h3>

          <form className="space-y-6 md:space-y-8 font-sans" onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Name */}
              <div>
                <label className="block font-semibold text-sm md:text-base text-on-surface-variant mb-2">
                  {t("form.name")}
                </label>
                <input
                  id="name"
                  name="name"
                  className={`w-full px-5 py-3 md:py-4 bg-background border ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-outline-variant/30 focus:ring-primary"
                  } rounded-xl focus:ring-2 focus:border-transparent outline-none text-base transition-all`}
                  placeholder={t("form.namePlaceholder")}
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block font-semibold text-sm md:text-base text-on-surface-variant mb-2">
                  {t("form.phone")}
                </label>
                <input
                  id="phone"
                  name="phone"
                  className={`w-full px-5 py-3 md:py-4 bg-background border ${
                    formik.touched.phone && formik.errors.phone
                      ? "border-red-500 focus:ring-red-500"
                      : "border-outline-variant/30 focus:ring-primary"
                  } rounded-xl focus:ring-2 focus:border-transparent outline-none text-base transition-all`}
                  placeholder={t("form.phonePlaceholder")}
                  type="tel"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold text-sm md:text-base text-on-surface-variant mb-2">
                {t("form.email")}
              </label>
              <input
                id="email"
                name="email"
                className={`w-full px-5 py-3 md:py-4 bg-background border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-outline-variant/30 focus:ring-primary"
                } rounded-xl focus:ring-2 focus:border-transparent outline-none text-base transition-all`}
                placeholder={t("form.emailPlaceholder")}
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block font-semibold text-sm md:text-base text-on-surface-variant mb-2">
                {t("form.message")}
              </label>
              <textarea
                id="message"
                name="message"
                className={`w-full px-5 py-3 md:py-4 bg-background border ${
                  formik.touched.message && formik.errors.message
                    ? "border-red-500 focus:ring-red-500"
                    : "border-outline-variant/30 focus:ring-primary"
                } rounded-xl focus:ring-2 focus:border-transparent outline-none text-base transition-all`}
                placeholder={t("form.messagePlaceholder")}
                rows={4}
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.touched.message && formik.errors.message && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              className="w-full py-4 bg-primary text-white font-bold text-lg md:text-xl rounded-xl hover:bg-primary-container shadow-xl transition-all active:scale-[0.98] font-gujarati disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
              type="submit"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {formik.isSubmitting ? (
                <span className="flex items-center gap-2">
                  <MaterialIcon name="refresh" className="animate-spin" />
                  {t("form.submit")}...
                </span>
              ) : (
                t("form.submit")
              )}
            </button>
          </form>
        </Card>
      </div>
    </section>
  )
}

export default Contact
