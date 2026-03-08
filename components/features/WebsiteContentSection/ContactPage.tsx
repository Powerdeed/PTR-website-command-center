"use client";

import Button, { ButtonLight, DeleteIconBtn } from "@components/ui/Button";
import Toggle from "@components/ui/Toggle";

import useContactPage from "@hooks/Website content/useContactPage";
import { to12Hour, to24Hour } from "@utils/conversions";
import { Contacts } from "@services/contact";
import FormWrapper, { InputArea } from "@components/layout/FormWrapper";

export default function ContactPage() {
  const {
    contactData,
    updateByPath,
    handleImageUpload,
    handleAddContactInfo,
    handleAddSocials,
    handleDeleteContactInfo,
    handleDeleteSocials,
    resetChanges,
    saveAllChanges,
  } = useContactPage();

  const { Address, ...otherLocData } = contactData.Location;

  return (
    <div className="vertical-layout__outer">
      <FormWrapper subtitle="Hero Section">
        <InputArea
          label="Hero Image"
          val={contactData.Hero.image}
          changeFunc={(val) => updateByPath(["Hero", "image"], val)}
        >
          <ButtonLight buttonText="Upload" clickAction={handleImageUpload} />
        </InputArea>

        <InputArea
          label="Hero Title"
          val={contactData.Hero.title}
          changeFunc={(val) => updateByPath(["Hero", "title"], val)}
        />

        <InputArea
          label="Hero Subtitle"
          val={contactData.Hero.subtitle}
          changeFunc={(val) => updateByPath(["Hero", "subtitle"], val)}
        />
      </FormWrapper>

      <FormWrapper subtitle="Location">
        <InputArea
          label="Address"
          val={Address}
          changeFunc={(val) => updateByPath(["Location", "Address"], val)}
        />

        <div className="grid grid-cols-3 gap-2.5">
          {Object.entries(otherLocData).map(([key, data]) => (
            <div key={key}>
              <InputArea
                label={key}
                val={data}
                changeFunc={(val) => updateByPath(["Location", key], val)}
              />
            </div>
          ))}
        </div>
      </FormWrapper>

      <FormWrapper subtitle="Contact Information">
        {Object.entries(contactData.ContactInformation).map(
          ([contactType, contacts]) => (
            <div key={contactType} className="vertical-layout__inner">
              <FormWrapper
                subtitle={contactType}
                subtitleChildren={
                  <Button
                    buttonText={`+ New ${contactType}`}
                    clickAction={() =>
                      handleAddContactInfo(
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
                        updateByPath(
                          ["ContactInformation", contactType, idx],
                          val,
                        )
                      }
                      styling="defaultStyle"
                    />
                    <DeleteIconBtn
                      deleteFunc={() =>
                        handleDeleteContactInfo(
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
          <Button buttonText="+ Add Platform" clickAction={handleAddSocials} />
        }
      >
        {contactData.Socials.map((socialPlatform, idx) => (
          <div key={idx} className="flex gap-2.5">
            <div className="w-full vertical-layout__inner">
              <InputArea
                label=""
                val={socialPlatform[0]}
                changeFunc={(val) => updateByPath(["Socials", idx, 0], val)}
              />

              <InputArea
                label=""
                val={socialPlatform[1]}
                changeFunc={(val) => updateByPath(["Socials", idx, 1], val)}
              />
            </div>

            <DeleteIconBtn deleteFunc={() => handleDeleteSocials(idx)} />
          </div>
        ))}
      </FormWrapper>

      <FormWrapper subtitle="Working Hours">
        {Object.entries(contactData["working-hours"]).map(([days, hours]) => (
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
                      updateByPath(
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
                      updateByPath(
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
                updateByPath(
                  ["working-hours", days],
                  hours === null ? { from: "08:00 AM", to: "05:00 PM" } : null,
                )
              }
            />
          </div>
        ))}
      </FormWrapper>

      <div className="flex gap-2.5 items-center justify-end">
        <ButtonLight buttonText="Reset Changes" clickAction={resetChanges} />
        <Button buttonText="Save All Changes" clickAction={saveAllChanges} />
      </div>
    </div>
  );
}

const FormField = ({
  txttype,
  label,
  val,
  changeFunc,
  styling,
}: {
  txttype: string;
  label: string;
  val: string;
  changeFunc: (val: string) => void;
  styling: string;
}) => (
  <div
    className={`${styling === "defaultStyle" ? "flex-1 vertical-layout__inner" : styling}`}
  >
    {label}

    <input
      type={txttype}
      className="flex-1 input-style"
      value={val}
      onChange={(e) => changeFunc(e.target.value)}
    />
  </div>
);
