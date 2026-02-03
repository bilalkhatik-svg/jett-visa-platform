import { useState, useEffect } from "react";
import { Button, Input, Select } from "../../../design-system/ui";

// Types
export interface VisaPurpose {
  id?: string;
  code: string;
  name: string;
  description: string;
  synonyms: string;
  category: string;
}

export interface VisaPurposeFormData {
  code: string;
  name: string;
  description: string;
  synonyms: string;
  category: string;
}

export interface VisaPurposeFormErrors {
  code?: string;
  name?: string;
  category?: string;
}

interface VisaPurposeFormProps {
  initialData?: VisaPurpose;
  isEditMode?: boolean;
  existingCodes?: string[];
  existingNames?: string[];
  onSubmit: (data: VisaPurposeFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const CATEGORIES = ["Travel", "Professional", "Education", "Personal", "Medical", "Transit"];

/**
 * Generates a code from the name (first 4 letters, uppercase)
 */
function generateCodeFromName(name: string): string {
  if (!name) return "";
  // Remove special characters and spaces, take first 4 characters
  const cleaned = name.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  return cleaned.substring(0, 4);
}

export default function VisaPurposeForm({
  initialData,
  isEditMode = false,
  existingCodes = [],
  existingNames = [],
  onSubmit,
  onCancel,
  loading = false,
}: VisaPurposeFormProps) {
  const [formData, setFormData] = useState<VisaPurposeFormData>({
    code: initialData?.code || "",
    name: initialData?.name || "",
    description: initialData?.description || "",
    synonyms: initialData?.synonyms || "",
    category: initialData?.category || "",
  });

  const [errors, setErrors] = useState<VisaPurposeFormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Reset form when initialData changes (when modal opens with new data)
  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code || "",
        name: initialData.name || "",
        description: initialData.description || "",
        synonyms: initialData.synonyms || "",
        category: initialData.category || "",
      });
      setErrors({});
      setTouched({});
    } else {
      // Reset for add mode
      setFormData({
        code: "",
        name: "",
        description: "",
        synonyms: "",
        category: "",
      });
      setErrors({});
      setTouched({});
    }
  }, [initialData]);

  // Auto-generate code from name (both add and edit mode)
  useEffect(() => {
    if (formData.name) {
      const generatedCode = generateCodeFromName(formData.name);
      setFormData((prev) => ({ ...prev, code: generatedCode }));
    }
  }, [formData.name]);

  const validate = (): boolean => {
    const newErrors: VisaPurposeFormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (
      !isEditMode &&
      existingNames.some((name) => name.toLowerCase() === formData.name.toLowerCase())
    ) {
      newErrors.name = "Name must be unique";
    } else if (
      isEditMode &&
      initialData?.name !== formData.name &&
      existingNames.some((name) => name.toLowerCase() === formData.name.toLowerCase())
    ) {
      newErrors.name = "Name must be unique";
    }

    // Code validation (only for add mode, code is read-only in edit mode)
    if (!isEditMode) {
      if (!formData.code.trim()) {
        newErrors.code = "Code is required";
      } else if (existingCodes.includes(formData.code.toUpperCase())) {
        newErrors.code = "Code must be unique";
      }
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (field: keyof VisaPurposeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Clear error when user starts typing
    if (errors[field as keyof VisaPurposeFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof VisaPurposeFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // Mark all fields as touched to show errors
      setTouched({
        name: true,
        code: true,
        category: true,
      });
      return;
    }

    await onSubmit(formData);
  };

  const isFormValid = formData.name.trim() && formData.category && Object.keys(errors).length === 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Purpose Name */}
      <div>
        <Input
          label="Purpose Name"
          type="text"
          value={formData.name}
          onChange={(e) => handleFieldChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          error={touched.name ? errors.name : undefined}
          required
          disabled={loading}
        />
      </div>

      {/* Purpose Code */}
      <div>
        <Input
          label="Purpose Code"
          type="text"
          value={formData.code}
          onChange={(e) => {
            if (!isEditMode) {
              handleFieldChange("code", e.target.value.toUpperCase());
            }
          }}
          onBlur={() => handleBlur("code")}
          error={touched.code ? errors.code : undefined}
          required={!isEditMode}
          disabled={isEditMode || loading}
          helperText={isEditMode ? "Auto-updates when name changes" : "Auto-generated from name"}
          className={isEditMode ? "bg-slate-100" : ""}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleFieldChange("description", e.target.value)}
          onBlur={() => handleBlur("description")}
          rows={3}
          placeholder="Describe the purpose of this visa category..."
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      {/* Category */}
      <div>
        <Select
          label="Category"
          options={CATEGORIES.map((cat) => ({ value: cat, label: cat }))}
          value={formData.category}
          onChange={(e) => handleFieldChange("category", e.target.value)}
          onBlur={() => handleBlur("category")}
          error={touched.category ? errors.category : undefined}
          required
          disabled={loading}
        />
      </div>

      {/* Synonyms */}
      <div>
        <Input
          label="Synonyms"
          type="text"
          value={formData.synonyms}
          onChange={(e) => handleFieldChange("synonyms", e.target.value)}
          placeholder="Tourism, Leisure, Vacation (comma-separated)"
          helperText="Alternative terms for this purpose"
          disabled={loading}
        />
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={!isFormValid || loading}
        >
          {loading ? "Saving..." : isEditMode ? "Save Changes" : "Create Purpose"}
        </Button>
      </div>
    </form>
  );
}
