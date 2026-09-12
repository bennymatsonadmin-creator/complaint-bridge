import { useState, useEffect, useMemo } from "react";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  industries,
  countries,
  outcomeOptions,
  contactMethodOptions,
  contactedOptions,
  getCompaniesForIndustry,
} from "./complaintData";
import { SuccessScreen } from "./SuccessScreen";

// Replace with your form backend endpoint (EmailJS, custom API, or mailto)
const FORM_ENDPOINT = "YOUR_BACKEND_ENDPOINT_HERE";
// Replace with your email address: info@complaintsbridge.company
const FORM_EMAIL = "info@complaintsbridge.company";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  industry: string;
  company: string;
  companyWebsite: string;
  reference: string;
  dateOfIncident: string;
  amount: string;
  description: string;
  outcome: string;
  contactedCompany: string;
  preferredContact: string;
  consent: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  industry: "",
  company: "",
  companyWebsite: "",
  reference: "",
  dateOfIncident: "",
  amount: "",
  description: "",
  outcome: "",
  contactedCompany: "",
  preferredContact: "",
  consent: false,
};

function generateCaseReference(): string {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const array = new Uint8Array(5);
  crypto.getRandomValues(array);
  const random = Array.from(array, (b) => b % 10).join("");
  return `CB-${year}${month}-${random}`;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  return /^\+?[\d\s().-]{7,20}$/.test(phone);
}

export function ComplaintForm() {
  const [formData, setFormData] = useState<FormData>(() => {
    const saved = sessionStorage.getItem("complaintBridgeForm");
    if (saved) {
      try {
        return { ...initialFormData, ...JSON.parse(saved) };
      } catch {
        return initialFormData;
      }
    }
    return initialFormData;
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [caseReference, setCaseReference] = useState("");
  const [deliveryWarning, setDeliveryWarning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [companySuggestions, setCompanySuggestions] = useState<string[]>([]);

  useEffect(() => {
    const savedRef = sessionStorage.getItem("complaintBridgeCaseReference");
    if (savedRef) {
      setCaseReference(savedRef);
      setSubmitted(true);
    }
  }, []);

  useEffect(() => {
    if (formData.industry) {
      setCompanySuggestions(getCompaniesForIndustry(formData.industry));
    } else {
      setCompanySuggestions([]);
    }
  }, [formData.industry]);

  useEffect(() => {
    sessionStorage.setItem("complaintBridgeForm", JSON.stringify(formData));
  }, [formData]);

  const selectedIndustryName = useMemo(() => {
    const industry = industries.find((i) => i.id === formData.industry);
    return industry?.name || "";
  }, [formData.industry]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.industry) newErrors.industry = "Industry is required";
    if (!formData.company.trim()) newErrors.company = "Company name is required";
    if (!formData.reference.trim()) {
      newErrors.reference = "Order / Booking / Voucher Reference is required";
    }
    if (!formData.dateOfIncident) {
      newErrors.dateOfIncident = "Date of incident is required";
    } else {
      const selected = new Date(formData.dateOfIncident);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      if (selected > today) {
        newErrors.dateOfIncident = "Date cannot be in the future";
      }
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 40) {
      newErrors.description = "Description must be at least 40 characters";
    }
    if (!formData.outcome) newErrors.outcome = "Outcome sought is required";
    if (!formData.contactedCompany)
      newErrors.contactedCompany = "Please select an option";
    if (!formData.preferredContact)
      newErrors.preferredContact = "Please select a preferred contact method";
    if (!formData.consent) {
      newErrors.consent = "You must confirm the information is accurate";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const reference = generateCaseReference();
    setCaseReference(reference);
    sessionStorage.setItem("complaintBridgeCaseReference", reference);

    const payload = {
      ...formData,
      caseReference: reference,
      timestamp: new Date().toISOString(),
      sourceUrl: window.location.href,
    };

    let delivered = true;

    if (FORM_ENDPOINT && FORM_ENDPOINT !== "YOUR_BACKEND_ENDPOINT_HERE") {
      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) delivered = false;
      } catch {
        delivered = false;
      }
    } else {
      // Fallback: prepare email payload for manual sending
      // The user can copy the reference and email the details to info@complaintsbridge.company
      delivered = false;
    }

    setDeliveryWarning(!delivered);
    setSubmitted(true);
    setSubmitting(false);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmitAnother = () => {
    setFormData(initialFormData);
    setErrors({});
    setSubmitted(false);
    setCaseReference("");
    setDeliveryWarning(false);
    sessionStorage.removeItem("complaintBridgeCaseReference");
    sessionStorage.removeItem("complaintBridgeForm");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <SuccessScreen
        name={formData.fullName}
        company={formData.company}
        caseReference={caseReference}
        category={selectedIndustryName}
        dateOfIncident={formData.dateOfIncident}
        outcomeSought={formData.outcome}
        onSubmitAnother={handleSubmitAnother}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="e.g., John Smith"
            className={errors.fullName ? "border-red-500" : ""}
          />
          {errors.fullName && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.fullName}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="e.g., john@example.com"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="e.g., +44 7853 169761"
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.phone}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <select
            id="country"
            value={formData.country}
            onChange={(e) => handleChange("country", e.target.value)}
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              errors.country ? "border-red-500" : ""
            }`}
          >
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.country}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry / Category *</Label>
          <select
            id="industry"
            value={formData.industry}
            onChange={(e) => handleChange("industry", e.target.value)}
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              errors.industry ? "border-red-500" : ""
            }`}
          >
            <option value="">Select industry</option>
            {industries.map((industry) => (
              <option key={industry.id} value={industry.id}>
                {industry.name}
              </option>
            ))}
          </select>
          {errors.industry && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.industry}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">
            Which company is your complaint about? *
          </Label>
          <Input
            id="company"
            list="company-suggestions"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            placeholder="e.g., British Airways"
            className={errors.company ? "border-red-500" : ""}
          />
          <datalist id="company-suggestions">
            {companySuggestions.map((company) => (
              <option key={company} value={company} />
            ))}
          </datalist>
          {errors.company && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.company}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyWebsite">
            Company website or contact page (optional)
          </Label>
          <Input
            id="companyWebsite"
            type="url"
            value={formData.companyWebsite}
            onChange={(e) => handleChange("companyWebsite", e.target.value)}
            placeholder="e.g., https://www.example.com/contact"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reference">
            Order / Booking / Voucher Reference *
          </Label>
          <Input
            id="reference"
            value={formData.reference}
            onChange={(e) => handleChange("reference", e.target.value)}
            placeholder="e.g., ABC-123456"
            className={errors.reference ? "border-red-500" : ""}
          />
          {errors.reference && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.reference}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfIncident">Date of Incident *</Label>
          <Input
            id="dateOfIncident"
            type="date"
            value={formData.dateOfIncident}
            onChange={(e) => handleChange("dateOfIncident", e.target.value)}
            className={errors.dateOfIncident ? "border-red-500" : ""}
          />
          {errors.dateOfIncident && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.dateOfIncident}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount involved (optional)</Label>
          <Input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            value={formData.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
            placeholder="e.g., 150.00"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">What happened? *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Please describe what happened in detail (minimum 40 characters)..."
          className={errors.description ? "border-red-500" : ""}
          rows={5}
        />
        <div className="flex justify-between">
          {errors.description ? (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.description}
            </p>
          ) : (
            <span />
          )}
          <p className="text-sm text-gray-500">
            {formData.description.length} characters (minimum 40)
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="outcome">What outcome are you seeking? *</Label>
          <select
            id="outcome"
            value={formData.outcome}
            onChange={(e) => handleChange("outcome", e.target.value)}
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              errors.outcome ? "border-red-500" : ""
            }`}
          >
            <option value="">Select outcome</option>
            {outcomeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.outcome && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.outcome}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Have you already contacted the company? *</Label>
          <RadioGroup
            value={formData.contactedCompany}
            onValueChange={(value) => handleChange("contactedCompany", value)}
            className="flex gap-4"
          >
            {contactedOptions.map((option) => (
              <div
                key={option}
                className="flex items-center space-x-2"
              >
                <RadioGroupItem value={option} id={`contacted-${option}`} />
                <Label htmlFor={`contacted-${option}`} className="font-normal">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.contactedCompany && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.contactedCompany}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Preferred Contact Method *</Label>
        <RadioGroup
          value={formData.preferredContact}
          onValueChange={(value) => handleChange("preferredContact", value)}
          className="flex gap-4"
        >
          {contactMethodOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`contact-method-${option}`} />
              <Label htmlFor={`contact-method-${option}`} className="font-normal">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors.preferredContact && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-3.5 w-3.5" /> {errors.preferredContact}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={formData.consent}
            onCheckedChange={(checked) => handleChange("consent", checked as boolean)}
            id="consent"
          />
          <Label htmlFor="consent" className="font-normal">
            I confirm the information provided is accurate and I agree to be
            contacted about this complaint. *
          </Label>
        </div>
        {errors.consent && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-3.5 w-3.5" /> {errors.consent}
          </p>
        )}
      </div>

      {deliveryWarning && (
        <div className="rounded-lg border border-amber/50 bg-amber/10 p-4 text-sm text-gray-800">
          <p className="font-medium">We couldn't confirm delivery — please screenshot this reference.</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-teal py-4 text-lg hover:bg-teal/90 text-white"
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting Complaint...
          </>
        ) : (
          "Submit Complaint"
        )}
      </Button>
    </form>
  );
}

export default ComplaintForm;
