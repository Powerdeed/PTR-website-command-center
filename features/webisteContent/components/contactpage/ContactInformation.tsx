"use client";

import FormField from "./FormField";
import FormWrapper from "@global components/layout/FormWrapper";
import Button, { DeleteIconBtn } from "@global components/ui/Button";

import useContactPage from "../../hooks/contactpage/useContactPage";

import { Contacts } from "../../types/contact.types";

export default function ContactInformation() {
  const { state, actions } = useContactPage();

  if (!state.contacts) return;

  return (
    <FormWrapper subtitle="Contact Information">
      {Object.entries(state.contacts.ContactInformation).map(
        ([contactType, contacts]) => (
          <div key={contactType} className="vertical-layout__inner">
            <FormWrapper
              subtitle={contactType}
              subtitleChildren={
                <Button
                  buttonText={`+ New ${contactType}`}
                  clickAction={() =>
                    actions.handleAddContactInfo(
                      contactType as keyof Contacts["ContactInformation"],
                    )
                  }
                />
              }
            >
              {null}
            </FormWrapper>

            <div className="vertical-layout__inner">
              {contacts.map((contact, idx) => (
                <div key={idx} className="flex gap-2.5 items-center">
                  <FormField
                    txttype={`${contactType === "Phone" ? "phone" : "email"}`}
                    label=""
                    val={contact}
                    changeFunc={(val) =>
                      actions.updateByPath(
                        ["ContactInformation", contactType, idx],
                        val,
                      )
                    }
                    styling="defaultStyle"
                  />

                  <DeleteIconBtn
                    deleteFunc={() =>
                      actions.handleDeleteContactInfo(
                        contactType as keyof Contacts["ContactInformation"],
                        idx,
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ),
      )}
    </FormWrapper>
  );
}
