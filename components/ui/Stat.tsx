import clsx from "clsx";

export function Stat({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      <span className="font-serif text-[46px] leading-none">{value}</span>
      <span className="text-[13px] text-muted">{label}</span>
    </div>
  );
}
