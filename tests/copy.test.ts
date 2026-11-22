import { describe, expect, it } from "vitest";
import * as profile from "../content/profile";
import { chapters, footerLine } from "../content/chapters";
import { projects } from "../content/projects";

const EM_DASH = "—";

// Catches a run of digits that reads like a phone number (10+ digits,
// optionally grouped with spaces or dashes), while leaving numbers like
// "300+", "2023" or "15 days" and mixed-character credential IDs alone.
const PHONE_LIKE = /\d[\d\s-]{8,}\d/;

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") {
    out.push(value);
  } else if (Array.isArray(value)) {
    value.forEach((v) => collectStrings(v, out));
  } else if (value && typeof value === "object") {
    Object.values(value).forEach((v) => collectStrings(v, out));
  }
  return out;
}

const allStrings = [
  ...collectStrings(profile),
  ...collectStrings(chapters),
  ...collectStrings(projects),
  footerLine,
];

describe("site copy", () => {
  it("never uses an em dash", () => {
    const offenders = allStrings.filter((s) => s.includes(EM_DASH));
    expect(offenders).toEqual([]);
  });

  it("never contains a phone-number-like digit run", () => {
    const offenders = allStrings.filter((s) => PHONE_LIKE.test(s));
    expect(offenders).toEqual([]);
  });
});
