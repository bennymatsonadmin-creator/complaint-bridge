export interface Industry {
  value: string;
  label: string;
  companies: string[];
}

export interface Country {
  value: string;
  label: string;
}

export interface Outcome {
  value: string;
  label: string;
}

export interface ContactMethod {
  value: string;
  label: string;
}

export interface ContactStatus {
  value: string;
  label: string;
}

// Industry categories with suggested company names
export const industries: Industry[] = [
  {
    value: 'Airlines',
    label: 'Airlines & Flight Issues',
    companies: ['Delta Air Lines', 'American Airlines', 'United Airlines', 'Ryanair', 'EasyJet', 'British Airways', 'Emirates', 'Qantas', 'Lufthansa', 'Air France'],
  },
  {
    value: 'Clothing',
    label: 'Clothing & Fashion Brands',
    companies: ['Nike', 'Adidas', 'H&M', 'Zara', 'Uniqlo', 'Gucci', 'Louis Vuitton', 'Forever 21', 'ASOS', 'Shein'],
  },
  {
    value: 'Retail',
    label: 'Retail Stores & Online Shops',
    companies: ['Amazon', 'Walmart', 'Target', 'Best Buy', 'Costco', 'Home Depot', 'eBay', 'AliExpress', 'Macy\'s', 'Nordstrom'],
  },
  {
    value: 'Vouchers',
    label: 'Vouchers & Gift Cards',
    companies: ['Amazon Gift Card', 'Apple Gift Card', 'Google Play', 'Starbucks', 'Target Gift Card', 'Walmart Gift Card', 'Visa Gift Card', 'Mastercard Gift Card'],
  },
  {
    value: 'Travel',
    label: 'Travel, Hotels & Bookings',
    companies: ['Booking.com', 'Expedia', 'Airbnb', 'Marriott', 'Hilton', 'Hyatt', 'TripAdvisor', 'Kayak', 'Skyscanner'],
  },
  {
    value: 'Electronics',
    label: 'Electronics & Appliances',
    companies: ['Apple', 'Samsung', 'Sony', 'LG', 'Bose', 'Dyson', 'Xbox', 'PlayStation', 'Fitbit', 'Garmin'],
  },
  {
    value: 'Delivery',
    label: 'Delivery & Courier Services',
    companies: ['FedEx', 'UPS', 'DHL', 'USPS', 'Amazon Logistics', 'Royal Mail', 'TNT', 'Aramex'],
  },
  {
    value: 'Utilities',
    label: 'Utilities & Subscriptions',
    companies: ['British Gas', 'E.ON', 'EDF', 'Scottish Power', 'Virgin Media', 'Sky', 'Netflix', 'Spotify', 'Amazon Prime'],
  },
];

// Common countries for dropdown
export const countries: Country[] = [
  { value: 'GB', label: 'United Kingdom (+44)' },
  { value: 'US', label: 'United States (+1)' },
  { value: 'CA', label: 'Canada (+1)' },
  { value: 'AU', label: 'Australia (+61)' },
  { value: 'DE', label: 'Germany (+49)' },
  { value: 'FR', label: 'France (+33)' },
  { value: 'ES', label: 'Spain (+34)' },
  { value: 'IT', label: 'Italy (+39)' },
  { value: 'NL', label: 'Netherlands (+31)' },
  { value: 'SE', label: 'Sweden (+46)' },
  { value: 'NO', label: 'Norway (+47)' },
  { value: 'DK', label: 'Denmark (+45)' },
  { value: 'FI', label: 'Finland (+358)' },
  { value: 'PL', label: 'Poland (+48)' },
  { value: 'CH', label: 'Switzerland (+41)' },
  { value: 'BE', label: 'Belgium (+32)' },
  { value: 'AT', label: 'Austria (+43)' },
  { value: 'IE', label: 'Ireland (+353)' },
  { value: 'PT', label: 'Portugal (+351)' },
  { value: 'GR', label: 'Greece (+30)' },
  { value: 'TR', label: 'Turkey (+90)' },
  { value: 'RU', label: 'Russia (+7)' },
  { value: 'IN', label: 'India (+91)' },
  { value: 'CN', label: 'China (+86)' },
  { value: 'JP', label: 'Japan (+81)' },
  { value: 'KR', label: 'South Korea (+82)' },
  { value: 'BR', label: 'Brazil (+55)' },
  { value: 'MX', label: 'Mexico (+52)' },
  { value: 'AR', label: 'Argentina (+54)' },
  { value: 'ZA', label: 'South Africa (+27)' },
];

// Outcome sought options
export const outcomes: Outcome[] = [
  { value: 'Refund', label: 'Refund' },
  { value: 'Replacement', label: 'Replacement' },
  { value: 'Compensation', label: 'Compensation' },
  { value: 'Apology', label: 'Apology' },
  { value: 'Fix the Issue', label: 'Fix the Issue' },
  { value: 'Escalation to Management', label: 'Escalation to Management' },
  { value: 'Other', label: 'Other' },
];

// Contact method options
export const contactMethods: ContactMethod[] = [
  { value: 'Email', label: 'Email' },
  { value: 'Phone', label: 'Phone' },
  { value: 'WhatsApp', label: 'WhatsApp' },
  { value: 'Either', label: 'Either' },
];

// Contact status options
export const contactStatuses: ContactStatus[] = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
  { value: 'Not sure', label: 'Not sure' },
];