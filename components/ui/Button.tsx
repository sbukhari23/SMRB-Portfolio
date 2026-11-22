import clsx from "clsx";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "ink" | "outline" | "emerald";

const base =
  "group inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full px-[18px] text-[15px] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald";

const variantClasses: Record<ButtonVariant, string> = {
  emerald: "bg-emerald font-semibold text-white hover:bg-emerald-dark",
  ink: "bg-ink font-semibold text-white hover:bg-ink/90",
  outline: "border border-line bg-white font-medium text-ink hover:border-emerald/50",
};

type BaseProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  /** Trailing arrow that nudges 3px right on hover, per ANIMATION_SPEC.md §3. */
  arrow?: "internal" | "external" | "none";
};

type LinkProps = BaseProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href">;

type ButtonElementProps = BaseProps & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button(props: LinkProps | ButtonElementProps) {
  const { variant = "outline", className, children, arrow = "none", href, ...rest } = props;
  const classes = clsx(base, variantClasses[variant], className);

  const arrowIcon =
    arrow === "none" ? null : arrow === "external" ? (
      <ArrowUpRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-[3px] group-hover:-translate-y-[1px]"
      />
    ) : (
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-[3px]"
      />
    );

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
          {arrowIcon}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={classes}
        // The static export doesn't serve the RSC prefetch payload for
        // dynamic routes (404s harmlessly on every /work/[slug] link), so
        // skip prefetching those rather than spam the console.
        prefetch={href.startsWith("/work/") ? false : undefined}
        {...(rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">)}
      >
        {children}
        {arrowIcon}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      {arrowIcon}
    </button>
  );
}
