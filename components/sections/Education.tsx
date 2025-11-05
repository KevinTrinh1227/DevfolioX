// components/sections/Education.tsx
import { education } from "../../config/education";
import { MapPin, Calendar } from "lucide-react";

export function EducationSection() {
  if (!education.length) return null;

  return (
    <section id="education" className="py-16 scroll-mt-12">
      <div className="mx-auto w-full max-w-5xl px-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          ~/Education
        </h2>

        <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">
          Where I&apos;ve been studying.
        </h3>

        <div className="mt-8 space-y-4">
          {education.map((item) => {
            const cleanGpa = item.gpa ? item.gpa.split("/")[0].trim() : null;

            const courseworkText =
              item.coursework && item.coursework.length > 0
                ? item.coursework.join(", ")
                : "";

            const activitiesText =
              item.activities && item.activities.length > 0
                ? item.activities.join(", ")
                : "";

            const hasStartOrEnd = Boolean(item.start || item.end);

            return (
              <article
                key={item.id}
                className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-muted-foreground sm:text-base"
              >
                {/* Top row: school (left) + dates/location (right) */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground sm:text-xl">
                      {item.school}
                    </h4>
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      {item.degree}
                      {item.major ? ` · ${item.major}` : ""}
                      {item.minor ? ` · Minor in ${item.minor}` : ""}
                    </p>
                    {cleanGpa && (
                      <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        GPA: {cleanGpa}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-start gap-1 text-xs text-muted-foreground sm:items-end sm:text-sm">
                    {hasStartOrEnd && (
                      <div className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>
                          {item.start &&
                            item.end &&
                            `${item.start} — ${item.end}`}
                          {item.start && !item.end && item.start}
                          {!item.start && item.end && item.end}
                          {item.expectedGraduation &&
                            ` · Expected ${item.expectedGraduation}`}
                        </span>
                      </div>
                    )}

                    {!hasStartOrEnd && item.expectedGraduation && (
                      <div className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>
                          Expected Graduation: {item.expectedGraduation}
                        </span>
                      </div>
                    )}

                    {item.location && (
                      <div className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom: activities first, then coursework, both inline text */}
                <div className="mt-4 space-y-2 text-xs text-muted-foreground sm:text-sm">
                  {activitiesText && (
                    <p>
                      <span className="font-medium text-foreground">
                        Societies & activities:
                      </span>{" "}
                      {activitiesText}
                    </p>
                  )}

                  {courseworkText && (
                    <p>
                      <span className="font-medium text-foreground">
                        Relevant coursework:
                      </span>{" "}
                      {courseworkText}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
