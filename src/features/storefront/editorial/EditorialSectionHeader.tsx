type EditorialSectionHeaderProps = {
  title: string;
  meta: string;
};

export function EditorialSectionHeader({
  title,
  meta,
}: EditorialSectionHeaderProps) {
  return (
    <header className="editorial-section-header">
      <h2>{title}</h2>
      <span aria-hidden="true" />
      <p>{meta}</p>
    </header>
  );
}
