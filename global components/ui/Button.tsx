"use client";

import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome/dist";

export default function Button({
  buttonText,
  clickAction,
  type = "button",
  className = "",
  children,
  disabled,
}: {
  buttonText: string;
  clickAction?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      className={`bg-(--primary-blue) py-3 px-4 rounded-[10px] text-white hover:bg-(--secondary-blue) duration-300 text-style__small-text cursor-pointer ${className}`}
      onClick={clickAction}
      disabled={disabled}
    >
      <div className={children ? "flex items-center" : ""}>
        <div className="flex-1">{buttonText}</div>
        {children}
      </div>
    </button>
  );
}

export function ButtonLight({
  buttonText,
  clickAction,
  icon,
}: {
  buttonText: string;
  clickAction: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      className="border border-(--secondary-blue) py-2.75 px-4 rounded-[10px] text-(--primary-blue) bg-white hover:bg-(--terciary-grey)/40 duration-300 text-style__small-text cursor-pointer"
      onClick={clickAction}
    >
      <div className={icon ? "flex items-center" : ""}>
        {icon}
        {buttonText}
      </div>
    </button>
  );
}

export function ButtonRed({
  buttonText,
  clickAction,
}: {
  buttonText: string;
  clickAction: () => void;
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

export function DeleteIconBtn({ deleteFunc }: { deleteFunc: () => void }) {
  return (
    <div className="text-(--secondary-red) cursor-pointer" onClick={deleteFunc}>
      <FontAwesomeIcon icon={["far", "trash-can"]} />
    </div>
  );
}

export function UploadIconBtn({ uploadFunc }: { uploadFunc: () => void }) {
  return (
    <div
      className="py-1.5 px-2 h border border-(--secondary-grey) bg-white rounded-[10px] w-fit hover:bg-(--terciary-grey)/30 duration-100"
      onClick={uploadFunc}
    >
      <FontAwesomeIcon icon={["fas", "arrow-up-from-bracket"]} />
    </div>
  );
}
