"use client";

import { useState } from "react";
import { Contacts, contacts } from "@services/contact";

export default function useContactPage() {
  const [contactData, setContactData] = useState<Contacts>(contacts);

  const updateHeroOrLocation = (
    key: "Hero" | "Location",
    innerKey: keyof Contacts["Hero"] | keyof Contacts["Location"],
    data: string,
  ): void =>
    setContactData((prev) => {
      const targetObj = key === "Hero" ? prev.Hero : prev.Location;

      if (key === "Hero") {
        prev.Hero[innerKey as keyof Contacts["Hero"]] = data;
      } else if (key === "Location") {
        prev.Location[innerKey as keyof Contacts["Location"]] = data;
      }

      return { ...prev, [key]: targetObj };
    });

  const updatePhoneOrEmail = (
    key: "Phone" | "Email",
    index: number,
    data: string,
  ) =>
    setContactData((prev) => {
      const targetObj = prev.ContactInformation[key];
      targetObj[index] = data;

      return { ...prev, [key]: targetObj };
    });

  const updateWorkingHours = (key: string, toFrom: string, data: string) =>
    setContactData((prev) => {
      const targetObj = prev["working-hours"][key];
      if (targetObj) {
        targetObj[toFrom as keyof typeof targetObj] = data;

        return { ...prev, [key]: targetObj };
      }

      return prev;
    });

  const updateSocialMedia = (key: string, value: string) =>
    setContactData((prev) => {
      const { Socials, ...otherData } = prev;

      Socials[key] = value;

      return { ...otherData, Socials };
    });

  const handleImageUpload = () => {};

  return {
    contactData,
    updateHeroOrLocation,
    updatePhoneOrEmail,
    updateWorkingHours,
    updateSocialMedia,
    handleImageUpload,
  };
}

// "use client";

// import { useState } from "react";
// import { Contacts, contacts } from "@services/contact";

// export default function useContact() {
//   const [contactData, setContactData] = useState<Contacts>(contacts);

//   const updateHeroOrLocation = <K extends "hero" | "location">(
//     key: K,
//     innerKey: keyof Contacts[K],
//     data: string,
//   ): void =>
//     setContactData((prev) => {
//       const path = [key, String(innerKey)];
//       return setIn(prev, path, data);
//     });

//   const updatePhoneOrEmail = (
//     key: "phone" | "email",
//     index: number,
//     data: string,
//   ) =>
//     setContactData((prev) => {
//       const path = [key, index];
//       return setIn(prev, path, data);
//     });

//   const updateWorkingHours = (key: string, toFrom: string, data: string) =>
//     setContactData((prev) => {
//       const path = ["working-hours", key, toFrom];
//       return setIn(prev, path, data);
//     });

//   // Generic immutable setter for nested objects/arrays (typed)
//   const isObject = (v: unknown): v is Record<string, unknown> =>
//     v !== null && typeof v === "object" && !Array.isArray(v);

//   const setIn = <T,>(
//     obj: T,
//     path: Array<string | number>,
//     value: unknown,
//   ): T => {
//     if (path.length === 0) return value as unknown as T;

//     const [head, ...rest] = path;

//     if (typeof head === "number") {
//       const arr = Array.isArray(obj) ? (obj as unknown[]) : [];
//       const cloned = arr.slice();
//       const current = arr[head];
//       cloned[head] =
//         rest.length === 0
//           ? value
//           : (setIn(current ?? ({} as unknown), rest, value) as unknown);
//       return cloned as unknown as T;
//     }

//     const key = String(head);
//     const current = isObject(obj)
//       ? (obj as Record<string, unknown>)[key]
//       : undefined;

//     return {
//       ...(isObject(obj) ? (obj as Record<string, unknown>) : {}),
//       [key]:
//         rest.length === 0
//           ? value
//           : setIn(current ?? ({} as unknown), rest, value),
//     } as unknown as T;
//   };

//   const handleImageUpload = () => {};

//   return {
//     contactData,
//     setContactData,
//     contacts,
//     updateHeroOrLocation,
//     updatePhoneOrEmail,
//     updateWorkingHours,
//     handleImageUpload,
//   };
// }
