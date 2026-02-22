export default function ButtonLight({ buttonText }: { buttonText: string }) {
  return (
    <button className="border border-(--primary-blue) py-3 px-4 rounded-[10px] text-(--primary-blue) text-style__small-text cursor-pointer">
      {buttonText}
    </button>
  );
}
