export interface Industry {
  id: string;
  name: string;
  icon: string;
  description: string;
  companies: string[];
}

export const industries: Industry[] = [
  {
    id: "airlines",
    name: "Airlines & Flight Issues",
    icon: "plane",
    description: "Flight delays, cancellations, lost luggage, and booking problems",
    companies: [
      "British Airways",
      "easyJet",
      "Ryanair",
      "Virgin Atlantic",
      "Emirates",
      "KLM Royal Dutch Airlines",
      "Jet2",
      "TUI Airways",
      "Wizz Air",
      "Norwegian Air",
    ],
  },
  {
    id: "clothing",
    name: "Clothing & Fashion Brands",
    icon: "shirt",
    description: "Faulty items, sizing issues, returns, and quality concerns",
    companies: [
      "Zara",
      "H&M",
      "ASOS",
      "Nike",
      "Adidas",
      "Primark",
      "Next",
      "Marks & Spencer",
      "Uniqlo",
      "Burberry",
    ],
  },
  {
    id: "retail",
    name: "Retail Stores & Online Shops",
    icon: "shopping-bag",
    description: "Product quality, delivery failures, refunds, and customer service",
    companies: [
      "Tesco",
      "Sainsbury's",
      "Asda",
      "Morrisons",
      "Boots",
      "WHSmith",
      "Argos",
      "John Lewis",
      "IKEA",
      "B&Q",
    ],
  },
  {
    id: "vouchers",
    name: "Vouchers & Gift Cards",
    icon: "gift",
    description: "Expired vouchers, invalid codes, balance issues, and redemption problems",
    companies: [
      "Love2shop",
      "Giftly",
      "Virgin Experience Days",
      "Tinggly",
      "Amazon Gift Card",
      "One4all",
      "H&B Gift Cards",
      "Ticketmaster Gift Card",
      "M&S Gift Card",
      "John Lewis Gift Card",
    ],
  },
  {
    id: "travel",
    name: "Travel, Hotels & Bookings",
    icon: "hotel",
    description: "Accommodation issues, overbookings, misleading listings, and cancellation disputes",
    companies: [
      "Booking.com",
      "Expedia",
      "Airbnb",
      "TUI",
      "Jet2holidays",
      "Hilton",
      "Marriott",
      "Premier Inn",
      "Travelodge",
      "Holiday Inn",
    ],
  },
  {
    id: "electronics",
    name: "Electronics & Appliances",
    icon: "laptop",
    description: "Defective products, warranty claims, and technical faults",
    companies: [
      "Apple",
      "Samsung",
      "Sony",
      "Dyson",
      "Currys",
      "AO.com",
      "LG",
      "Bosch",
      "Philips",
      "Dell",
    ],
  },
  {
    id: "delivery",
    name: "Delivery & Courier Services",
    icon: "truck",
    description: "Lost parcels, late deliveries, damaged goods, and tracking issues",
    companies: [
      "Royal Mail",
      "DPD",
      "Evri",
      "UPS",
      "FedEx",
      "DHL",
      "Yodel",
      "Amazon Logistics",
      "Hermes",
      "Parcelforce",
    ],
  },
  {
    id: "utilities",
    name: "Utilities & Subscriptions",
    icon: "zap",
    description: "Billing errors, unexpected charges, cancellation difficulties, and service outages",
    companies: [
      "British Gas",
      "EDF Energy",
      "Octopus Energy",
      "Thames Water",
      "Virgin Media",
      "BT",
      "Sky",
      "Netflix",
      "EE",
      "O2",
    ],
  },
];

export const countries = [
  "United Kingdom",
  "Ireland",
  "United States",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "Sweden",
  "Norway",
  "Denmark",
  "Poland",
  "South Africa",
  "India",
  "Japan",
  "Brazil",
  "Mexico",
  "New Zealand",
];

export const outcomeOptions = [
  "Refund",
  "Replacement",
  "Compensation",
  "Apology",
  "Fix the Issue",
  "Escalation to Management",
  "Other",
];

export const contactMethodOptions = ["Email", "Phone", "WhatsApp", "Either"];

export const contactedOptions = ["Yes", "No", "Not sure"];

export function getCompaniesForIndustry(industryId: string): string[] {
  const industry = industries.find((i) => i.id === industryId);
  return industry ? industry.companies : [];
}
