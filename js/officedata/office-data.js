/* ==========================================================================
   OFFICE DATA
   Single source of truth for every office rendered on the globe, in the
   country button list, and in any popup. Nothing about office info is
   ever hardcoded in HTML — everything is generated from this array.

   type: "head" | "branch"
   lat/lng: decimal degrees, used to compute the 3D marker position on
            the globe (see globe.js -> latLngToVector3)
   ========================================================================== */

export const OFFICES = [
  {
    id: "india-head",
    type: "head",
    country: "India",
    countryCode: "IN",
    city: "New Delhi",
    name: "India Head Office",
    address:
      "A-166, F/F KR Bose Marg, Pratap Nagar, Mayur Vihar Phase - 1, New Delhi - 110091",
    phone: "+91 11 4567 8900",
    email: "info@alephindia.in",
    lat: 28.6139,
    lng: 77.209,
  },
  {
    id: "india-corporate",
    type: "branch",
    country: "India",
    countryCode: "IN",
    city: "Noida",
    name: "Corporate Office",
    address: "2A, NCPL Web Tower, Sector 9, Noida 201301 (Delhi NCR)",
    phone: "+91 99901 36656",
    email: "inbox@alephindia.in",
    lat: 28.5355,
    lng: 77.391,
  },
  {
    id: "india-mumbai",
    type: "branch",
    country: "India",
    countryCode: "IN",
    city: "Mumbai",
    name: "Mumbai Branch",
    address: "SEEPZ, Andheri (E), Mumbai",
    phone: "+91 99901 36656",
    email: "inbox@alephindia.in",
    lat: 19.076,
    lng: 72.8777,
  },
  {
    id: "india-punjab",
    type: "branch",
    country: "India",
    countryCode: "IN",
    city: "Punjab (Ludhiana)",
    name: "Punjab Branch",
    address: "Model Gram, Ludhiana, Punjab",
    phone: "+91 99901 36656",
    email: "inbox@alephindia.in",
    lat: 30.901,
    lng: 75.8573,
  },
  {
    id: "india-kolkata",
    type: "branch",
    country: "India",
    countryCode: "IN",
    city: "Kolkata",
    name: "Kolkata Branch",
    address: "S.P. Mukherjee Road, Kolkata",
    phone: "+91 98185 71192",
    email: "inbox@alephindia.in",
    lat: 22.5726,
    lng: 88.3639,
  },
  {
    id: "india-hyderabad",
    type: "branch",
    country: "India",
    countryCode: "IN",
    city: "Hyderabad",
    name: "Hyderabad Branch",
    address: "Telangana",
    phone: "+91 98185 71192",
    email: "inbox@alephindia.in",
    lat: 17.385,
    lng: 78.4867,
  },
  {
    id: "india-bangalore",
    type: "branch",
    country: "India",
    countryCode: "IN",
    city: "Bangalore",
    name: "Bangalore Branch",
    address: "Karnataka",
    phone: "+91 99901 36656",
    email: "inbox@alephindia.in",
    lat: 12.9716,
    lng: 77.5946,
  },
  {
    id: "india-kochi",
    type: "branch",
    country: "India",
    countryCode: "IN",
    city: "Kochi",
    name: "Kochi Branch",
    address: "Kerala",
    phone: "+91 99901 36656",
    email: "inbox@alephindia.in",
    lat: 9.9312,
    lng: 76.2673,
  },
  {
    id: "taiwan",
    type: "branch",
    country: "Taiwan",
    countryCode: "TW",
    city: "Taipei City",
    name: "Taiwan Office",
    address: "Taipei City, Taiwan",
    phone: "+91 8826230531",
    email: "info@alephindia.in",
    lat: 25.033,
    lng: 121.5654,
  },
  {
    id: "russia",
    type: "branch",
    country: "Russia",
    countryCode: "RU",
    city: "Moscow",
    name: "Russia Office",
    address: "Moscow, Polesskiy dr., 16",
    phone: "+91 8826230531",
    email: "nataly.luzina@rbiconcept.ru",
    lat: 55.7558,
    lng: 37.6173,
  },
  {
    id: "china",
    type: "branch",
    country: "China",
    countryCode: "CN",
    city: "Guangzhou",
    name: "China Office",
    address: "Guangzhou, China",
    phone: "+86 135 6012 3340",
    email: "certification@topmark.com.cn",
    lat: 23.1291,
    lng: 113.2644,
  },
  {
    id: "south-korea",
    type: "branch",
    country: "S. Korea",
    countryCode: "KR",
    city: "Seoul",
    name: "South Korea Office",
    address: "Seoul, South Korea",
    phone: "+82 10-9758-6745",
    email: "manager@alephkorea.com",
    lat: 37.5665,
    lng: 126.978,
  },
  {
    id: "vietnam",
    type: "branch",
    country: "Vietnam",
    countryCode: "VN",
    city: "Ho Chi Minh",
    name: "Vietnam Office",
    address: "Ho Chi Minh, Vietnam",
    phone: "+84 944971996",
    email: "kevin@aatc-compliance.vn",
    lat: 10.8231,
    lng: 106.6297,
  },
  {
    id: "japan",
    type: "branch",
    country: "Japan",
    countryCode: "JP",
    city: "Tokyo",
    name: "Japan Office",
    address: "Japan",
    phone: "+82 10-9758-6745",
    email: "info@alephindia.in",
    lat: 35.6762,
    lng: 139.6503,
  },
  {
    id: "new-zealand",
    type: "branch",
    country: "New Zealand",
    countryCode: "NZ",
    city: "Wellington",
    name: "New Zealand Office",
    address: "3 Bould Street Johnsonville, 6037 Wellington",
    phone: "+64 221886224",
    email: "info@alephindia.in",
    lat: -41.2865,
    lng: 174.7762,
  },
];

/* -----------------------------------------------------------------
   Quick lookups used by globe.js / popup.js / main.js so nothing has
   to re-scan the array by hand.
----------------------------------------------------------------- */
export const HEAD_OFFICE = OFFICES.find((o) => o.type === "head");

export function getOfficeById(id) {
  return OFFICES.find((o) => o.id === id) || null;
}

/* Distinct list of countries for the country-button row, in the same
   order they first appear in OFFICES (India first, then each overseas
   country once). */
export function getCountryList() {
  const seen = new Set();
  const list = [];
  OFFICES.forEach((o) => {
    if (!seen.has(o.country)) {
      seen.add(o.country);
      list.push({ country: o.country, countryCode: o.countryCode });
    }
  });
  return list;
}

export function getOfficesByCountry(country) {
  return OFFICES.filter((o) => o.country === country);
}
