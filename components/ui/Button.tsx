export default function Button({
  buttonText,
  clickAction,
}: {
  buttonText: string;
  clickAction: (args: unknown) => void;
}) {
  return (
    <button
      className="bg-(--primary-blue) py-3 px-4 rounded-[10px] text-white text-style__small-text cursor-pointer"
      onClick={clickAction}
    >
      {buttonText}
    </button>
  );
}

export function ButtonLight({
  buttonText,
  clickAction,
}: {
  buttonText: string;
  clickAction: (args: unknown) => void;
}) {
  return (
    <button
      className="border border-(--primary-blue) py-2.75 px-4 rounded-[10px] text-(--primary-blue) text-style__small-text cursor-pointer"
      onClick={clickAction}
    >
      {buttonText}
    </button>
  );
}

export function ButtonRed({
  buttonText,
  clickAction,
}: {
  buttonText: string;
  clickAction: (args: unknown) => void;
}) {
  return (
    <button
      className="bg-(--primary-red) py-3 px-4 rounded-[10px] text-white text-style__small-text cursor-pointer"
      onClick={clickAction}
    >
      {buttonText}
    </button>
  );
}
