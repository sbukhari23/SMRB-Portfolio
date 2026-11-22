import type { Metadata } from "next";

// Hidden route: dev-only mirror of docs/redesign/mockups/Style-Guide.html.
// Excluded from the sitemap once Phase 8 adds one; noindex here in the meantime.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function StyleguideLayout({ children }: LayoutProps<"/styleguide">) {
  return children;
}
