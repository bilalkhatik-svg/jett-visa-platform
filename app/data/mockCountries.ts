import type { Country, CountriesResponse } from "../services/api";

// Mock country data matching the API response structure
export const mockCountries: Country[] = [
  {
    id: "1",
    name: "United States",
    isoCode: "US",
    currency: "USD",
    continent: "North America",
    lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    status: "Active",
  },
  {
    id: "2",
    name: "United Kingdom",
    isoCode: "GB",
    currency: "GBP",
    continent: "Europe",
    lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    status: "Active",
  },
  {
    id: "3",
    name: "Canada",
    isoCode: "CA",
    currency: "CAD",
    continent: "North America",
    lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    status: "Active",
  },
  {
    id: "4",
    name: "Australia",
    isoCode: "AU",
    currency: "AUD",
    continent: "Oceania",
    lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    status: "Active",
  },
  {
    id: "5",
    name: "Germany",
    isoCode: "DE",
    currency: "EUR",
    continent: "Europe",
    lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    status: "Active",
  },
  {
    id: "6",
    name: "France",
    isoCode: "FR",
    currency: "EUR",
    continent: "Europe",
    lastUpdated: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    status: "Active",
  },
  {
    id: "7",
    name: "Japan",
    isoCode: "JP",
    currency: "JPY",
    continent: "Asia",
    lastUpdated: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    status: "Active",
  },
  {
    id: "8",
    name: "China",
    isoCode: "CN",
    currency: "CNY",
    continent: "Asia",
    lastUpdated: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    status: "Active",
  },
  {
    id: "9",
    name: "India",
    isoCode: "IN",
    currency: "INR",
    continent: "Asia",
    lastUpdated: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
    status: "Active",
  },
  {
    id: "10",
    name: "Brazil",
    isoCode: "BR",
    currency: "BRL",
    continent: "South America",
    lastUpdated: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
    status: "Active",
  },
];

// Generate additional mock countries to reach 247 total (matching screenshot)
const generateAdditionalCountries = (): Country[] => {
  const additionalCountries: Country[] = [];
  const continents = ["Asia", "Europe", "Africa", "North America", "South America", "Oceania", "Antarctica"];
  const currencies = ["USD", "EUR", "GBP", "JPY", "CNY", "INR", "AUD", "CAD", "BRL", "MXN", "RUB", "ZAR"];
  
  const countryNames = [
    "Mexico", "Spain", "Italy", "Netherlands", "Belgium", "Switzerland", "Austria", "Sweden", "Norway", "Denmark",
    "Finland", "Poland", "Portugal", "Greece", "Turkey", "Russia", "South Korea", "Singapore", "Thailand", "Malaysia",
    "Indonesia", "Philippines", "Vietnam", "New Zealand", "South Africa", "Egypt", "Nigeria", "Kenya", "Morocco", "Argentina",
    "Chile", "Colombia", "Peru", "Venezuela", "Ecuador", "Uruguay", "Paraguay", "Bolivia", "Costa Rica", "Panama",
    "Guatemala", "Honduras", "El Salvador", "Nicaragua", "Jamaica", "Trinidad and Tobago", "Bahamas", "Barbados", "Belize", "Guyana",
    "Suriname", "French Guiana", "Iceland", "Ireland", "Luxembourg", "Monaco", "Liechtenstein", "Malta", "Cyprus", "Estonia",
    "Latvia", "Lithuania", "Slovenia", "Slovakia", "Czech Republic", "Hungary", "Romania", "Bulgaria", "Croatia", "Serbia",
    "Bosnia and Herzegovina", "Macedonia", "Albania", "Montenegro", "Kosovo", "Moldova", "Ukraine", "Belarus", "Georgia", "Armenia",
    "Azerbaijan", "Kazakhstan", "Uzbekistan", "Turkmenistan", "Kyrgyzstan", "Tajikistan", "Afghanistan", "Pakistan", "Bangladesh", "Sri Lanka",
    "Nepal", "Bhutan", "Myanmar", "Cambodia", "Laos", "Mongolia", "North Korea", "Taiwan", "Hong Kong", "Macau",
    "Brunei", "East Timor", "Papua New Guinea", "Fiji", "Samoa", "Tonga", "Vanuatu", "Solomon Islands", "Palau", "Micronesia",
    "Marshall Islands", "Nauru", "Kiribati", "Tuvalu", "Seychelles", "Mauritius", "Madagascar", "Comoros", "Maldives", "Mauritania",
    "Senegal", "Gambia", "Guinea-Bissau", "Guinea", "Sierra Leone", "Liberia", "Ivory Coast", "Ghana", "Togo", "Benin",
    "Burkina Faso", "Niger", "Mali", "Algeria", "Tunisia", "Libya", "Sudan", "Ethiopia", "Eritrea", "Djibouti",
    "Somalia", "Uganda", "Tanzania", "Rwanda", "Burundi", "Malawi", "Zambia", "Zimbabwe", "Botswana", "Namibia",
    "Lesotho", "Swaziland", "Mozambique", "Angola", "Democratic Republic of Congo", "Republic of Congo", "Central African Republic", "Chad", "Cameroon", "Equatorial Guinea",
    "Gabon", "São Tomé and Príncipe", "Cape Verde", "Guinea", "Sierra Leone", "Liberia", "Ivory Coast", "Ghana", "Togo", "Benin",
    "Burkina Faso", "Niger", "Mali", "Algeria", "Tunisia", "Libya", "Sudan", "Ethiopia", "Eritrea", "Djibouti",
    "Somalia", "Uganda", "Tanzania", "Rwanda", "Burundi", "Malawi", "Zambia", "Zimbabwe", "Botswana", "Namibia",
    "Lesotho", "Swaziland", "Mozambique", "Angola", "Democratic Republic of Congo", "Republic of Congo", "Central African Republic", "Chad", "Cameroon", "Equatorial Guinea",
    "Gabon", "São Tomé and Príncipe", "Cape Verde", "Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait", "Bahrain", "Oman", "Yemen",
    "Iraq", "Iran", "Israel", "Palestine", "Jordan", "Lebanon", "Syria", "Cyprus", "Greece", "Turkey",
    "Bulgaria", "Romania", "Moldova", "Ukraine", "Belarus", "Lithuania", "Latvia", "Estonia", "Finland", "Sweden",
    "Norway", "Denmark", "Iceland", "Ireland", "United Kingdom", "France", "Belgium", "Netherlands", "Luxembourg", "Switzerland",
    "Austria", "Germany", "Poland", "Czech Republic", "Slovakia", "Hungary", "Slovenia", "Croatia", "Bosnia and Herzegovina", "Serbia",
    "Montenegro", "Albania", "Macedonia", "Kosovo", "Greece", "Bulgaria", "Romania", "Moldova", "Ukraine", "Belarus",
    "Russia", "Kazakhstan", "Uzbekistan", "Turkmenistan", "Kyrgyzstan", "Tajikistan", "Afghanistan", "Pakistan", "India", "Nepal",
    "Bhutan", "Bangladesh", "Myanmar", "Thailand", "Laos", "Cambodia", "Vietnam", "Malaysia", "Singapore", "Brunei",
    "Indonesia", "Philippines", "East Timor", "Papua New Guinea", "Australia", "New Zealand", "Fiji", "Samoa", "Tonga", "Vanuatu",
    "Solomon Islands", "Palau", "Micronesia", "Marshall Islands", "Nauru", "Kiribati", "Tuvalu"
  ];

  let idCounter = 11;
  for (let i = 0; i < countryNames.length && additionalCountries.length < 237; i++) {
    const name = countryNames[i];
    // Generate ISO code from country name (simplified)
    const isoCode = name.substring(0, 2).toUpperCase();
    const continent = continents[i % continents.length];
    const currency = currencies[i % currencies.length];
    
    additionalCountries.push({
      id: String(idCounter++),
      name,
      isoCode,
      currency,
      continent,
      lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      status: "Active",
    });
  }

  return additionalCountries;
};

// Combine initial 10 countries with generated ones to reach ~247 total
export const allMockCountries: Country[] = [
  ...mockCountries,
  ...generateAdditionalCountries(),
];

// Generate mock response with pagination support
export const getMockCountriesResponse = (
  searchTerm: string = "",
  page: number = 1,
  pageSize: number = 10
): CountriesResponse => {
  // Filter by search term if provided
  let filtered = allMockCountries;
  if (searchTerm.trim()) {
    const searchLower = searchTerm.toLowerCase();
    filtered = allMockCountries.filter(
      (country) =>
        country.name.toLowerCase().includes(searchLower) ||
        country.isoCode.toLowerCase().includes(searchLower)
    );
  }

  // Calculate pagination
  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filtered.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    totalCount,
    page,
    pageSize,
    totalPages,
  };
};

