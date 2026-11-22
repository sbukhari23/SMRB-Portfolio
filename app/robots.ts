import type { MetadataRoute } from "next";
import { withBase } from "@/lib/withBase";

// Required for `output: export` (see app/sitemap.ts).
export const dynamic = "force-static";

const siteOrigin = "https://sbukhari23.github.io";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: withBase("/styleguide"),
      },
    ],
    sitemap: `${siteOrigin}${withBase("/sitemap.xml")}`,
  };
}
