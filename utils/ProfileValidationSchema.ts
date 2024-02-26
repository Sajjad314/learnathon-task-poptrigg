import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];
export const ProfileValidationSchema = z.object({
  firstName: z
    .string()
    .min(3, "FIrst Name must contain atleast 3 character")
    .max(20, "FIrst Name must not be bigger than 20 character"),
  lastName: z
    .string()
    .min(3, "Last Name must contain atleast 3 character")
    .max(20, "Last Name must not be bigger than 20 character"),
  email: z.string().email(),
  phoneNumber: z.string().refine(
    (phoneNumber) => {
      const bangladeshiPattern = /^(?:\+?88|0088)?01[3-9]\d{8}$/;
      const usPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
      return (
        bangladeshiPattern.test(phoneNumber) || usPattern.test(phoneNumber)
      );
    },
    {
      message: "Invalid Bangladeshi phone number",
    }
  ),
  profileImage: z
    .any()
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.type),
      "Invalid Format"
    ),
  storeURL: z.string().url(),
  storeName: z.string().min(3, "Must be a valid name"),
  userID: z.string().min(6, "UserID must contain at least 6 characters"),
});
