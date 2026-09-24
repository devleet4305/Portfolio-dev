import { ExternalLink, FileText } from "lucide-react";

const RESUME_FOLDER_LINK =
  "https://drive.google.com/drive/folders/1byP3BOy0twDdDldxLpF1zQalDU9fe_NX?usp=drive_link";

export function ResumeSection() {
  return (
    <section
      id="resume"
      className="py-16 sm:py-24 w-full max-w-6xl mx-auto px-4 sm:px-6"
    >
      <div className="max-w-3xl mx-auto rounded-2xl border border-border/70 bg-card/70 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileText className="size-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-2">
              Tailored resumes
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
              Find the right version for the role
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Browse my tailored resumes and choose the version that best matches your opportunity.
            </p>
          </div>
        </div>

        <a
          href={RESUME_FOLDER_LINK}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Open resumes
          <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}