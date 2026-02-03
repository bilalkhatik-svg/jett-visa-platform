export type VisaStatus = "ACTIVE" | "INACTIVE";

export interface VisaPurpose {
  code: string;
  name: string;
  description: string;
  status: VisaStatus;
}
