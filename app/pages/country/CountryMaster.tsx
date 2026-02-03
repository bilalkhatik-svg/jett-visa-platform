import { useState, useEffect } from "react";
import type { Route } from "./+types/CountryMaster";


// Types
interface Country {
  id: string;
  name: string;
  isoCode: string;
  currency: string;
  continent: string;
  lastUpdated: string;
  status?: string;
}

interface CountriesResponse {
  data: Country[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface ApiRequest {
  language: string;
  searchTerm: string;
  status: string;
  page: number;
  pageSize: number;
  sortBy: string;
  sortDirection: string;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Country Master - Visa Admin" },
    { name: "description", content: "Manage country and continent data for visa processing" },
  ];
}

export default function CountryMaster() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-slate-400 text-3xl">
                public
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Country Master</h2>
            <p className="text-slate-500 mb-6">
              Country master functionality coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

