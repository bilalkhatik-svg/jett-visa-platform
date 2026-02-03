import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import type { Route } from "./+types/country-create";
import {
  Button,
  IconButton,
  Input,
  Select,
  Tabs,
  Alert,
  LoadingSpinner,
} from "../design-system/ui";
import {
  useCreateCountryMutation,
  useUpdateCountryMutation,
  useGetCountryByIdQuery,
  useUploadCountryAssetsMutation,
  useGetCountryAgeRulesQuery,
  useSaveCountryAgeRulesMutation,
  useGetCountryTaxQuery,
  useCreateCountryTaxMutation,
  useUpdateCountryTaxMutation,
  type AgeRule,
  type TaxEntry,
} from "../services";
import ImageUpload from "../components/ImageUpload";
import ImageCropper, { type CropMode } from "../components/ImageCropper";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Create New Country - Visa Admin" },
    { name: "description", content: "Add a new country to the master setup" },
  ];
}

// Form data interface
interface CountryFormData {
  countryName: string;
  isoCode2: string;
  isoCode3: string;
  nationality: string;
  continent: string;
  currencyCode: string;
  dialingCode: string;
  timeZone: string;
}

// Options for dropdowns
const continentOptions = [
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Africa", label: "Africa" },
  { value: "North America", label: "North America" },
  { value: "South America", label: "South America" },
  { value: "Oceania", label: "Oceania" },
  { value: "Antarctica", label: "Antarctica" },
];

const currencyOptions = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "JPY", label: "JPY - Japanese Yen" },
  { value: "CNY", label: "CNY - Chinese Yuan" },
  { value: "INR", label: "INR - Indian Rupee" },
  { value: "AUD", label: "AUD - Australian Dollar" },
  { value: "CAD", label: "CAD - Canadian Dollar" },
  { value: "BRL", label: "BRL - Brazilian Real" },
  { value: "MXN", label: "MXN - Mexican Peso" },
];

const timeZoneOptions = [
  { value: "UTC", label: "UTC" },
  { value: "America/New_York", label: "America/New_York (EST)" },
  { value: "America/Chicago", label: "America/Chicago (CST)" },
  { value: "America/Denver", label: "America/Denver (MST)" },
  { value: "America/Los_Angeles", label: "America/Los_Angeles (PST)" },
  { value: "Europe/London", label: "Europe/London (GMT)" },
  { value: "Europe/Paris", label: "Europe/Paris (CET)" },
  { value: "Europe/Berlin", label: "Europe/Berlin (CET)" },
  { value: "Asia/Dubai", label: "Asia/Dubai (GST)" },
  { value: "Asia/Kolkata", label: "Asia/Kolkata (IST)" },
  { value: "Asia/Tokyo", label: "Asia/Tokyo (JST)" },
  { value: "Asia/Shanghai", label: "Asia/Shanghai (CST)" },
  { value: "Australia/Sydney", label: "Australia/Sydney (AEDT)" },
];

export default function CountryCreate() {
  const navigate = useNavigate();
  const params = useParams();
  const countryId = params.id;
  const isEditMode = !!countryId;

  const [activeTab, setActiveTab] = useState("general-info");
  const [formData, setFormData] = useState<CountryFormData>({
    countryName: "",
    isoCode2: "",
    isoCode3: "",
    nationality: "",
    continent: "",
    currencyCode: "",
    dialingCode: "",
    timeZone: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CountryFormData, string>>>({});

  // Assets state
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [cardThumbnail, setCardThumbnail] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [cardFile, setCardFile] = useState<File | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [cropMode, setCropMode] = useState<CropMode>("banner");
  const [assetsUploaded, setAssetsUploaded] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [uploadAssets, { isLoading: isUploadingAssets }] = useUploadCountryAssetsMutation();

  // Age Rules state
  interface TravelerType {
    id: string;
    name: string;
    startAge: number;
    endAge: number;
    errors?: {
      name?: string;
      startAge?: string;
      endAge?: string;
    };
  }

  const [travelerTypes, setTravelerTypes] = useState<TravelerType[]>([]);
  const [validationStatus, setValidationStatus] = useState({
    noOverlap: true,
    continuousCoverage: true,
    hasAdultType: true,
    validRanges: true,
  });

  // Fetch age rules if editing
  const {
    data: ageRulesData,
    isLoading: isLoadingAgeRules,
  } = useGetCountryAgeRulesQuery(formData.isoCode2, {
    skip: !isEditMode || !formData.isoCode2,
  });

  const [saveAgeRules, { isLoading: isSavingAgeRules }] = useSaveCountryAgeRulesMutation();

  // Tax Structure state
  interface TaxRule {
    id: string;
    name: string;
    percentage: number;
    description: string;
    errors?: {
      name?: string;
      percentage?: string;
    };
  }

  const [taxRules, setTaxRules] = useState<TaxRule[]>([]);
  const [taxId, setTaxId] = useState<string | null>(null);

  // Fetch tax structure if editing
  const {
    data: taxData,
    isLoading: isLoadingTax,
  } = useGetCountryTaxQuery(formData.isoCode2, {
    skip: !isEditMode || !formData.isoCode2,
  });

  const [createTax, { isLoading: isCreatingTax }] = useCreateCountryTaxMutation();
  const [updateTax, { isLoading: isUpdatingTax }] = useUpdateCountryTaxMutation();

  const isSavingTax = isCreatingTax || isUpdatingTax;

  // Fetch country data if editing
  const {
    data: countryData,
    isLoading: isLoadingCountry,
    isError: isErrorLoadingCountry,
    error: errorLoadingCountry,
  } = useGetCountryByIdQuery(countryId || "", {
    skip: !isEditMode,
  });

  const [createCountry, { isLoading: isCreating, isError: isCreateError, error: createError }] =
    useCreateCountryMutation();
  const [updateCountry, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] =
    useUpdateCountryMutation();

  const isLoading = isCreating || isUpdating;
  const isError = isCreateError || isUpdateError;
  const error = createError || updateError;

  // Pre-fill form when country data is loaded
  useEffect(() => {
    if (countryData?.response) {
      const country = countryData.response;
      setFormData({
        countryName: country.countryName || "",
        isoCode2: country.isoCode2 || "",
        isoCode3: country.isoCode3 || "",
        nationality: country.nationality || "",
        continent: country.continent || "",
        currencyCode: country.currencyCode || "",
        dialingCode: country.dialingCode || "",
        timeZone: country.timeZone || "",
      });
    }
  }, [countryData]);

  // Load age rules when data is available
  useEffect(() => {
    if (ageRulesData?.response?.ageRules) {
      const ageRules = ageRulesData.response.ageRules;
      const types: TravelerType[] = Object.entries(ageRules)
        .filter(([_, rule]) => rule.status === "ACTIVE")
        .map(([name, rule], index) => ({
          id: `type-${index}`,
          name,
          startAge: rule.min,
          endAge: rule.max,
        }))
        .sort((a, b) => a.startAge - b.startAge);
      const finalTypes = types.length > 0 ? types : getDefaultTravelerTypes();
      setTravelerTypes(finalTypes);
      validateTravelerTypes(finalTypes);
    } else if (isEditMode && !isLoadingAgeRules && formData.isoCode2) {
      // If no age rules found, use defaults
      const defaults = getDefaultTravelerTypes();
      setTravelerTypes(defaults);
      validateTravelerTypes(defaults);
    } else if (!isEditMode) {
      // For new countries, use defaults
      const defaults = getDefaultTravelerTypes();
      setTravelerTypes(defaults);
      validateTravelerTypes(defaults);
    }
  }, [ageRulesData, isEditMode, isLoadingAgeRules, formData.isoCode2]);

  // Default traveler types
  const getDefaultTravelerTypes = (): TravelerType[] => [
    { id: "1", name: "Infant", startAge: 0, endAge: 2 },
    { id: "2", name: "Child", startAge: 3, endAge: 11 },
    { id: "3", name: "Minor", startAge: 12, endAge: 17 },
    { id: "4", name: "Adult", startAge: 18, endAge: 64 },
    { id: "5", name: "Senior", startAge: 65, endAge: 120 },
  ];

  // Validation functions
  const validateTravelerTypes = (types: TravelerType[]) => {
    const newValidation = {
      noOverlap: true,
      continuousCoverage: true,
      hasAdultType: true,
      validRanges: true,
    };

    // Check all start ages <= end ages
    newValidation.validRanges = types.every(
      (type) => type.startAge <= type.endAge
    );

    // Check for overlapping ranges
    const sorted = [...types].sort((a, b) => a.startAge - b.startAge);
    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i].endAge >= sorted[i + 1].startAge) {
        newValidation.noOverlap = false;
        break;
      }
    }

    // Check continuous coverage from age 0
    if (sorted.length > 0) {
      if (sorted[0].startAge !== 0) {
        newValidation.continuousCoverage = false;
      } else {
        let currentEnd = sorted[0].endAge;
        for (let i = 1; i < sorted.length; i++) {
          if (sorted[i].startAge > currentEnd + 1) {
            newValidation.continuousCoverage = false;
            break;
          }
          currentEnd = Math.max(currentEnd, sorted[i].endAge);
        }
      }
    } else {
      newValidation.continuousCoverage = false;
    }

    // Check at least one type starts at age 18
    newValidation.hasAdultType = types.some((type) => type.startAge === 18);

    setValidationStatus(newValidation);
    return (
      newValidation.noOverlap &&
      newValidation.continuousCoverage &&
      newValidation.hasAdultType &&
      newValidation.validRanges
    );
  };

  // Update traveler type
  const updateTravelerType = (id: string, field: keyof TravelerType, value: string | number) => {
    setTravelerTypes((prev) => {
      const updated = prev.map((type) =>
        type.id === id
          ? {
              ...type,
              [field]: value,
              errors: undefined,
            }
          : type
      );
      validateTravelerTypes(updated);
      return updated;
    });
  };

  // Add new traveler type
  const addTravelerType = () => {
    const newId = `type-${Date.now()}`;
    const newType: TravelerType = {
      id: newId,
      name: "",
      startAge: 0,
      endAge: 120,
    };
    setTravelerTypes((prev) => {
      const updated = [...prev, newType];
      validateTravelerTypes(updated);
      return updated;
    });
  };

  // Delete traveler type
  const deleteTravelerType = (id: string) => {
    setTravelerTypes((prev) => {
      const updated = prev.filter((type) => type.id !== id);
      validateTravelerTypes(updated);
      return updated;
    });
  };

  // Load tax rules when data is available
  useEffect(() => {
    if (taxData?.response) {
      const tax = taxData.response;
      setTaxId(tax.id);
      const rules: TaxRule[] = Object.entries(tax.taxes)
        .filter(([_, entry]) => entry.status === "ACTIVE")
        .map(([name, entry], index) => ({
          id: `tax-${index}`,
          name,
          percentage: entry.taxPercentage,
          description: entry.appliesOn.join(", "),
        }));
      setTaxRules(rules.length > 0 ? rules : getDefaultTaxRules());
    } else if (isEditMode && !isLoadingTax && formData.isoCode2) {
      // If no tax found, use defaults
      const defaults = getDefaultTaxRules();
      setTaxRules(defaults);
    } else if (!isEditMode) {
      // For new countries, use defaults
      const defaults = getDefaultTaxRules();
      setTaxRules(defaults);
    }
  }, [taxData, isEditMode, isLoadingTax, formData.isoCode2]);

  // Default tax rules
  const getDefaultTaxRules = (): TaxRule[] => [
    { id: "1", name: "Service Tax", percentage: 18, description: "Base Fee, Service Fee" },
    { id: "2", name: "Processing Fee Tax", percentage: 5, description: "Base Fee, Express Fee" },
    { id: "3", name: "VAT", percentage: 12, description: "All Fee Types" },
  ];

  // Update tax rule
  const updateTaxRule = (id: string, field: keyof TaxRule, value: string | number) => {
    setTaxRules((prev) =>
      prev.map((rule) =>
        rule.id === id
          ? {
              ...rule,
              [field]: value,
              errors: undefined,
            }
          : rule
      )
    );
  };

  // Add new tax rule
  const addTaxRule = () => {
    const newId = `tax-${Date.now()}`;
    const newRule: TaxRule = {
      id: newId,
      name: "",
      percentage: 0,
      description: "",
    };
    setTaxRules((prev) => [...prev, newRule]);
  };

  // Delete tax rule
  const deleteTaxRule = (id: string) => {
    setTaxRules((prev) => prev.filter((rule) => rule.id !== id));
  };

  // Validate tax rules
  const validateTaxRules = (): boolean => {
    let isValid = true;
    const updatedRules = taxRules.map((rule) => {
      const errors: { name?: string; percentage?: string } = {};

      if (!rule.name.trim()) {
        errors.name = "Tax name is required";
        isValid = false;
      } else if (rule.name.trim().length > 100) {
        errors.name = "Tax name must be 100 characters or less";
        isValid = false;
      } else if (!/^[A-Za-z][A-Za-z0-9 _]*$/.test(rule.name.trim())) {
        errors.name = "Invalid characters in tax name";
        isValid = false;
      }

      if (rule.percentage < 0 || rule.percentage > 100) {
        errors.percentage = "Tax percentage must be between 0 and 100";
        isValid = false;
      }

      return { ...rule, errors: Object.keys(errors).length > 0 ? errors : undefined };
    });

    // Check for duplicate names (case-insensitive)
    const nameMap = new Map<string, string>();
    updatedRules.forEach((rule) => {
      const normalizedName = rule.name.trim().toLowerCase();
      if (normalizedName && nameMap.has(normalizedName)) {
        rule.errors = { ...rule.errors, name: "Tax name must be unique" };
        isValid = false;
      } else if (normalizedName) {
        nameMap.set(normalizedName, rule.id);
      }
    });

    setTaxRules(updatedRules);
    return isValid;
  };

  // Save tax rules
  const handleSaveTaxRules = async () => {
    if (!formData.isoCode2 || !formData.currencyCode) {
      return;
    }

    if (!validateTaxRules()) {
      return;
    }

    const taxes: Record<string, TaxEntry> = {};
    taxRules.forEach((rule) => {
      if (rule.name.trim()) {
        taxes[rule.name.trim()] = {
          taxPercentage: rule.percentage,
          appliesOn: rule.description
            ? rule.description.split(",").map((s) => s.trim().toUpperCase())
            : ["BASEFEE"],
          status: "ACTIVE",
        };
      }
    });

    try {
      if (taxId) {
        // Update existing
        await updateTax({
          id: taxId,
          data: {
            currencyCode: formData.currencyCode,
            taxes,
          },
        }).unwrap();
      } else {
        // Create new
        const result = await createTax({
          isoCode2: formData.isoCode2,
          currencyCode: formData.currencyCode,
          taxes,
        }).unwrap();
        setTaxId(result.response.id);
      }
    } catch (err: any) {
      console.error("Failed to save tax rules:", err);
    }
  };

  // Save age rules
  const handleSaveAgeRules = async () => {
    if (!formData.isoCode2) {
      return;
    }

    const ageRules: Record<string, AgeRule> = {};
    travelerTypes.forEach((type) => {
      ageRules[type.name] = {
        min: type.startAge,
        max: type.endAge,
        status: "ACTIVE",
      };
    });

    try {
      await saveAgeRules({
        isoCode2: formData.isoCode2,
        ageRules,
      }).unwrap();
    } catch (err: any) {
      console.error("Failed to save age rules:", err);
    }
  };

  // Handle file selection
  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setOriginalImage(imageUrl);
      setCropMode("banner");
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  // Handle crop complete
  const handleCropComplete = async (croppedImage: string) => {
    if (cropMode === "banner") {
      setBannerImage(croppedImage);
      // Convert cropped image to File for banner
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      const file = new File([blob], "banner.jpg", { type: "image/jpeg" });
      setBannerFile(file);
      setShowCropper(false);
      // Move to card crop
      setCropMode("card");
      setShowCropper(true);
    } else if (cropMode === "card") {
      setCardThumbnail(croppedImage);
      // Convert cropped image to File for card
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      const file = new File([blob], "card.jpg", { type: "image/jpeg" });
      setCardFile(file);
      setShowCropper(false);
      setAssetsUploaded(true);
    }
  };

  // Handle re-crop card
  const handleRecropCard = () => {
    if (originalImage) {
      setCropMode("card");
      setShowCropper(true);
    }
  };

  // Handle replace image
  const handleReplaceImage = () => {
    setOriginalImage(null);
    setBannerImage(null);
    setCardThumbnail(null);
    setBannerFile(null);
    setCardFile(null);
    setAssetsUploaded(false);
    setUploadError(null);
  };

  // Handle save assets
  const handleSaveAssets = async () => {
    if (!bannerFile || !cardFile) {
      setUploadError("Both banner and card images are required");
      return;
    }

    if (!isEditMode || !countryId) {
      setUploadError("Country must be saved first before uploading assets");
      return;
    }

    try {
      await uploadAssets({
        entityId: countryId,
        isoCode2: formData.isoCode2,
        bannerImage: bannerFile,
        cardThumbnail: cardFile,
      }).unwrap();
      setAssetsUploaded(true);
      setUploadError(null);
    } catch (err: any) {
      setUploadError(
        err?.data?.message || "Failed to upload assets. Please try again."
      );
    }
  };

  const handleInputChange = (field: keyof CountryFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CountryFormData, string>> = {};

    if (!formData.countryName.trim()) {
      newErrors.countryName = "Country name is required";
    }
    if (!formData.isoCode2.trim()) {
      newErrors.isoCode2 = "ISO Alpha 2 Code is required";
    } else if (formData.isoCode2.length !== 2) {
      newErrors.isoCode2 = "ISO Alpha 2 Code must be 2 characters";
    }
    if (!formData.isoCode3.trim()) {
      newErrors.isoCode3 = "ISO Alpha 3 Code is required";
    } else if (formData.isoCode3.length !== 3) {
      newErrors.isoCode3 = "ISO Alpha 3 Code must be 3 characters";
    }
    if (!formData.nationality.trim()) {
      newErrors.nationality = "Nationality is required";
    }
    if (!formData.continent) {
      newErrors.continent = "Continent is required";
    }
    if (!formData.currencyCode) {
      newErrors.currencyCode = "Currency is required";
    }
    if (!formData.dialingCode.trim()) {
      newErrors.dialingCode = "Dialing code is required";
    }
    if (!formData.timeZone) {
      newErrors.timeZone = "Time zone is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const payload = {
        countryName: formData.countryName,
        isoCode2: formData.isoCode2.toUpperCase(),
        isoCode3: formData.isoCode3.toUpperCase(),
        nationality: formData.nationality,
        continent: formData.continent,
        currencyCode: formData.currencyCode,
        dialingCode: formData.dialingCode,
        timeZone: formData.timeZone,
      };

      if (isEditMode && countryId) {
        await updateCountry({
          id: countryId,
          ...payload,
        }).unwrap();
      } else {
        await createCountry(payload).unwrap();
      }

      // Navigate back to country master on success
      navigate("/");
    } catch (err) {
      console.error(`Failed to ${isEditMode ? "update" : "create"} country:`, err);
    }
  };

  const tabs = [
    { id: "general-info", label: "General Info" },
    { id: "assets", label: "Assets" },
    { id: "age-rules", label: "Age Rules" },
    { id: "tax-structure", label: "Tax Structure" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-6 py-8">
        {/* Header with Back Button and Save */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <IconButton
              variant="ghost"
              size="md"
              onClick={() => navigate("/")}
              aria-label="Go back"
              icon={
                <svg
                  className="w-6 h-6"
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
              }
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {isEditMode ? "Edit Country" : "Create New Country"}
              </h1>
              <p className="text-body text-gray-600">
                {isEditMode
                  ? "Update country information in the master setup"
                  : "Add a new country to the master setup"}
              </p>
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="min-w-[100px]"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                <span>Saving...</span>
              </div>
            ) : (
              "Save"
            )}
          </Button>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <Tabs
            items={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Loading state when fetching country data */}
        {isEditMode && isLoadingCountry && (
          <div className="mb-6 flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Error Alert - Loading country */}
        {isEditMode && isErrorLoadingCountry && (
          <div className="mb-6">
            <Alert variant="error" title="Error">
              {errorLoadingCountry && "data" in errorLoadingCountry
                ? typeof errorLoadingCountry.data === "string"
                  ? errorLoadingCountry.data
                  : "Failed to load country data. Please try again."
                : "Failed to load country data. Please try again."}
            </Alert>
          </div>
        )}

        {/* Error Alert - Create/Update */}
        {isError && (
          <div className="mb-6">
            <Alert variant="error" title="Error">
              {error && "data" in error
                ? typeof error.data === "string"
                  ? error.data
                  : `Failed to ${isEditMode ? "update" : "create"} country. Please try again.`
                : `Failed to ${isEditMode ? "update" : "create"} country. Please try again.`}
            </Alert>
          </div>
        )}

        {/* Form */}
        {!isEditMode || (!isLoadingCountry && countryData) ? (
          <form onSubmit={handleSubmit}>
          {activeTab === "general-info" && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <Input
                    label={
                      <>
                        Country Name<span className="text-red-500 ml-1">*</span>
                      </>
                    }
                    placeholder="Enter country name"
                    value={formData.countryName}
                    onChange={(e) => handleInputChange("countryName", e.target.value)}
                    error={errors.countryName}
                    required
                  />

                  <Input
                    label={
                      <>
                        ISO Alpha 2 Code<span className="text-red-500 ml-1">*</span>
                      </>
                    }
                    placeholder="e.g., US"
                    value={formData.isoCode2}
                    onChange={(e) => handleInputChange("isoCode2", e.target.value.toUpperCase())}
                    error={errors.isoCode2}
                    maxLength={2}
                    required
                  />

                  <Select
                    label={
                      <>
                        Continent<span className="text-red-500 ml-1">*</span>
                      </>
                    }
                    placeholder="Select Continent"
                    options={continentOptions}
                    value={formData.continent}
                    onChange={(e) => handleInputChange("continent", e.target.value)}
                    error={errors.continent}
                    required
                  />

                  <Input
                    label={
                      <>
                        Dialing Code<span className="text-red-500 ml-1">*</span>
                      </>
                    }
                    placeholder="e.g., +1"
                    value={formData.dialingCode}
                    onChange={(e) => handleInputChange("dialingCode", e.target.value)}
                    error={errors.dialingCode}
                    required
                  />

                  <Select
                    label={
                      <>
                        Time Zone<span className="text-red-500 ml-1">*</span>
                      </>
                    }
                    placeholder="Select Time Zone"
                    options={timeZoneOptions}
                    value={formData.timeZone}
                    onChange={(e) => handleInputChange("timeZone", e.target.value)}
                    error={errors.timeZone}
                    required
                  />
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <Input
                    label={
                      <>
                        Nationality<span className="text-red-500 ml-1">*</span>
                      </>
                    }
                    placeholder="e.g., American"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange("nationality", e.target.value)}
                    error={errors.nationality}
                    required
                  />

                  <Input
                    label={
                      <>
                        ISO Alpha 3 Code<span className="text-red-500 ml-1">*</span>
                      </>
                    }
                    placeholder="e.g., USA"
                    value={formData.isoCode3}
                    onChange={(e) => handleInputChange("isoCode3", e.target.value.toUpperCase())}
                    error={errors.isoCode3}
                    maxLength={3}
                    required
                  />

                  <Select
                    label={
                      <>
                        Currency<span className="text-red-500 ml-1">*</span>
                      </>
                    }
                    placeholder="Select Currency"
                    options={currencyOptions}
                    value={formData.currencyCode}
                    onChange={(e) => handleInputChange("currencyCode", e.target.value)}
                    error={errors.currencyCode}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Assets Tab */}
          {activeTab === "assets" && (
            <div className="space-y-6">
              {/* Country Banner Image Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Country Banner Image
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Upload a high-quality banner image used on product detail pages.
                  This image will be cropped to create both banner and card thumbnails.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Upload Area */}
                  <div className="lg:col-span-2">
                    {!originalImage ? (
                      <ImageUpload onFileSelect={handleFileSelect} />
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                        <p className="text-sm text-gray-600 mb-4">
                          Image selected. Cropping in progress...
                        </p>
                        <Button variant="secondary" onClick={handleReplaceImage}>
                          Replace Image
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Usage Information */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      Usage Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <div>
                          <p className="text-xs font-medium text-gray-900">
                            Banner Image (2:1 ratio)
                          </p>
                          <p className="text-xs text-gray-600">
                            Used on PDP web and mobile headers.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                        <div>
                          <p className="text-xs font-medium text-gray-900">
                            Card Thumbnail (4:5 ratio)
                          </p>
                          <p className="text-xs text-gray-600">
                            Used for destination cards and listings.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Previews - Side by Side */}
              {(bannerImage || cardThumbnail) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Banner Image Preview */}
                  {bannerImage && (
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Banner Image
                        </h3>
                        <span className="text-sm text-gray-500">2400 x 1200 px</span>
                      </div>
                      <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden bg-gray-100 mb-4">
                        <img
                          src={bannerImage}
                          alt="Banner preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        variant="secondary"
                        onClick={handleReplaceImage}
                        className="flex items-center gap-2 w-full justify-center"
                      >
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
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Replace Image
                      </Button>
                    </div>
                  )}

                  {/* Card Thumbnail Preview */}
                  {cardThumbnail && (
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Card Thumbnail
                        </h3>
                        <span className="text-sm text-gray-500">800 x 1000 px</span>
                      </div>
                      <div className="relative w-full aspect-[4/5] max-w-[320px] mx-auto rounded-lg overflow-hidden bg-gray-100 mb-4">
                        <img
                          src={cardThumbnail}
                          alt="Card thumbnail preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        variant="secondary"
                        onClick={handleRecropCard}
                        className="flex items-center gap-2 w-full justify-center"
                      >
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
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                          />
                        </svg>
                        Re-crop Image
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Alerts */}
              <div className="space-y-4">
                {/* Success Alert - Show when both images are cropped */}
                {bannerImage && cardThumbnail && (
                  <Alert variant="success" title="Images Successfully Uploaded">
                    Both banner and card thumbnail have been generated and are ready
                    to publish. Click 'Save & Publish' to apply changes.
                  </Alert>
                )}

                {/* Info Alert - Show during upload/cropping process */}
                {originalImage && (!bannerImage || !cardThumbnail) && (
                  <Alert variant="warning" title="Upload Process">
                    After uploading an image, you'll be guided through two cropping
                    steps to create both banner and card formats. Both images are
                    required before saving.
                  </Alert>
                )}
              </div>

              {/* Error Alert */}
              {uploadError && (
                <Alert variant="error" title="Error">
                  {uploadError}
                </Alert>
              )}

              {/* Save Assets Button (only in edit mode) */}
              {isEditMode && bannerImage && cardThumbnail && (
                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveAssets}
                    disabled={isUploadingAssets}
                  >
                    {isUploadingAssets ? (
                      <div className="flex items-center gap-2">
                        <LoadingSpinner size="sm" />
                        <span>Uploading...</span>
                      </div>
                    ) : (
                      "Save Assets"
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === "age-rules" && (
            <div className="space-y-6">
              {/* Usage Information Alert */}
              <Alert variant="info" title="">
                Traveler types defined here are used to create visa SKUs based on age
                eligibility.
              </Alert>

              {/* Traveler Type Configuration */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Traveler Type Configuration
                  </h3>
                  <Button onClick={addTravelerType} size="sm">
                    + Add Traveler Type
                  </Button>
                </div>

                {/* Traveler Types Table */}
                <div className="space-y-4">
                  {travelerTypes.map((type) => (
                    <div
                      key={type.id}
                      className="grid grid-cols-12 gap-4 items-center p-4 border border-gray-200 rounded-lg"
                    >
                      {/* Traveler Type Name */}
                      <div className="col-span-3">
                        <Input
                          label="Traveler Type Name"
                          value={type.name}
                          onChange={(e) =>
                            updateTravelerType(type.id, "name", e.target.value)
                          }
                          error={type.errors?.name}
                          placeholder="e.g., Infant"
                        />
                      </div>

                      {/* Start Age */}
                      <div className="col-span-3">
                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <Input
                              label="Start Age"
                              type="number"
                              value={type.startAge.toString()}
                              onChange={(e) =>
                                updateTravelerType(
                                  type.id,
                                  "startAge",
                                  parseInt(e.target.value) || 0
                                )
                              }
                              error={type.errors?.startAge}
                              min={0}
                              max={120}
                            />
                          </div>
                          <span className="text-sm text-gray-600 mb-2">years</span>
                        </div>
                      </div>

                      {/* End Age */}
                      <div className="col-span-3">
                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <Input
                              label="End Age"
                              type="number"
                              value={type.endAge.toString()}
                              onChange={(e) =>
                                updateTravelerType(
                                  type.id,
                                  "endAge",
                                  parseInt(e.target.value) || 0
                                )
                              }
                              error={type.errors?.endAge}
                              min={0}
                              max={120}
                            />
                          </div>
                          <span className="text-sm text-gray-600 mb-2">years</span>
                        </div>
                      </div>

                      {/* Valid Status */}
                      <div className="col-span-2 flex items-center gap-2">
                        {validationStatus.validRanges &&
                        type.startAge <= type.endAge ? (
                          <>
                            <svg
                              className="w-5 h-5 text-green-600"
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
                            <span className="text-sm text-green-600 font-medium">
                              Valid
                            </span>
                          </>
                        ) : (
                          <span className="text-sm text-red-600 font-medium">
                            Invalid
                          </span>
                        )}
                      </div>

                      {/* Delete Button */}
                      <div className="col-span-1 flex justify-end">
                        <IconButton
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTravelerType(type.id)}
                          aria-label="Delete traveler type"
                          icon={
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          }
                          className="text-red-600 hover:text-red-800"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Validation Status */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Validation Status
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      key: "noOverlap",
                      label: "No overlapping age ranges",
                    },
                    {
                      key: "continuousCoverage",
                      label: "Continuous coverage from age 0",
                    },
                    {
                      key: "hasAdultType",
                      label: "At least one age group starting at 18",
                    },
                    {
                      key: "validRanges",
                      label: "All start ages <= end ages",
                    },
                  ].map((rule) => {
                    const isValid = validationStatus[rule.key as keyof typeof validationStatus];
                    return (
                      <div
                        key={rule.key}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          isValid
                            ? "bg-green-50 border border-green-200"
                            : "bg-red-50 border border-red-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {isValid ? (
                            <svg
                              className="w-5 h-5 text-green-600"
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
                          ) : (
                            <svg
                              className="w-5 h-5 text-red-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          )}
                          <span
                            className={`text-sm font-medium ${
                              isValid ? "text-green-700" : "text-red-700"
                            }`}
                          >
                            {rule.label}
                          </span>
                        </div>
                        <span
                          className={`text-sm font-semibold ${
                            isValid ? "text-green-700" : "text-red-700"
                          }`}
                        >
                          {isValid ? "VALID" : "INVALID"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Save Button */}
              {isEditMode && formData.isoCode2 && (
                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveAgeRules}
                    disabled={
                      isSavingAgeRules ||
                      !(
                        validationStatus.noOverlap &&
                        validationStatus.continuousCoverage &&
                        validationStatus.hasAdultType &&
                        validationStatus.validRanges
                      )
                    }
                  >
                    {isSavingAgeRules ? (
                      <div className="flex items-center gap-2">
                        <LoadingSpinner size="sm" />
                        <span>Saving...</span>
                      </div>
                    ) : (
                      "Save Age Rules"
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === "tax-structure" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Tax Structure
                    </h3>
                    <p className="text-sm text-gray-600">
                      Configure tax rules that apply to different fee types for this
                      country.
                    </p>
                  </div>
                  <Button onClick={addTaxRule} variant="primary" size="md" className="flex items-center gap-2">
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Tax Rule
                  </Button>
                </div>

                {/* Tax Rules Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tax Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tax Percentage
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {taxRules.map((rule) => (
                        <tr key={rule.id} className="hover:bg-gray-50">
                          {/* Tax Name */}
                          <td className="px-4 py-4 whitespace-nowrap">
                            <Input
                              label=""
                              value={rule.name}
                              onChange={(e) =>
                                updateTaxRule(rule.id, "name", e.target.value)
                              }
                              error={rule.errors?.name}
                              placeholder="e.g., Service Tax"
                              className="min-w-[150px]"
                            />
                          </td>

                          {/* Tax Percentage */}
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-end gap-2">
                              <div className="flex-1">
                                <Input
                                  label=""
                                  type="number"
                                  value={rule.percentage.toString()}
                                  onChange={(e) =>
                                    updateTaxRule(
                                      rule.id,
                                      "percentage",
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                  error={rule.errors?.percentage}
                                  min={0}
                                  max={100}
                                  step={0.01}
                                  placeholder="0"
                                  className="min-w-[100px]"
                                />
                              </div>
                              <span className="text-sm text-gray-600 mb-2">%</span>
                            </div>
                          </td>

                          {/* Description */}
                          <td className="px-4 py-4">
                            <Input
                              label=""
                              value={rule.description}
                              onChange={(e) =>
                                updateTaxRule(rule.id, "description", e.target.value)
                              }
                              placeholder="e.g., Base Fee, Service Fee"
                              className="min-w-[200px]"
                            />
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-4 whitespace-nowrap">
                            <IconButton
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteTaxRule(rule.id)}
                              aria-label="Delete tax rule"
                              icon={
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              }
                              className="text-gray-400 hover:text-red-600"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tax Notes */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">i</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-1">
                      Taxes defined here are stored as country level records and will
                      be available for selection when configuring visa prices.
                    </p>
                    <p className="text-sm text-gray-700">
                      Taxes that are already in use cannot be deleted.
                    </p>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              {isEditMode && formData.isoCode2 && (
                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveTaxRules}
                    disabled={isSavingTax || taxRules.length === 0}
                  >
                    {isSavingTax ? (
                      <div className="flex items-center gap-2">
                        <LoadingSpinner size="sm" />
                        <span>Saving...</span>
                      </div>
                    ) : (
                      "Save Tax Rules"
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
          </form>
        ) : null}

        {/* Image Cropper Modal */}
        {showCropper && originalImage && (
          <ImageCropper
            image={originalImage}
            mode={cropMode}
            onCropComplete={handleCropComplete}
            onCancel={() => {
              setShowCropper(false);
              if (cropMode === "banner") {
                handleReplaceImage();
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

