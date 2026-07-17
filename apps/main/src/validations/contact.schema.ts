import * as Yup from "yup"

export const contactValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid email address"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
})

export type ContactFormValues = Yup.InferType<typeof contactValidationSchema>
