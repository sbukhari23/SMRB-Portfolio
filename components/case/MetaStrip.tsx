export function MetaStrip({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1.5 bg-paper px-[18px] py-4">
          <span className="text-xs uppercase tracking-[0.06em] text-muted">{item.label}</span>
          <span className="text-[15px]">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
