export default function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <div className="text-style__heading">{title}</div>
      <div className="text-style__body">{subtitle}</div>
    </div>
  );
}
