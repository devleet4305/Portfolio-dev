"use client";

import { useGSAP } from "@gsap/react";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";
import { Calendar, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { siteConfig } from "@/config/site";

// Form validation schema using Zod
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      return /^[+]?[0-9\s-]{6,15}$/.test(val);
    }, "Invalid phone number format."),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactSectionProps {
  showBorder?: boolean;
}

export function ContactSection({ showBorder = true }: ContactSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  // Entrance stagger animations using GSAP
  useGSAP(
    () => {
      // Stagger items inside the contact section
      gsap.fromTo(
        ".animate-contact-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
      );
    },
    { scope: containerRef },
  );

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully!");
        reset();
      } else {
        toast.error(result.error || "Failed to send message.");
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className={`section-shell relative overflow-hidden bg-background contact-grid ${
        showBorder ? "border-t border-border/20" : ""
      }`}
    >
      <div className="site-container space-y-12">
        {/* Section Header */}
        <div className="space-y-4 text-center">
          <p className="animate-contact-item eyebrow">Let&apos;s work together</p>
          <h2 className="animate-contact-item section-title">
            Get In Touch
          </h2>
          <p className="animate-contact-item section-copy mx-auto">
            Have a project in mind or want to discuss a potential collaboration?
            Feel free to drop a message.
          </p>
        </div>

        {/* Contact Container Grid */}
        <div className="grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Left Column: Contact Details */}
          <div className="surface animate-contact-item flex flex-col justify-between gap-8 lg:col-span-5">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-foreground">
                Contact Information
              </h3>
              <p className="text-sm text-muted-foreground">
                Reach out directly via phone or email, or drop by for a chat if
                you&apos;re in the city.
              </p>

              {/* Info Stack */}
              <div className="space-y-4">
                {/* Phone */}
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="group flex items-center gap-4 rounded-lg border border-border/60 bg-background px-3 py-3 transition-colors hover:border-primary/50"
                >
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">
                      Phone
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      {siteConfig.phone}
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-center gap-4 rounded-lg border border-border/60 bg-background px-3 py-3 transition-colors hover:border-primary/50"
                >
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">
                      Email
                    </p>
                    <p className="text-sm font-bold text-foreground truncate max-w-full">
                      {siteConfig.email}
                    </p>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-center gap-4 p-3 rounded-xl border border-border/30 bg-background/40 group">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">
                      Location
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      {siteConfig.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact CTA */}
            <div className="pt-4 border-t border-border/30">
              <a
                href={siteConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary w-full sm:w-fit"
              >
                <Calendar className="size-4" />
                Connect on LinkedIn
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="surface animate-contact-item flex flex-col justify-between gap-5 lg:col-span-7"
          >
            <h3 className="text-xl font-bold text-foreground">
              Send a Message
            </h3>

            {/* Inputs Stagger Container */}
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Name */}
                <div className="space-y-1">
                  <label
                    htmlFor="name"
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form-field"
                    disabled={isSubmitting}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-xs font-medium text-destructive mt-0.5">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-field"
                    disabled={isSubmitting}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs font-medium text-destructive mt-0.5">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Phone */}
                <div className="space-y-1">
                  <label
                    htmlFor="phone"
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    Phone (Optional)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="form-field"
                    disabled={isSubmitting}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-xs font-medium text-destructive mt-0.5">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label
                    htmlFor="subject"
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="form-field"
                    disabled={isSubmitting}
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p className="text-xs font-medium text-destructive mt-0.5">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label
                  htmlFor="message"
                  className="text-xs font-semibold text-muted-foreground"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="form-field min-h-32 resize-y"
                  disabled={isSubmitting}
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-xs font-medium text-destructive mt-0.5">
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="button-primary w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
