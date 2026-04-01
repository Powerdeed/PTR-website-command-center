export default function FormField({
  txttype,
  label,
  val,
  changeFunc,
  styling,
}: {
  txttype: string;
  label: string;
  val: string;
  changeFunc: (val: string) => void;
  styling: string;
}) {
  return (
    <div
      className={`${styling === "defaultStyle" ? "flex-1 vertical-layout__inner" : styling}`}
    >
      {label}

      <input
        type={txttype}
        className="flex-1 input-style"
        value={val}
        onChange={(e) => changeFunc(e.target.value)}
      />
    </div>
  );
}
