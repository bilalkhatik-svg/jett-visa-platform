import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import type { Route } from "./+types/vendor-create";
import {
  Button,
  Input,
  Select,
  Textarea,
  Radio,
  Tabs,
  Alert,
  LoadingSpinner,
} from "../design-system/ui";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Add New Vendor - Visa Admin" },
    { name: "description", content: "Register a new insurance vendor" },
  ];
}

// Form data interfaces
interface VendorInfoData {
  entity: string;
  vendorName: string;
  legalName: string;
  vendorCode: string;
  category: string;
  description: string;
  iataProvider: "Yes" | "No";
}

interface ContactData {
  contactPersonName: string;
  contactEmail: string;
}

interface TraveaDetailsData {
  // Address Information
  addressLine: string;
  street: string;
  country: string;
  city: string;
  state: string;
  zipcode: string;
  // Operational Details
  employee: string;
  staff: string;
  billingCycle: string;
  creditPeriod: string;
  // Accounting Details
  trnNumber: string;
  accountingCode: string;
  mainLedger: string;
  group: string;
}

// Mock data for dropdowns
const entityOptions = [
  { value: "musafir-ae", label: "Musafir AE" },
  { value: "musafir-in", label: "Musafir IN" },
  { value: "musafir-sa", label: "Musafir SA" },
];

const categoryOptions = [
  { value: "visa", label: "Visa" },
  { value: "insurance", label: "Insurance" },
];

const countryOptions = [
  { value: "ae", label: "United Arab Emirates" },
  { value: "in", label: "India" },
  { value: "sa", label: "Saudi Arabia" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
];

const cityOptions: Record<string, { value: string; label: string }[]> = {
  ae: [
    { value: "dubai", label: "Dubai" },
    { value: "abu-dhabi", label: "Abu Dhabi" },
    { value: "sharjah", label: "Sharjah" },
  ],
  in: [
    { value: "mumbai", label: "Mumbai" },
    { value: "delhi", label: "Delhi" },
    { value: "bangalore", label: "Bangalore" },
  ],
  sa: [
    { value: "riyadh", label: "Riyadh" },
    { value: "jeddah", label: "Jeddah" },
    { value: "dammam", label: "Dammam" },
  ],
};

// Vendor code generation logic
const generateVendorCode = (
  vendorName: string,
  entity: string,
  existingCodes: string[] = []
): string => {
  // Extract entity code (e.g., "musafir-ae" -> "AE")
  const entityCode = entity
    .split("-")
    .pop()
    ?.toUpperCase() || "AE";

  // Generate CODE from vendor name
  const words = vendorName.trim().split(/\s+/);
  const code = words
    .slice(0, 3) // Take first 3 words max
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  // Find next sequence number
  const prefix = `V-${entityCode}-${code}`;
  const matchingCodes = existingCodes.filter((c) => c.startsWith(prefix));
  const sequences = matchingCodes
    .map((c) => {
      const match = c.match(/-(\d{3})$/);
      return match ? parseInt(match[1], 10) : 0;
    })
    .sort((a, b) => b - a);

  const nextSeq = sequences.length > 0 ? sequences[0] + 1 : 1;
  const seqStr = String(nextSeq).padStart(3, "0");

  return `${prefix}-${seqStr}`;
};

export default function VendorCreate() {
  const navigate = useNavigate();
  const params = useParams();
  const vendorId = params.id;
  const isEditMode = !!vendorId;

  const [activeStep, setActiveStep] = useState<"vendor-info" | "contact" | "travea-details">(
    "vendor-info"
  );

  // Form data
  const [vendorInfo, setVendorInfo] = useState<VendorInfoData>({
    entity: "",
    vendorName: "",
    legalName: "",
    vendorCode: "",
    category: "",
    description: "",
    iataProvider: "No",
  });

  const [contact, setContact] = useState<ContactData>({
    contactPersonName: "",
    contactEmail: "",
  });

  const [traveaDetails, setTraveaDetails] = useState<TraveaDetailsData>({
    addressLine: "",
    street: "",
    country: "",
    city: "",
    state: "",
    zipcode: "",
    employee: "",
    staff: "",
    billingCycle: "",
    creditPeriod: "",
    trnNumber: "",
    accountingCode: "",
    mainLedger: "",
    group: "",
  });

  // Errors
  const [errors, setErrors] = useState<{
    vendorInfo: Partial<Record<keyof VendorInfoData, string>>;
    contact: Partial<Record<keyof ContactData, string>>;
    traveaDetails: Partial<Record<keyof TraveaDetailsData, string>>;
  }>({
    vendorInfo: {},
    contact: {},
    traveaDetails: {},
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Generate vendor code when vendor name or entity changes
  useEffect(() => {
    if (vendorInfo.vendorName && vendorInfo.entity && !isEditMode) {
      const generatedCode = generateVendorCode(
        vendorInfo.vendorName,
        vendorInfo.entity
      );
      setVendorInfo((prev) => ({ ...prev, vendorCode: generatedCode }));
    }
  }, [vendorInfo.vendorName, vendorInfo.entity, isEditMode]);

  // Filter cities based on selected country
  const availableCities = traveaDetails.country
    ? cityOptions[traveaDetails.country] || []
    : [];

  // Validation
  const validateVendorInfo = (): boolean => {
    const newErrors: Partial<Record<keyof VendorInfoData, string>> = {};

    if (!vendorInfo.entity) {
      newErrors.entity = "Entity is required";
    }
    if (!vendorInfo.vendorName.trim()) {
      newErrors.vendorName = "Vendor name is required";
    }
    if (!vendorInfo.category) {
      newErrors.category = "Category is required";
    }

    setErrors((prev) => ({ ...prev, vendorInfo: newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateContact = (): boolean => {
    const newErrors: Partial<Record<keyof ContactData, string>> = {};

    if (contact.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.contactEmail)) {
      newErrors.contactEmail = "Invalid email format";
    }

    setErrors((prev) => ({ ...prev, contact: newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateTraveaDetails = (): boolean => {
    const newErrors: Partial<Record<keyof TraveaDetailsData, string>> = {};

    if (traveaDetails.trnNumber && traveaDetails.trnNumber.length > 15) {
      newErrors.trnNumber = "TRN number must be 15 digits or less";
    }

    setErrors((prev) => ({ ...prev, traveaDetails: newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;

    if (activeStep === "vendor-info") {
      isValid = validateVendorInfo();
      if (isValid) setActiveStep("contact");
    } else if (activeStep === "contact") {
      isValid = validateContact();
      if (isValid) setActiveStep("travea-details");
    }

    if (!isValid) {
      setSaveError("Please fix the errors before proceeding");
    }
  };

  const handlePrevious = () => {
    if (activeStep === "contact") {
      setActiveStep("vendor-info");
    } else if (activeStep === "travea-details") {
      setActiveStep("contact");
    }
  };

  const handleSave = async () => {
    // Validate all steps
    const vendorInfoValid = validateVendorInfo();
    const contactValid = validateContact();
    const traveaDetailsValid = validateTraveaDetails();

    if (!vendorInfoValid || !contactValid || !traveaDetailsValid) {
      setSaveError("Please fix all errors before saving");
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      // TODO: Implement API call
      // await createVendor({ ...vendorInfo, ...contact, ...traveaDetails });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      navigate("/vendors");
    } catch (err: any) {
      setSaveError(err?.message || "Failed to save vendor. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    {
      id: "vendor-info",
      label: "Vendor Info",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      id: "contact",
      label: "Contact",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      id: "travea-details",
      label: "Travea Details",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-6 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {isEditMode ? "Edit Vendor" : "Add New Vendor"}
            </h1>
            <p className="text-body text-gray-600">
              Register a new insurance vendor. Products will be configured separately.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={() => navigate("/vendors")}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  <span>Saving...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Save Vendor
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <Tabs
            variant="icon"
            items={tabs.map((tab) => ({
              id: tab.id,
              label: tab.label,
              icon: tab.icon,
            }))}
            activeTab={activeStep}
            onTabChange={(tabId) => {
              // Allow free navigation between tabs
              setActiveStep(tabId as typeof activeStep);
              setSaveError(null);
            }}
          />
        </div>

        {/* Error Alert */}
        {saveError && (
          <div className="mb-6">
            <Alert variant="error" title="Error">
              {saveError}
            </Alert>
          </div>
        )}

        {/* Form Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {/* Vendor Info Step */}
          {activeStep === "vendor-info" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Basic Information
                </h2>
                <p className="text-sm text-gray-600">
                  Enter the core details about the vendor.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label={
                    <>
                      Entity<span className="text-red-500 ml-1">*</span>
                    </>
                  }
                  placeholder="Select entity"
                  options={entityOptions}
                  value={vendorInfo.entity}
                  onChange={(e) =>
                    setVendorInfo((prev) => ({ ...prev, entity: e.target.value }))
                  }
                  error={errors.vendorInfo.entity}
                  required
                />

                <Input
                  label={
                    <>
                      Vendor Name<span className="text-red-500 ml-1">*</span>
                    </>
                  }
                  placeholder="e.g. ABC Insurance Company"
                  value={vendorInfo.vendorName}
                  onChange={(e) =>
                    setVendorInfo((prev) => ({ ...prev, vendorName: e.target.value }))
                  }
                  error={errors.vendorInfo.vendorName}
                  required
                />

                <Input
                  label="Legal Name"
                  placeholder="e.g. ABC Insurance Company LLC"
                  value={vendorInfo.legalName}
                  onChange={(e) =>
                    setVendorInfo((prev) => ({ ...prev, legalName: e.target.value }))
                  }
                  helperText="Official registered business name"
                />

                <Input
                  label="Vendor Code"
                  value={vendorInfo.vendorCode}
                  disabled
                  helperText="Auto-generated based on vendor name"
                />

                <Select
                  label={
                    <>
                      Category<span className="text-red-500 ml-1">*</span>
                    </>
                  }
                  placeholder="Select a category"
                  options={categoryOptions}
                  value={vendorInfo.category}
                  onChange={(e) =>
                    setVendorInfo((prev) => ({ ...prev, category: e.target.value }))
                  }
                  error={errors.vendorInfo.category}
                  required
                />

                <div className="md:col-span-2">
                  <Textarea
                    label="Description"
                    placeholder="Brief description of the vendor and their services"
                    value={vendorInfo.description}
                    onChange={(e) =>
                      setVendorInfo((prev) => ({ ...prev, description: e.target.value }))
                    }
                    helperText="Optional description for internal reference"
                    rows={4}
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-900">
                      IATA Provider
                    </label>
                    <div className="flex items-center gap-6">
                      <Radio
                        label="Yes"
                        name="iataProvider"
                        value="Yes"
                        checked={vendorInfo.iataProvider === "Yes"}
                        onChange={() =>
                          setVendorInfo((prev) => ({
                            ...prev,
                            iataProvider: "Yes",
                          }))
                        }
                      />
                      <Radio
                        label="No"
                        name="iataProvider"
                        value="No"
                        checked={vendorInfo.iataProvider === "No"}
                        onChange={() =>
                          setVendorInfo((prev) => ({
                            ...prev,
                            iataProvider: "No",
                          }))
                        }
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      Indicates if this vendor is an IATA-certified provider
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Step */}
          {activeStep === "contact" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Contact Information
                </h2>
                <p className="text-sm text-gray-600">
                  Primary contact for this vendor.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Contact Person Name"
                  placeholder="e.g. John Doe"
                  value={contact.contactPersonName}
                  onChange={(e) =>
                    setContact((prev) => ({ ...prev, contactPersonName: e.target.value }))
                  }
                />

                <Input
                  label="Contact Email"
                  type="email"
                  placeholder="e.g. john.doe@abcinsurance.com"
                  value={contact.contactEmail}
                  onChange={(e) =>
                    setContact((prev) => ({ ...prev, contactEmail: e.target.value }))
                  }
                  error={errors.contact.contactEmail}
                />
              </div>
            </div>
          )}

          {/* Travea Details Step */}
          {activeStep === "travea-details" && (
            <div className="space-y-8">
              {/* Address Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Address Information
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  All address fields are optional.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Address Line"
                    placeholder="e.g. Office 401 Tower A"
                    value={traveaDetails.addressLine}
                    onChange={(e) =>
                      setTraveaDetails((prev) => ({
                        ...prev,
                        addressLine: e.target.value,
                      }))
                    }
                  />

                  <Input
                    label="Street"
                    placeholder="e.g. Sheikh Zayed Road"
                    value={traveaDetails.street}
                    onChange={(e) =>
                      setTraveaDetails((prev) => ({ ...prev, street: e.target.value }))
                    }
                  />

                  <Select
                    label="Country"
                    placeholder="Select country"
                    options={countryOptions}
                    value={traveaDetails.country}
                    onChange={(e) => {
                      setTraveaDetails((prev) => ({
                        ...prev,
                        country: e.target.value,
                        city: "", // Reset city when country changes
                      }));
                    }}
                  />

                  <Select
                    label="City"
                    placeholder="Select city"
                    options={availableCities}
                    value={traveaDetails.city}
                    onChange={(e) =>
                      setTraveaDetails((prev) => ({ ...prev, city: e.target.value }))
                    }
                    disabled={!traveaDetails.country}
                  />

                  <Input
                    label="State"
                    placeholder="e.g. Abu Dhabi"
                    value={traveaDetails.state}
                    onChange={(e) =>
                      setTraveaDetails((prev) => ({ ...prev, state: e.target.value }))
                    }
                  />

                  <Input
                    label="Zipcode"
                    placeholder="e.g. 00000"
                    value={traveaDetails.zipcode}
                    onChange={(e) =>
                      setTraveaDetails((prev) => ({ ...prev, zipcode: e.target.value }))
                    }
                  />
                </div>
              </div>

              {/* Operational Details */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Operational Details
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Staff assignments and billing configuration.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Employee"
                    placeholder="Select employee"
                    options={[]}
                    value={traveaDetails.employee}
                    onChange={(e) =>
                      setTraveaDetails((prev) => ({ ...prev, employee: e.target.value }))
                    }
                  />

                  <Select
                    label="Staff"
                    placeholder="Select staff"
                    options={[]}
                    value={traveaDetails.staff}
                    onChange={(e) =>
                      setTraveaDetails((prev) => ({ ...prev, staff: e.target.value }))
                    }
                  />

                  <Select
                    label="Billing Cycle"
                    placeholder="Select cycle"
                    options={[]}
                    value={traveaDetails.billingCycle}
                    onChange={(e) =>
                      setTraveaDetails((prev) => ({
                        ...prev,
                        billingCycle: e.target.value,
                      }))
                    }
                  />

                  <Select
                    label="Credit Period"
                    placeholder="Select period"
                    options={[]}
                    value={traveaDetails.creditPeriod}
                    onChange={(e) =>
                      setTraveaDetails((prev) => ({
                        ...prev,
                        creditPeriod: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Accounting Details */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Accounting Details
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Tax and ledger information.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="TRN Number"
                    placeholder="Enter TRN number"
                    value={traveaDetails.trnNumber}
                    onChange={(e) =>
                      setTraveaDetails((prev) => ({
                        ...prev,
                        trnNumber: e.target.value,
                      }))
                    }
                    error={errors.traveaDetails.trnNumber}
                    maxLength={15}
                    helperText="Tax registration number (15 digits max)."
                  />

                  <Input
                    label="Accounting Code"
                    placeholder="Enter accounting code"
                    value={traveaDetails.accountingCode}
                    onChange={(e) =>
                      setTraveaDetails((prev) => ({
                        ...prev,
                        accountingCode: e.target.value,
                      }))
                    }
                    helperText="Internal accounting reference code."
                  />

                  <Select
                    label="Main Ledger"
                    placeholder="Select ledger"
                    options={[]}
                    value={traveaDetails.mainLedger}
                    onChange={(e) =>
                      setTraveaDetails((prev) => ({
                        ...prev,
                        mainLedger: e.target.value,
                      }))
                    }
                  />

                  <Select
                    label="Group"
                    placeholder="Select group"
                    options={[]}
                    value={traveaDetails.group}
                    onChange={(e) =>
                      setTraveaDetails((prev) => ({ ...prev, group: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={activeStep === "vendor-info"}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </Button>

          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={() => navigate("/vendors")}>
              Cancel
            </Button>
            {activeStep !== "travea-details" && (
              <Button onClick={handleNext}>
                Next
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

