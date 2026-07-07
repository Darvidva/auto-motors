import { z } from 'zod';

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Strip HTML tags and collapse whitespace — used to sanitise free-text inputs */
function sanitize(value: string): string {
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
    .trim();
}

const safeString = (label: string, min = 1, max = 255) =>
  z
    .string({ required_error: `${label} is required` })
    .transform(sanitize)
    .pipe(
      z
        .string()
        .min(min, `${label} must be at least ${min} character(s)`)
        .max(max, `${label} must be at most ${max} characters`)
    );

const optionalSafeString = (label: string, max = 255) =>
  z
    .union([z.string(), z.null(), z.undefined()])
    .transform((value) => (typeof value === 'string' ? sanitize(value) : ''))
    .refine((value) => value.length <= max, `${label} must be at most ${max} characters`);

const safeEmail = z
  .string({ required_error: 'Email is required' })
  .transform(sanitize)
  .pipe(z.string().email('Please enter a valid email address').max(320));

const safePhone = z
  .string()
  .transform(sanitize)
  .pipe(
    z
      .string()
      .max(30, 'Phone number is too long')
      .regex(/^[+\d\s()-]*$/, 'Phone number contains invalid characters')
  )
  .optional()
  .or(z.literal(''));

const optionalUuid = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((value) => (typeof value === 'string' ? sanitize(value) : ''))
  .refine(
    (value) => value === '' || /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value),
    'Invalid identifier'
  )
  .transform((value) => value || null);

// ─── Login Schema ───────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: safeEmail,
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .max(128, 'Password is too long'),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

// ─── Contact / Enquiry Schema ───────────────────────────────────────────────

export const contactSchema = z.object({
  name: safeString('Name', 2, 100),
  email: safeEmail,
  phone: safePhone,
  message: safeString('Message', 10, 2000),
});
export type ContactFormValues = z.infer<typeof contactSchema>;

export const enquirySubmissionSchema = contactSchema.extend({
  listingId: optionalUuid,
  listingName: optionalSafeString('Listing name', 200).transform((value) => value || null),
});
export type EnquirySubmissionValues = z.infer<typeof enquirySubmissionSchema>;

export const enquiryStatusSchema = z.object({
  status: z.enum(['Unread', 'Read', 'Followed Up', 'Resolved']),
});
export type EnquiryStatusValues = z.infer<typeof enquiryStatusSchema>;

// ─── Admin Settings Schema ──────────────────────────────────────────────────

export const settingsSchema = z.object({
  name: safeString('Business name', 1, 150),
  tagline: safeString('Tagline', 1, 255),
  phone: z
    .string()
    .transform(sanitize)
    .pipe(
      z
        .string()
        .min(1, 'Phone is required')
        .max(30, 'Phone number is too long')
        .regex(/^[+\d\s()-]*$/, 'Phone number contains invalid characters')
    ),
  whatsapp: z
    .string()
    .transform(sanitize)
    .pipe(
      z
        .string()
        .min(1, 'WhatsApp number is required')
        .max(20, 'WhatsApp number is too long')
        .regex(/^\d+$/, 'WhatsApp number should contain digits only')
    ),
  email: safeEmail,
  address: safeString('Address', 5, 500),
  heroImages: z
    .object({
      home: optionalSafeString('Home Hero Image', 500),
      inventory: optionalSafeString('Inventory Hero Image', 500),
      about: optionalSafeString('About Hero Image', 500),
      contact: optionalSafeString('Contact Hero Image', 500),
    })
    .default({ home: '', inventory: '', about: '', contact: '' }),
  teamMembers: z
    .array(
      z.object({
        name: safeString('Name', 1, 100),
        role: safeString('Role', 1, 100),
        image: safeString('Image', 1, 500),
        bio: safeString('Bio', 1, 1000),
      })
    )
    .default([]),
});
export type SettingsFormValues = z.infer<typeof settingsSchema>;

// ─── Admin Listing Schema ───────────────────────────────────────────────────

const categories = ['Cars', 'Trucks', 'Tractors', 'Excavators', 'Heavy Machinery', 'Equipment'] as const;
const conditions = ['New', 'Used'] as const;
const transmissions = ['Automatic', 'Manual', 'N/A'] as const;
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'N/A'] as const;

export const listingSchema = z.object({
  name: safeString('Name', 2, 200),
  category: z.enum(categories, { required_error: 'Category is required' }),
  brand: safeString('Brand', 1, 100),
  model: safeString('Model', 1, 100),
  year: z.coerce.number().int().min(1900, 'Year is too old').max(new Date().getFullYear() + 2, 'Year is in the future'),
  price: z.coerce.number().int().min(1, 'Price must be greater than 0'),
  mileage: z.coerce.number().int().nonnegative().nullable().optional(),
  hoursUsed: z.coerce.number().int().nonnegative().nullable().optional(),
  transmission: z.enum(transmissions).default('Automatic'),
  fuelType: z.enum(fuelTypes).default('Diesel'),
  driveSystem: safeString('Drive system', 1, 20).default('4WD'),
  condition: z.enum(conditions).default('Used'),
  color: optionalSafeString('Color', 50),
  interiorColor: optionalSafeString('Interior Color', 50),
  bodyType: optionalSafeString('Body Type', 50),
  engineCapacity: optionalSafeString('Engine Capacity', 50),
  vin: optionalSafeString('VIN', 50),
  serviceHistory: optionalSafeString('Service History', 100),
  numberOfKeys: z.coerce.number().int().nonnegative().nullable().optional(),
  description: safeString('Description', 10, 5000),
  features: z.array(z.string().transform(sanitize)).default([]),
  images: z.array(z.string().url('Invalid image URL')).min(1, 'At least one image is required'),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
});
export type ListingFormValues = z.infer<typeof listingSchema>;