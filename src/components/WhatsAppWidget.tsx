import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export function WhatsAppWidget() {
  return (
    <a
      href={siteConfig.socialLinks.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-40 inline-flex size-12 items-center justify-center rounded-full bg-[#25D366] text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#20bd5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 sm:h-12 sm:w-auto sm:gap-2 sm:px-4"
    >
      <MessageCircle aria-hidden="true" className="size-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
