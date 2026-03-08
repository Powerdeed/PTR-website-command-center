import { SubTitle } from "@components/ui/Title";

export default function FormWrapper({
  keyVal,
  subtitle,
  subtitleChildren,
  children,
}: {
  keyVal?: number | string;
  subtitle: string;
  subtitleChildren?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div key={keyVal} className="vertical-layout__outer">
      <div
        className={`${subtitleChildren ? "flex gap-2.5 items-center" : "vertical-layout__inner"}`}
      >
        <div className="flex-1">
          <SubTitle subtitle={subtitle} />
        </div>

        {subtitleChildren ? subtitleChildren : <SeparatorLine />}
      </div>

      {children}
    </div>
  );
}

export function InputArea({
  keyVal,
  label,
  val,
  changeFunc,
  children,
}: {
  keyVal?: number | string;
  label: string;
  val: string;
  changeFunc: (val: string) => void;
  children?: React.ReactNode;
}) {
  return (
    <div key={keyVal} className="flex-1 vertical-layout__inner w-full">
      {label}

      <div className={`${children && "flex gap-2.5 items-center"} w-full`}>
        <textarea
          className="flex-1 w-full input-style field-sizing-content"
          value={val}
          onChange={(e) => changeFunc(e.target.value)}
        />

        {children}
      </div>
    </div>
  );
}

export function SeparatorLine() {
  return <hr className="border-t border-(--terciary-grey)" />;
}
