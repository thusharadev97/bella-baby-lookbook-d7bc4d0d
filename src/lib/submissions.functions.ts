import { createServerFn } from "@tanstack/start";

export const STATUS_LABEL: Record<string, string> = {
  draft: "Draft",
  submitted: "Submitted",
  approved: "Approved",
  rejected: "Rejected",
};

export function parseBacklinks(text: string): string[] {
  if (!text) return [];
  return text
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export const getMyEditorialAccess = createServerFn({ method: "GET" }).handler(
  async () => {
    return { hasAccess: true };
  }
);

export const listMySubmissions = createServerFn({ method: "GET" }).handler(
  async () => {
    return [];
  }
);

export const listSubmissionQueue = createServerFn({ method: "GET" }).handler(
  async () => {
    return [];
  }
);

export const saveSubmission = createServerFn({ method: "POST" })
  .validator((d: unknown) => d)
  .handler(async ({ data }) => {
    return { success: true, data };
  });

export const decideSubmission = createServerFn({ method: "POST" })
  .validator((d: unknown) => d)
  .handler(async ({ data }) => {
    return { success: true, data };
  });

export const createSubmission = saveSubmission;
