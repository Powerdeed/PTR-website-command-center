export default function Title({ title }: { title: string }) {
  return <div>{title}</div>;
}

export function SubTitle({ subtitle }: { subtitle: string }) {
  return <div className="text-style__big-text">{subtitle}</div>;
}
