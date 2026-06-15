export type Category =
  | 'Cars'
  | 'Trucks'
  | 'Tractors'
  | 'Excavators'
  | 'Heavy Machinery'
  | 'Equipment';

export type Condition = 'New' | 'Used';

export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'N/A';

export type Transmission = 'Automatic' | 'Manual' | 'N/A';

export type DriveSystem = '2WD' | '4WD' | 'AWD' | '6x6' | 'N/A' | string;

export interface Listing {
  id: string;
  slug: string;
  name: string;
  category: Category;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage?: number;
  hoursUsed?: number;
  transmission: Transmission;
  fuelType: FuelType;
  driveSystem: DriveSystem;
  condition: Condition;
  color: string;
  description: string;
  specifications: Record<string, string>;
  features: string[];
  images: string[];
  featured: boolean;
  published: boolean;
  createdAt: string;
}

export interface VehicleSpecs {
  make: string;
  model: string;
  year: number;
  engine?: string;
  horsepower?: number;
  transmission: Transmission;
  driveType: DriveSystem;
  fuelType: FuelType;
  mileage?: number;
  seating?: number;
  bodyType?: string;
  color: string;
}

export interface MachinerySpecs {
  make: string;
  model: string;
  year: number;
  enginePower?: number;
  operatingHours?: number;
  fuelType: FuelType;
  driveSystem: DriveSystem;
  liftCapacity?: string;
  attachmentsIncluded?: string[];
  dimensions?: string;
  weight?: string;
  color: string;
}

export interface TrustPoint {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface CategoryInfo {
  name: Category;
  slug: string;
  icon: string;
  listingCount: number;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  listingId?: string;
  listingName?: string;
  status: 'Unread' | 'Read' | 'Followed Up' | 'Resolved';
  createdAt: string;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: {
    day: string;
    open: string;
    close: string;
    closed: boolean;
  }[];
  socialMedia: {
    platform: string;
    url: string;
  }[];
}
