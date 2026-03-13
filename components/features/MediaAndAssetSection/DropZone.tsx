"use client";

import { Dispatch, SetStateAction, useRef } from "react";
import {
  dragHandler,
  dragLeaveHandler,
  dropHandler,
  onFileChange,
} from "draftify-react";
import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome/dist";

type DropZoneProps = {
  setFile: Dispatch<SetStateAction<File | null>>;
  setFileName: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<boolean | null>>;
  setCompressing: Dispatch<SetStateAction<boolean>>;
  setCompressionProgress: Dispatch<SetStateAction<number>>;
};

export default function DropZone(props: DropZoneProps) {
  const mediaDropRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={mediaDropRef}
      onDrop={(e) => {
        props.setError(null);
        dropHandler(
          e,
          props.setFile,
          props.setFileName,
          props.setCompressing,
          props.setCompressionProgress,
        );
      }}
      onDragOver={(e) => dragHandler(e, mediaDropRef)}
      onDragLeave={(e) => dragLeaveHandler(e, mediaDropRef)}
      onMouseLeave={(e) => dragLeaveHandler(e, mediaDropRef)}
      className="w-full min-h-80 border-2 border-(--secondary-blue) border-dashed rounded-[10px] text-(--secondary-blue) grid items-center bg-white"
    >
      <input
        type="file"
        id="file"
        className="hidden"
        onChange={(e) => {
          props.setError(null);
          onFileChange(
            e,
            props.setFile,
            props.setFileName,
            props.setCompressing,
            props.setCompressionProgress,
          );
        }}
      />
      <label
        htmlFor="file"
        className="flex h-full flex-col justify-center items-center text-center gap-5 px-4 py-2 rounded-[10px] cursor-pointer"
      >
        <div className="border rounded-[50%] flex justify-center items-center w-15 h-15 text-[20px] cursor-pointer">
          <FontAwesomeIcon icon={["fas", "arrow-up-from-bracket"]} />
        </div>
        <div className="text-style__body">
          Drop your image here or click to browse
        </div>
        <div className="text-style__small-text text-(--primary-grey)">
          Supported formats: JPG, JPEG, PNG, BMP, WEBP, AVIF, SVG, PDF, DOC,
          DOCX and CSV • Max file size: 10MB
        </div>
      </label>
    </div>
  );
}
