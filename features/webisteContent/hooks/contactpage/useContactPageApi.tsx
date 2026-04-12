"use client";

import { useContext, useEffect } from "react";

import { contactpageContext } from "../../context/contactpage/contactpageContext";

import { getContactsData, updateContactData } from "../../services/contact";

import { execute } from "@lib/api/execute";

export default function useContactPageApi() {
  const contactStates = useContext(contactpageContext);

  if (!contactStates)
    throw new Error("Contacts context must be within a provider");

  const {
    contacts,
    setContacts,
    setContactsPrev,
    setLoadingContacts,
    setLoadingContactsError,
    setUpdatingContacts,
    setUpdatingContactsError,
    refreshContacts,
    setHasContactsChanged,
  } = contactStates;

  useEffect(() => {
    const fetchContacts = async () =>
      execute(getContactsData, {
        setLoading: setLoadingContacts,
        setError: setLoadingContactsError,
        onSuccess: (contactsData) => {
          setContacts(contactsData);
          setContactsPrev(contactsData);
        },
      });

    fetchContacts();
  }, [
    refreshContacts,
    setContacts,
    setContactsPrev,
    setLoadingContacts,
    setLoadingContactsError,
  ]);

  const saveAllChanges = () => {
    if (!contacts) return;

    execute(() => updateContactData(contacts), {
      setLoading: setUpdatingContacts,
      setError: setUpdatingContactsError,
      onSuccess: (updatedContact) => {
        setContacts(updatedContact);
        setContactsPrev(updatedContact);
        setHasContactsChanged(false);
      },
    });
  };

  return { saveAllChanges };
}
