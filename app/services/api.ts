import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Types
export interface Country {
  id: string;
  name: string;
  isoCode: string;
  currency: string;
  continent: string;
  lastUpdated: string;
  status?: string;
}

export interface CountriesRequest {
  language: string;
  searchTerm: string;
  status: string;
  page: number;
  pageSize: number;
  sortBy: string;
  sortDirection: string;
}

export interface CountriesResponse {
  data: Country[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateCountryRequest {
  countryName: string;
  isoCode2: string;
  isoCode3: string;
  nationality: string;
  continent: string;
  currencyCode: string;
  dialingCode: string;
  timeZone: string;
}

export interface UpdateCountryRequest extends CreateCountryRequest {
  id: string;
}

export interface CountryDetailResponse {
  context: {
    statusCode: number;
    message: string;
    trackingId: string;
    transactionId: string;
  };
  response: {
    id: string;
    countryName: string;
    isoCode2: string;
    isoCode3: string;
    nationality: string;
    continent: string;
    currencyCode: string;
    currencyName: string;
    dialingCode: string;
    timeZone: string;
    lastUpdated: string;
    flag: string;
    destinationGroups: string[];
  };
}

export interface CreateCountryResponse extends CountryDetailResponse {}

export interface CountryAsset {
  fileName: string;
  isDefault: boolean;
}

export interface UploadCountryAssetsRequest {
  entityId: string;
  isoCode2: string;
  bannerImage: File;
  cardThumbnail: File;
}

export interface UploadCountryAssetsResponse {
  context: {
    statusCode: number;
    message: string;
    trackingId: string;
    transactionId: string;
  };
  response: {
    id: string;
    entityId: string;
    isoCode2: string;
    flag: string;
    status: string;
    banners: CountryAsset[];
    thumbnails: CountryAsset[];
    videos: CountryAsset[];
  };
}

export interface AgeRule {
  min: number;
  max: number;
  status: "ACTIVE" | "INACTIVE";
}

export interface CountryAgeRule {
  id: string;
  isoCode2: string;
  unit: "YEARS";
  ageRules: Record<string, AgeRule>;
  status: "ACTIVE" | "INACTIVE";
  schemaVersion: string;
}

export interface GetCountryAgeRulesRequest {
  isoCode2: string;
}

export interface GetCountryAgeRulesResponse {
  context: {
    statusCode: number;
    message: string;
    trackingId: string;
    transactionId: string;
  };
  response: CountryAgeRule;
}

export interface SaveCountryAgeRulesRequest {
  isoCode2: string;
  ageRules: Record<string, AgeRule>;
}

export interface SaveCountryAgeRulesResponse {
  context: {
    statusCode: number;
    message: string;
    trackingId: string;
    transactionId: string;
  };
  response: CountryAgeRule;
}

export interface TaxEntry {
  taxPercentage: number;
  appliesOn: string[];
  status: "ACTIVE" | "INACTIVE";
}

export interface CountryTax {
  id: string;
  isoCode2: string;
  currencyCode: string;
  taxes: Record<string, TaxEntry>;
  schemaVersion: string;
}

export interface GetCountryTaxResponse {
  context: {
    statusCode: number;
    message: string;
    trackingId: string;
    transactionId: string;
  };
  response: CountryTax;
}

export interface CreateCountryTaxRequest {
  isoCode2: string;
  currencyCode: string;
  taxes: Record<string, TaxEntry>;
}

export interface UpdateCountryTaxRequest {
  currencyCode: string;
  taxes: Record<string, TaxEntry>;
}

export interface SaveCountryTaxResponse {
  context: {
    statusCode: number;
    message: string;
    trackingId: string;
    transactionId: string;
  };
  response: CountryTax;
}

/**
 * Get API base URL from environment variable with fallback
 * 
 * Usage:
 * - Set VITE_API_BASE_URL in your .env file (e.g., "http://localhost:3000" or "https://api.example.com")
 * - If VITE_API_BASE_URL includes "/api/v1", it will be used as-is
 * - If VITE_API_BASE_URL is set but doesn't include "/api/v1", "/api/v1" will be appended
 * - If VITE_API_BASE_URL is not set, it defaults to relative path "/api/v1"
 * 
 * Examples:
 * - VITE_API_BASE_URL=http://localhost:3000 → http://localhost:3000/api/v1
 * - VITE_API_BASE_URL=https://api.example.com/api/v1 → https://api.example.com/api/v1
 * - VITE_API_BASE_URL not set → /api/v1
 */
const getApiBaseUrl = (): string => {
  const envBaseUrl = import.meta.env.VITE_API_BASE_URL;
  
  if (!envBaseUrl) {
    // Fallback to relative path if env variable is not set
    const baseUrl = "/api/v1";
    console.log("API Base URL (fallback):", baseUrl);
    return baseUrl;
  }
  
  // Remove trailing slash if present
  let baseUrl = envBaseUrl.trim();
  if (baseUrl.endsWith("/")) {
    baseUrl = baseUrl.slice(0, -1);
  }
  
  // If /api/v1 is already included, use as-is
  if (baseUrl.includes("/api/v1")) {
    console.log("API Base URL (with /api/v1):", baseUrl);
    return baseUrl;
  }
  
  // Otherwise, append /api/v1
  const finalUrl = `${baseUrl}/api/v1`;
  console.log("API Base URL (appended /api/v1):", finalUrl);
  return finalUrl;
};

// Calculate base URL once at module load
const API_BASE_URL = getApiBaseUrl();

// Custom baseQuery with better error handling
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

// Wrapped baseQuery with error handling
const baseQueryWithErrorHandling = async (args: any, api: any, extraOptions: any) => {
  // For FormData, remove Content-Type header to let browser set it with boundary
  if (args.body instanceof FormData && args.prepareHeaders) {
    const originalPrepareHeaders = args.prepareHeaders;
    args.prepareHeaders = (headers: Headers) => {
      headers.delete("Content-Type");
      return originalPrepareHeaders ? originalPrepareHeaders(headers) : headers;
    };
  }
  
  const result = await baseQuery(args, api, extraOptions);
  
  if (result.error) {
    console.error("RTK Query Error:", {
      status: result.error.status,
      data: result.error.data,
      error: result.error,
      originalArgs: args,
    });
  }
  
  return result;
};

// Base API configuration
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Countries"],
  endpoints: (builder) => ({
    getCountries: builder.query<CountriesResponse, CountriesRequest>({
      query: (params) => {
        const url = "/visa/countries";
        const fullUrl = `${API_BASE_URL}${url}`;
        console.log("RTK Query - Making request to:", fullUrl);
        console.log("RTK Query - Request params:", JSON.stringify(params, null, 2));
        
        return {
          url,
          method: "POST",
          body: params,
        };
      },
      providesTags: ["Countries"],
    }),
    createCountry: builder.mutation<CreateCountryResponse, CreateCountryRequest>({
      query: (params) => {
        const url = "/visa/countries";
        const fullUrl = `${API_BASE_URL}${url}`;
        console.log("RTK Query - Creating country:", fullUrl);
        console.log("RTK Query - Request body:", JSON.stringify(params, null, 2));
        
        return {
          url,
          method: "POST",
          body: params,
        };
      },
      invalidatesTags: ["Countries"],
    }),
    getCountryById: builder.query<CountryDetailResponse, string>({
      query: (id) => {
        const url = `/visa/countries/${id}`;
        console.log("RTK Query - Fetching country:", `${API_BASE_URL}${url}`);
        return {
          url,
          method: "GET",
        };
      },
      providesTags: (result, error, id) => [{ type: "Countries", id }],
    }),
    updateCountry: builder.mutation<CountryDetailResponse, UpdateCountryRequest>({
      query: (params) => {
        const { id, ...body } = params;
        const url = `/visa/countries/${id}`;
        const fullUrl = `${API_BASE_URL}${url}`;
        console.log("RTK Query - Updating country:", fullUrl);
        console.log("RTK Query - Request body:", JSON.stringify(body, null, 2));
        
        return {
          url,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Countries", id },
        "Countries",
      ],
    }),
    uploadCountryAssets: builder.mutation<
      UploadCountryAssetsResponse,
      UploadCountryAssetsRequest
    >({
      query: (params) => {
        const { entityId, isoCode2, bannerImage, cardThumbnail } = params;
        const url = `/visa/countries/${entityId}/assets`;
        const fullUrl = `${API_BASE_URL}${url}`;
        console.log("RTK Query - Uploading country assets:", fullUrl);

        const formData = new FormData();
        formData.append("isoCode2", isoCode2);
        formData.append("bannerImage", bannerImage);
        formData.append("cardThumbnail", cardThumbnail);

        return {
          url,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Countries"],
    }),
    getCountryAgeRules: builder.query<GetCountryAgeRulesResponse, string>({
      query: (isoCode2) => {
        const url = `/visa/country-age-rules?isoCode2=${isoCode2}`;
        console.log("RTK Query - Fetching country age rules:", `${API_BASE_URL}${url}`);
        return {
          url,
          method: "GET",
        };
      },
      providesTags: (result, error, isoCode2) => [
        { type: "Countries", id: `age-rules-${isoCode2}` },
      ],
    }),
    saveCountryAgeRules: builder.mutation<
      SaveCountryAgeRulesResponse,
      SaveCountryAgeRulesRequest
    >({
      query: (params) => {
        const url = `/visa/country-age-rules`;
        const fullUrl = `${API_BASE_URL}${url}`;
        console.log("RTK Query - Saving country age rules:", fullUrl);
        console.log("RTK Query - Request body:", JSON.stringify(params, null, 2));

        return {
          url,
          method: "POST",
          body: {
            context: {
              trackingId: "",
              transactionId: "",
              userAgent: navigator.userAgent,
              ipAddress: "",
            },
            request: params,
          },
        };
      },
      invalidatesTags: (result, error, { isoCode2 }) => [
        { type: "Countries", id: `age-rules-${isoCode2}` },
        "Countries",
      ],
    }),
    getCountryTax: builder.query<GetCountryTaxResponse, string>({
      query: (isoCode2) => {
        const url = `/visa/country-tax/country/${isoCode2}`;
        console.log("RTK Query - Fetching country tax:", `${API_BASE_URL}${url}`);
        return {
          url,
          method: "GET",
        };
      },
      providesTags: (result, error, isoCode2) => [
        { type: "Countries", id: `tax-${isoCode2}` },
      ],
    }),
    createCountryTax: builder.mutation<
      SaveCountryTaxResponse,
      CreateCountryTaxRequest
    >({
      query: (params) => {
        const url = `/visa/country-tax`;
        const fullUrl = `${API_BASE_URL}${url}`;
        console.log("RTK Query - Creating country tax:", fullUrl);
        console.log("RTK Query - Request body:", JSON.stringify(params, null, 2));

        return {
          url,
          method: "POST",
          body: {
            context: {
              trackingId: "",
              transactionId: "",
            },
            request: params,
          },
        };
      },
      invalidatesTags: (result, error, { isoCode2 }) => [
        { type: "Countries", id: `tax-${isoCode2}` },
        "Countries",
      ],
    }),
    updateCountryTax: builder.mutation<
      SaveCountryTaxResponse,
      { id: string; data: UpdateCountryTaxRequest }
    >({
      query: ({ id, data }) => {
        const url = `/visa/country-tax/${id}`;
        const fullUrl = `${API_BASE_URL}${url}`;
        console.log("RTK Query - Updating country tax:", fullUrl);
        console.log("RTK Query - Request body:", JSON.stringify(data, null, 2));

        return {
          url,
          method: "PUT",
          body: {
            context: {
              trackingId: "",
              transactionId: "",
            },
            request: data,
          },
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Countries", id: `tax-${id}` },
        "Countries",
      ],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetCountriesQuery,
  useGetCountryByIdQuery,
  useCreateCountryMutation,
  useUpdateCountryMutation,
  useUploadCountryAssetsMutation,
  useGetCountryAgeRulesQuery,
  useSaveCountryAgeRulesMutation,
  useGetCountryTaxQuery,
  useCreateCountryTaxMutation,
  useUpdateCountryTaxMutation,
} = api;

