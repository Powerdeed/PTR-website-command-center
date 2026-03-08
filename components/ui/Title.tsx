export default function Title({ title }: { title: string }) {
  return <div>{title}</div>;
}

export function SubTitle({ subtitle }: { subtitle: string }) {
  return <div className="text-style__big-text">{subtitle}</div>;
}

export function SectionTitle({
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
