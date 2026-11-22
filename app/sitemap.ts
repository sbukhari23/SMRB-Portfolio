import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { withBase } from "@/lib/withBase";

// Required for `output: export`: without it, Next treats this route as
// dynamic (because of `new Date()` below) and the static export fails.
export const dynamic = "force-static";

const siteOrigin = "https://sbukhari23.github.io";

// /styleguide is deliberately left out: it's noindex'd (app/styleguide/layout.tsx)
// and not a real page of the site.
export default function sitemap(): MetadataRoute.Sitemap {
  const urls = ["/", ...projects.map((project) => `/work/${project.slug}/`)];
  return urls.map((path) => ({
    url: `${siteOrigin}${withBase(path)}`,
    lastModified: new Date(),
  }));
}
