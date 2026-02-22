export default function Button({ buttonText }: { buttonText: string }) {
  return (
    <button className="bg-(--primary-blue) py-3 px-4 rounded-[10px] text-white text-style__small-text cursor-pointer">
      {buttonText}
    </button>
  );
}
