"use client";

import { useState } from "react";
import { Contacts, contacts } from "@features/webisteContent/services/contact";

export default function useContactPage() {
  const [contactData, setContactData] = useState<Contacts>(contacts);

  const updateByPath = (
    path: (string | number)[],
    value: string | null | Record<string, string>,
  ) =>
    setContactData((prev) => {
      const clone: Contacts = structuredClone(prev);

      let current: unknown = clone;

      for (let i = 0; i < path.length - 1; i++) {
        current = (
          current as Record<
            string | number,
            string | null | Record<string, string>
          >
        )[path[i] as string];
      }

      (
        current as Record<
          string | number,
          string | null | Record<string, string>
        >
      )[path[path.length - 1] as string] = value;

      return clone;
    });

  const handleAddContactInfo = (
    phoneOrEmail: keyof Contacts["ContactInformation"],
  ) =>
    setContactData((prev) => ({
      ...prev,
      ContactInformation: {
        ...prev.ContactInformation,
        [phoneOrEmail]: [...prev.ContactInformation[phoneOrEmail], ""],
      },
    }));

  const handleDeleteContactInfo = (
    phoneOrEmail: keyof Contacts["ContactInformation"],
    idx: number,
  ) =>
    setContactData((prev) => ({
      ...prev,
      ContactInformation: {
        ...prev.ContactInformation,
        [phoneOrEmail]: prev.ContactInformation[phoneOrEmail].filter(
          (_, index) => index !== idx,
        ),
      },
    }));

  const handleAddSocials = () =>
    setContactData((prev) => ({
      ...prev,
      Socials: [...prev.Socials, ["Social Platform", "Social Link"]],
    }));

  const handleDeleteSocials = (idx: number) =>
    setContactData((prev) => ({
      ...prev,
      Socials: prev.Socials.filter((_, i) => i !== idx),
    }));

  const handleImageUpload = () => {};

  const resetChanges = () => {};

  const saveAllChanges = () => {};

  return {
    contactData,
    updateByPath,
    handleImageUpload,
    handleAddContactInfo,
    handleAddSocials,
    handleDeleteContactInfo,
    handleDeleteSocials,
    resetChanges,
    saveAllChanges,
  };
}
