import * as z from "zod";

export const shippingSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  address: z.string().min(5, "Address must be at least 5 characters."),
  city: z.string().min(2, "City must be at least 2 characters."),
  state: z.string().min(2, "State must be at least 2 characters."),
  zipCode: z.string().min(4, "Please enter a valid ZIP code."),
  country: z.string().min(2, "Country is required."),
});

export const paymentSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits."),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format (e.g., 12/25)."),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits."),
  nameOnCard: z.string().min(2, "Name on card is required."),
});

export type ShippingFormValues = z.infer<typeof shippingSchema>;
export type PaymentFormValues = z.infer<typeof paymentSchema>;
