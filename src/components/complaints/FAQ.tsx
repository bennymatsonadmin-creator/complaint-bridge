import { ChevronDown } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is ComplaintBridge free to use?",
    answer:
      "Yes, ComplaintBridge is completely free to use. There are no hidden fees or charges for submitting a complaint.",
  },
  {
    question: "Which companies can I complain about?",
    answer:
      "You can file a complaint against any company across industries including airlines, clothing brands, retailers, voucher providers, travel companies, electronics manufacturers, delivery services, and utilities.",
  },
  {
    question: "How long does it take to get a response?",
    answer:
      "Response times vary by company and industry. Most companies respond within 7-14 business days. We recommend allowing at least 2 weeks before following up.",
  },
  {
    question: "What is my case reference used for?",
    answer:
      "Your case reference (e.g., CB-2609-48213) is a unique identifier for your complaint. Keep it safe to track your complaint status and reference it in all communications.",
  },
  {
    question: "Can I track my complaint?",
    answer:
      "Yes, you can track your complaint using your case reference. Contact us with your reference number to check the status of your complaint.",
  },
  {
    question: "What if I don't know the company's contact details?",
    answer:
      "That's fine. We can help route your complaint even if you don't have the company's direct contact details. Just provide as much information as you can.",
  },
  {
    question: "Does ComplaintBridge guarantee a refund or resolution?",
    answer:
      "No, ComplaintBridge does not guarantee a refund or resolution. We are an independent platform that helps you file complaints. The outcome depends on the company's response and applicable consumer protection laws.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl font-Poppins">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about our complaint resolution service.
          </p>
        </div>

        <Accordion type="single" className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={faq.question}>
              <AccordionTrigger className="w-full flex justify-between items-center p-4 text-left border-b">
                <div className="flex-1 text-lg font-medium text-gray-900 font-Poppins">
                  {faq.question}
                </div>
                <ChevronDown className="h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200" />
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600 py-4">
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}