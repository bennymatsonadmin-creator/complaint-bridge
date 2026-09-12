import { useState, useEffect, useRef } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { industries, countries, outcomes, contactMethods, contactStatuses } from './complaintData';

// Replace with your form backend endpoint (EmailJS, custom API, or mailto)
// Example: const FORM_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";
const FORM_ENDPOINT = "YOUR_BACKEND_ENDPOINT_HERE";
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
  whatHappened: string;
  outcome: string;
  contactedCompany: string;
  preferredContact: string;
  consent: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  country?: string;
  industry?: string;
  company?: string;
  reference?: string;
  dateOfIncident?: string;
  whatHappened?: string;
  outcome?: string;
  consent?: string;
}

export default function ComplaintForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    industry: '',
    company: '',
    companyWebsite: '',
    reference: '',
    dateOfIncident: '',
    amount: '',
    whatHappened: '',
    outcome: '',
    contactedCompany: '',
    preferredContact: '',
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [caseReference, setCaseReference] = useState<string>('');
  const [deliveryWarning, setDeliveryWarning] = useState(false);
  const [companySuggestions, setCompanySuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Load saved form data from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('complaintBridgeForm');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
      const savedRef = sessionStorage.getItem('complaintBridgeCaseReference');
      if (savedRef) {
        setCaseReference(savedRef);
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save form data to sessionStorage on change
  useEffect(() => {
    try {
      sessionStorage.setItem('complaintBridgeForm', JSON.stringify(formData));
    } catch {
      // Ignore storage errors
    }
  }, [formData]);

  // Update company suggestions when industry changes
  useEffect(() => {
    if (formData.industry) {
      const industry = industries.find((i) => i.value === formData.industry);
      if (industry) {
        setCompanySuggestions(industry.companies);
      }
    } else {
      setCompanySuggestions([]);
    }
    setFormData((prev) => ({ ...prev, company: '' }));
  }, [formData.industry]);

  // Filter suggestions based on input
  const filteredSuggestions = companySuggestions.filter((company) =>
    company.toLowerCase().includes(formData.company.toLowerCase())
  );

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-()]{7,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.country) {
      newErrors.country = 'Country is required';
    }

    if (!formData.industry) {
      newErrors.industry = 'Industry is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Which company is your complaint about? is required';
    }

    if (!formData.reference.trim()) {
      newErrors.reference = 'Order/Booking/Voucher reference is required';
    }

    if (!formData.dateOfIncident) {
      newErrors.dateOfIncident = 'Date of incident is required';
    } else {
      const selectedDate = new Date(formData.dateOfIncident);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      if (selectedDate > today) {
        newErrors.dateOfIncident = 'Date cannot be in the future';
      }
    }

    if (!formData.whatHappened.trim()) {
      newErrors.whatHappened = 'What happened is required';
    } else if (formData.whatHappened.trim().length < 40) {
      newErrors.whatHappened = 'Please provide at least 40 characters';
    }

    if (!formData.outcome) {
      newErrors.outcome = 'Outcome sought is required';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must agree to be contacted';
    }

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate();
    if (newErrors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setDeliveryWarning(false);

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Generate case reference: CB-YYMM-XXXXX
    const now = new Date();
    const year = String(now.getFullYear()).slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const randomNum = crypto.getRandomValues(new Uint32Array(1))[0] % 100000;
    const reference = `CB-${year}${month}-${String(randomNum).padStart(5, '0')}`;
    setCaseReference(reference);

    // Save reference to sessionStorage
    try {
      sessionStorage.setItem('complaintBridgeCaseReference', reference);
    } catch {
      // Ignore storage errors
    }

    // Prepare payload
    const payload = {
      ...formData,
      caseReference: reference,
      timestamp: new Date().toISOString(),
      sourceUrl: window.location.href,
    };

    // Try to send to backend
    let success = false;
    try {
      if (FORM_ENDPOINT === 'YOUR_BACKEND_ENDPOINT_HERE') {
        // Fallback: use mailto
        const mailtoLink = `mailto:${FORM_EMAIL}?subject=New Complaint - ${reference}&body=${encodeURIComponent(JSON.stringify(payload, null, 2))}`;
        window.location.href = mailtoLink;
        // Don't navigate away - show success screen anyway
        success = true;
      } else {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          success = true;
        }
      }
    } catch {
      // Backend call failed - still show success screen
      setDeliveryWarning(true);
      success = true;
    }

    if (success) {
      setIsSuccess(true);
      // Clear saved form data
      try {
        sessionStorage.removeItem('complaintBridgeForm');
      } catch {
        // Ignore
      }
    }

    setIsSubmitting(false);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      country: '',
      industry: '',
      company: '',
      companyWebsite: '',
      reference: '',
      dateOfIncident: '',
      amount: '',
      whatHappened: '',
      outcome: '',
      contactedCompany: '',
      preferredContact: '',
      consent: false,
    });
    setErrors({});
    setTouched({});
    setIsSuccess(false);
    setCaseReference('');
    setDeliveryWarning(false);
    setCompanySuggestions([]);
    setShowSuggestions(false);
    try {
      sessionStorage.removeItem('complaintBridgeForm');
      sessionStorage.removeItem('complaintBridgeCaseReference');
    } catch {
      // Ignore
    }
  };

  const copyReference = () => {
    navigator.clipboard.writeText(caseReference).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = caseReference;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    });
  };

  if (isSuccess) {
    return (
      <div className="rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0D9488]/10 text-[#0D9488]">
            <CheckCircle className="h-8 w-8" aria-hidden="true" />
          </div>
          <h3 className="text-2xl font-bold text-[#1E3A5F]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Complaint Submitted Successfully
          </h3>
          <p className="mt-2 text-[#4B5563]">
            Thank you, {formData.fullName}. Your complaint against {formData.company} has been received.
          </p>

          <div className="mx-auto mt-6 max-w-sm rounded-lg border-2 border-[#0D9488] bg-[#F0FDFA] p-4">
            <p className="text-sm font-medium text-[#0D9488]">Your Case Reference</p>
            <p className="mt-1 text-2xl font-bold text-[#1E3A5F]">{caseReference}</p>
            <button
              type="button"
              onClick={copyReference}
              className="mt-3 rounded-lg bg-[#0D9488] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0A7A70]"
            >
              Copy Reference
            </button>
          </div>

          <div className="mt-6 grid gap-4 text-left sm:grid-cols-2">
            <div className="rounded-lg bg-[#FAFAFA] p-4">
              <p className="text-sm font-medium text-[#6B7280]">Company</p>
              <p className="mt-1 font-semibold text-[#1E3A5F]">{formData.company}</p>
            </div>
            <div className="rounded-lg bg-[#FAFAFA] p-4">
              <p className="text-sm font-medium text-[#6B7280]">Category</p>
              <p className="mt-1 font-semibold text-[#1E3A5F]">{formData.industry}</p>
            </div>
            <div className="rounded-lg bg-[#FAFAFA] p-4">
              <p className="text-sm font-medium text-[#6B7280]">Date of Incident</p>
              <p className="mt-1 font-semibold text-[#1E3A5F]">{formData.dateOfIncident}</p>
            </div>
            <div className="rounded-lg bg-[#FAFAFA] p-4">
              <p className="text-sm font-medium text-[#6B7280]">Outcome Sought</p>
              <p className="mt-1 font-semibold text-[#1E3A5F]">{formData.outcome}</p>
            </div>
          </div>

          {deliveryWarning && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-[#FEF3C7] p-4 text-left">
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-[#F59E0B]" aria-hidden="true" />
              <p className="text-sm text-[#92400E]">
                We couldn't confirm delivery — please screenshot this reference for your records.
              </p>
            </div>
          )}

          <p className="mt-4 text-sm text-[#6B7280]">
            Please save this reference. You'll need it to track your complaint.
          </p>
          <p className="mt-1 text-sm text-[#6B7280]">
            Questions? Call <a href="tel:+447853169761" className="font-semibold text-[#0D9488] hover:underline">+44 7853 169761</a> or{' '}
            <a href="https://wa.me/447853169761" target="_blank" rel="noreferrer" className="font-semibold text-[#0D9488] hover:underline">
              WhatsApp us
            </a>.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg bg-[#1E3A5F] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#152A44]"
            >
              Submit Another Complaint
            </button>
            <a href="#home" className="rounded-lg border-2 border-[#1E3A5F] px-6 py-3 font-semibold text-[#1E3A5F] transition-colors hover:bg-[#1E3A5F] hover:text-white">
              Close
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="submit" className="section-padding bg-[#FAFAFA]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1E3A5F] sm:text-4xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Submit a Complaint
          </h2>
          <p className="mt-4 text-lg text-[#4B5563]">
            Fill out the form below and we'll get your complaint routed to the right place.
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-12 space-y-6" noValidate>
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-[#1F2937]">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input-field mt-1 ${errors.fullName && touched.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              placeholder="John Smith"
              required
            />
            {errors.fullName && touched.fullName && (
              <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1F2937]">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input-field mt-1 ${errors.email && touched.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              placeholder="john@example.com"
              required
            />
            {errors.email && touched.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#1F2937]">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input-field mt-1 ${errors.phone && touched.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              placeholder="e.g., +44 7853 169761"
              required
            />
            {errors.phone && touched.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-[#1F2937]">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`select-field mt-1 ${errors.country && touched.country ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              required
            >
              <option value="">Select your country</option>
              {countries.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            {errors.country && touched.country && (
              <p className="mt-1 text-sm text-red-500">{errors.country}</p>
            )}
          </div>

          {/* Industry */}
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-[#1F2937]">
              Industry / Category <span className="text-red-500">*</span>
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`select-field mt-1 ${errors.industry && touched.industry ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              required
            >
              <option value="">Select an industry</option>
              {industries.map((i) => (
                <option key={i.value} value={i.value}>
                  {i.label}
                </option>
              ))}
            </select>
            {errors.industry && touched.industry && (
              <p className="mt-1 text-sm text-red-500">{errors.industry}</p>
            )}
          </div>

          {/* Company */}
          <div className="relative">
            <label htmlFor="company" className="block text-sm font-medium text-[#1F2937]">
              Which company is your complaint about? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={() => setShowSuggestions(true)}
              className={`input-field mt-1 ${errors.company && touched.company ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              placeholder="Start typing company name..."
              required
              autoComplete="off"
            />
            {showSuggestions && filteredSuggestions.length > 0 && (
              <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-[#E5E7EB] bg-white shadow-lg">
                {filteredSuggestions.map((company) => (
                  <li
                    key={company}
                    className="cursor-pointer px-4 py-2 text-sm text-[#1F2937] hover:bg-[#FAFAFA]"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, company }));
                      setShowSuggestions(false);
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {company}
                  </li>
                ))}
              </ul>
            )}
            {errors.company && touched.company && (
              <p className="mt-1 text-sm text-red-500">{errors.company}</p>
            )}
          </div>

          {/* Company Website */}
          <div>
            <label htmlFor="companyWebsite" className="block text-sm font-medium text-[#1F2937]">
              Company website or contact page <span className="text-[#6B7280]">(optional)</span>
            </label>
            <input
              type="url"
              id="companyWebsite"
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleChange}
              className="input-field mt-1"
              placeholder="https://example.com/contact"
            />
          </div>

          {/* Reference */}
          <div>
            <label htmlFor="reference" className="block text-sm font-medium text-[#1F2937]">
              Order / Booking / Voucher Reference <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="reference"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input-field mt-1 ${errors.reference && touched.reference ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              placeholder="e.g., ABC-123456"
              required
            />
            {errors.reference && touched.reference && (
              <p className="mt-1 text-sm text-red-500">{errors.reference}</p>
            )}
          </div>

          {/* Date of Incident */}
          <div>
            <label htmlFor="dateOfIncident" className="block text-sm font-medium text-[#1F2937]">
              Date of Incident <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="dateOfIncident"
              name="dateOfIncident"
              value={formData.dateOfIncident}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input-field mt-1 ${errors.dateOfIncident && touched.dateOfIncident ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              required
            />
            {errors.dateOfIncident && touched.dateOfIncident && (
              <p className="mt-1 text-sm text-red-500">{errors.dateOfIncident}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-[#1F2937]">
              Amount involved <span className="text-[#6B7280]">(optional)</span>
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="input-field mt-1"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>

          {/* What happened */}
          <div>
            <label htmlFor="whatHappened" className="block text-sm font-medium text-[#1F2937]">
              What happened? <span className="text-red-500">*</span>
            </label>
            <textarea
              id="whatHappened"
              name="whatHappened"
              value={formData.whatHappened}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`textarea-field mt-1 ${errors.whatHappened && touched.whatHappened ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              placeholder="Please describe what happened in detail (minimum 40 characters)..."
              required
              minLength={40}
            />
            <p className="mt-1 text-xs text-[#6B7280]">
              {formData.whatHappened.trim().length}/40 characters
            </p>
            {errors.whatHappened && touched.whatHappened && (
              <p className="mt-1 text-sm text-red-500">{errors.whatHappened}</p>
            )}
          </div>

          {/* Outcome */}
          <div>
            <label htmlFor="outcome" className="block text-sm font-medium text-[#1F2937]">
              What outcome are you seeking? <span className="text-red-500">*</span>
            </label>
            <select
              id="outcome"
              name="outcome"
              value={formData.outcome}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`select-field mt-1 ${errors.outcome && touched.outcome ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              required
            >
              <option value="">Select an outcome</option>
              {outcomes.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            {errors.outcome && touched.outcome && (
              <p className="mt-1 text-sm text-red-500">{errors.outcome}</p>
            )}
          </div>

          {/* Contacted Company */}
          <div>
            <label className="block text-sm font-medium text-[#1F2937]">
              Have you already contacted the company? <span className="text-red-500">*</span>
            </label>
            <div className="mt-2 flex flex-wrap gap-4">
              {contactStatuses.map((s) => (
                <label key={s.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="contactedCompany"
                    value={s.value}
                    checked={formData.contactedCompany === s.value}
                    onChange={handleChange}
                    className="radio-field"
                    required
                  />
                  <span className="text-sm text-[#1F2937]">{s.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Preferred Contact Method */}
          <div>
            <label className="block text-sm font-medium text-[#1F2937]">
              Preferred Contact Method <span className="text-red-500">*</span>
            </label>
            <div className="mt-2 flex flex-wrap gap-4">
              {contactMethods.map((m) => (
                <label key={m.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="preferredContact"
                    value={m.value}
                    checked={formData.preferredContact === m.value}
                    onChange={handleChange}
                    className="radio-field"
                    required
                  />
                  <span className="text-sm text-[#1F2937]">{m.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Consent */}
          <div>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                onBlur={handleBlur}
                className="checkbox-field mt-1"
                required
              />
              <span className="text-sm text-[#1F2937]">
                I confirm the information provided is accurate and I agree to be contacted about this complaint.{' '}
                <span className="text-red-500">*</span>
              </span>
            </label>
            {errors.consent && touched.consent && (
              <p className="mt-1 text-sm text-red-500">{errors.consent}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[#0D9488] px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#0A7A70] disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>
      </div>
    </section>
  );
}