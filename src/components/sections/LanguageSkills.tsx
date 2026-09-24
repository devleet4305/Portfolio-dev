import { ExternalLink, Languages } from "lucide-react";

const LANGUAGE_SKILLS = [
  {
    name: "Bengali",
    level: "Native",
    detail: "Native proficiency",
  },
  {
    name: "English",
    level: "Professional",
    detail: "Professional working proficiency",
  },
];

const IELTS_SCORE_LINK =
  "https://drive.google.com/file/d/1Y5FSrZurix0wuC36i8c16dOYeJSsWbmc/view?usp=drive_link";

export function LanguageSkills() {
  return (
    <section
      id="language-skills"
      className="py-16 sm:py-24 w-full max-w-6xl mx-auto px-4 sm:px-6"
    >
      <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-5">
          <Languages className="size-6" aria-hidden="true" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
          Language Skills
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Clear communication across local and international teams.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {LANGUAGE_SKILLS.map((language) => (
          <div
            key={language.name}
            className="p-5 sm:p-6 rounded-xl border border-border/70 bg-card/70 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <h3 className="text-lg font-bold text-foreground">{language.name}</h3>
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                {language.level}
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden mb-3">
              <div className="h-full w-full rounded-full bg-primary" />
            </div>
            <p className="text-sm text-muted-foreground">{language.detail}</p>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto mt-4">
        <a
          href={IELTS_SCORE_LINK}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between gap-4 p-5 rounded-xl border border-primary/30 bg-primary/5 text-foreground transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span>
            <span className="block font-bold">IELTS overall score: 7.5</span>
            <span className="block text-sm text-muted-foreground mt-1">
              View the supporting score document
            </span>
          </span>
          <ExternalLink className="size-5 shrink-0 text-primary" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}