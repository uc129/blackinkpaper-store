import { FrostedToolbar } from "@/components/_ui/interactive/artwork-controls";

const assurances = [
  {
    label: "Edition",
    value: "One drawing, one owner",
  },
  {
    label: "Provenance",
    value: "Artwork details documented",
  },
  {
    label: "Delivery",
    value: "Protected and tracked",
  },
];

export function OriginalsAssurance() {
  return (
    <div className="originals-assurance-grid gap-4">
      {assurances.map((assurance) => (
        <FrostedToolbar
          key={assurance.label}
          className="min-h-20 rounded-[10px] px-5"
        >
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {assurance.label}
            </p>
            <p className="mt-1 text-sm text-[var(--ink)]">{assurance.value}</p>
          </div>
        </FrostedToolbar>
      ))}
    </div>
  );
}
