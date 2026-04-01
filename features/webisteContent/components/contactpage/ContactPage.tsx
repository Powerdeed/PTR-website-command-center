"use client";

import Button, {
  ButtonLight,
  DeleteIconBtn,
} from "@global components/ui/Button";
import Toggle from "@global components/ui/Toggle";
import FormWrapper, { InputArea } from "@global components/layout/FormWrapper";

import { Contacts } from "../../types/contact.types";

import { to12Hour, to24Hour } from "../../utils/conversions";

import useWebsiteContent from "@features/webisteContent/hooks/useWebsiteContent";
import FormField from "./FormField";

export default function ContactPage() {
  const { state, actions } = useWebsiteContent();

  const { Address, ...otherLocData } = state.contactData.Location;

  return (
    <div className="vertical-layout__outer">
      <FormWrapper subtitle="Hero Section">
        <InputArea
          label="Hero Image"
          val={state.contactData.Hero.image}
          changeFunc={(val) => actions.updateByPath(["Hero", "image"], val)}
        >
          <ButtonLight
            buttonText="Upload"
            clickAction={actions.handleImageUpload}
          />
        </InputArea>

        <InputArea
          label="Hero Title"
          val={state.contactData.Hero.title}
          changeFunc={(val) => actions.updateByPath(["Hero", "title"], val)}
        />

        <InputArea
          label="Hero Subtitle"
          val={state.contactData.Hero.subtitle}
          changeFunc={(val) => actions.updateByPath(["Hero", "subtitle"], val)}
        />
      </FormWrapper>

      <FormWrapper subtitle="Location">
        <InputArea
          label="Address"
          val={Address}
          changeFunc={(val) =>
            actions.updateByPath(["Location", "Address"], val)
          }
        />

        <div className="grid grid-cols-3 gap-2.5">
          {Object.entries(otherLocData).map(([key, data]) => (
            <div key={key}>
              <InputArea
                label={key}
                val={data}
                changeFunc={(val) =>
                  actions.updateByPath(["Location", key], val)
                }
              />
            </div>
          ))}
        </div>
      </FormWrapper>

      <FormWrapper subtitle="Contact Information">
        {Object.entries(state.contactData.ContactInformation).map(
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

      <FormWrapper
        subtitle="Social Media"
        subtitleChildren={
          <Button
            buttonText="+ Add Platform"
            clickAction={actions.handleAddSocials}
          />
        }
      >
        {state.contactData.Socials.map((socialPlatform, idx) => (
          <div key={idx} className="flex gap-2.5">
            <div className="w-full vertical-layout__inner">
              <InputArea
                label=""
                val={socialPlatform.name}
                changeFunc={(val) =>
                  actions.updateByPath(["Socials", idx, "name"], val)
                }
              />

              <InputArea
                label=""
                val={socialPlatform.url}
                changeFunc={(val) =>
                  actions.updateByPath(["Socials", idx, "url"], val)
                }
              />
            </div>

            <DeleteIconBtn
              deleteFunc={() => actions.handleDeleteSocials(idx)}
            />
          </div>
        ))}
      </FormWrapper>

      <FormWrapper subtitle="Working Hours">
        {Object.entries(state.contactData["working-hours"]).map(
          ([days, hours]) => (
            <div key={days} className="flex gap-2.5 items-center">
              <div className="w-20">{days}:</div>

              <div className="w-80">
                {hours ? (
                  <div className="flex gap-2.5">
                    <FormField
                      txttype="time"
                      label="from:"
                      val={to24Hour(hours.from)}
                      changeFunc={(val) =>
                        actions.updateByPath(
                          ["working-hours", days, "from"],
                          typeof val === "string" ? to12Hour(val) : val,
                        )
                      }
                      styling="flex justify-between items-center"
                    />
                    <FormField
                      txttype="time"
                      label="to:"
                      val={to24Hour(hours.to)}
                      changeFunc={(val) =>
                        actions.updateByPath(
                          ["working-hours", days, "to"],
                          typeof val === "string" ? to12Hour(val) : val,
                        )
                      }
                      styling="flex justify-between items-center"
                    />
                  </div>
                ) : (
                  <div>Closed</div>
                )}
              </div>

              <Toggle
                state={hours === null}
                stateSetter={() =>
                  actions.updateByPath(
                    ["working-hours", days],
                    hours === null
                      ? { from: "08:00 AM", to: "05:00 PM" }
                      : null,
                  )
                }
              />
            </div>
          ),
        )}
      </FormWrapper>

      <div className="flex gap-2.5 items-center justify-end">
        <ButtonLight
          buttonText="Reset Changes"
          clickAction={actions.resetChanges}
        />
        <Button
          buttonText="Save All Changes"
          clickAction={actions.saveAllChanges}
        />
      </div>
    </div>
  );
}
