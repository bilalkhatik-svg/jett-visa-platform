import type { VisaPurpose } from "../../features/types/VisaPurpose";

// Extended interface for mock store to include synonyms and category
interface VisaPurposeWithExtras extends VisaPurpose {
  synonyms?: string;
  category?: string;
}

let visaPurposeDB: VisaPurposeWithExtras[] = [
  {
    code: "BUSNS",
    name: "Business Visa",
    description: "For business meetings.",
    status: "ACTIVE",
    synonyms: "Business Travel, Corporate Visit, Meeting",
    category: "Professional",
  },
  {
    code: "TOURS",
    name: "Tourist Visa",
    description: "For tourism.",
    status: "ACTIVE",
    synonyms: "Tourism, Leisure, Vacation, Sightseeing",
    category: "Travel",
  },
];

export const visaPurposeStore = {
  list: () => visaPurposeDB,

  add: (payload: VisaPurposeWithExtras) => {
    visaPurposeDB = [...visaPurposeDB, payload];
    return payload;
  },

  update: (payload: VisaPurposeWithExtras) => {
    visaPurposeDB = visaPurposeDB.map((item) =>
      item.code === payload.code ? payload : item
    );
    return payload;
  },

  remove: (code: string) => {
    visaPurposeDB = visaPurposeDB.filter(
      (item) => item.code !== code
    );
    return code;
  },
};
