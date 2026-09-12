import { CheckCircle2, Copy, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessScreenProps {
  name: string;
  company: string;
  caseReference: string;
  category: string;
  dateOfIncident: string;
  outcomeSought: string;
  onSubmitAnother: () => void;
}

export function SuccessScreen({
  name,
  company,
  caseReference,
  category,
  dateOfIncident,
  outcomeSought,
  onSubmitAnother,
}: SuccessScreenProps) {
  const copyReference = () => {
    navigator.clipboard.writeText(caseReference);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <CheckCircle2 className="h-20 w-20 text-teal" />
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl font-Poppins">
          Complaint Submitted Successfully
        </h2>
        <p className="mt-2 text-gray-600">
          Thank you, <strong>{name}</strong>. Your complaint against{" "}
          <strong>{company}</strong> has been received.
        </p>
      </div>

      <div className="rounded-xl border-2 border-teal bg-teal/5 p-6 text-center">
        <p className="text-sm font-medium text-gray-600">Your Case Reference</p>
        <div className="mt-2 flex items-center justify-center gap-3">
          <p className="text-2xl font-bold text-primary font-Poppins">
            {caseReference}
          </p>
          <Button
            variant="outline"
            size="icon"
            onClick={copyReference}
            aria-label="Copy case reference"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <p>
          <strong>Company:</strong> {company}
        </p>
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p>
          <strong>Date of Incident:</strong> {dateOfIncident}
        </p>
        <p>
          <strong>Outcome Sought:</strong> {outcomeSought}
        </p>
      </div>

      <div className="rounded-lg bg-amber/10 p-4 text-center text-sm text-gray-700">
        <p>
          <strong>Please save this reference.</strong> You'll need it to track your complaint.
        </p>
        <p className="mt-2">
          <strong>Manual Submission:</strong> If you don't receive confirmation within 5 minutes, please email your case reference to <a href="mailto:info@complaintbridge.website" className="font-medium underline">info@complaintbridge.website</a> with your complaint details.
        </p>
      </div>

      <div className="text-center text-sm text-gray-600">
        Questions?{" "}
        <a href="tel:+447727185736" className="font-medium text-primary underline">
          Call +44 7727 185736
        </a>{" "}
        or{" "}
        <a
          href="https://wa.me/447727185736"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-teal underline"
        >
          WhatsApp us
        </a>
        .
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={onSubmitAnother} className="bg-teal hover:bg-teal/90 text-white">
          Submit Another Complaint
        </Button>
        <Button variant="outline" asChild>
          <a href="#contact">Contact Us</a>
        </Button>
      </div>
    </div>
  );
}

export default SuccessScreen;
