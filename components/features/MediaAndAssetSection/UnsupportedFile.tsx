"use client";

import Button from "@components/ui/Button";
import { Dispatch, SetStateAction } from "react";

type UnsupportedFileProps = {
  setFile: Dispatch<SetStateAction<File | null>>;
  setFileName: Dispatch<SetStateAction<string>>;
};

export default function UnsupportedFile(props: UnsupportedFileProps) {
  return (
    <div className="feature-container-vertical h-80 grid items-center justify-center text-style__body text-center">
      {`Only: ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".avif", ".svg", ".pdf", ".docx", ".doc" and ".csv" are supported`}

      <Button
        buttonText="Re-upload file"
        clickAction={() => {
          props.setFile(null);
          props.setFileName("");
        }}
      />
    </div>
  );
}
