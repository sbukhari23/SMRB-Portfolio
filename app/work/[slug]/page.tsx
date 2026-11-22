import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/content/projects";
import { CaseStudyView } from "@/components/case/CaseStudyView";
import { withBase } from "@/lib/withBase";

const siteOrigin = "https://sbukhari23.github.io";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: {
      // Trailing slash to match next.config.ts's trailingSlash: true output.
      canonical: `${siteOrigin}${withBase(`/work/${project.slug}/`)}`,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <CaseStudyView project={project} />;
}
