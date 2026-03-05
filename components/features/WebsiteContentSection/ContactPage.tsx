"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button, { ButtonLight } from "@components/ui/Button";
import { SubTitle } from "@components/ui/Title";
import Toggle from "@components/ui/Toggle";

import useContactPage from "@hooks/Website content/useContactPage";
import { to12Hour, to24Hour } from "@utils/conversions";
import { Contacts } from "@services/contact";

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
      <div className="vertical-layout__inner">
        <div className="vertical-layout__inner">
          <SubTitle subtitle="Hero Section" />
          <SeparatorLine />
        </div>

        <div className="vertical-layout__inner">
          Hero Image
          <div className="w-full flex gap-2.5">
            <input
              type="text"
              className="flex-1 input-style"
              value={contactData.Hero.image}
              onChange={(e) => updateByPath(["Hero", "image"], e.target.value)}
            />

            <ButtonLight buttonText="Upload" clickAction={handleImageUpload} />
          </div>
        </div>

        <FormField
          txttype="text"
          label="Hero Title"
          val={contactData.Hero.title}
          changeFunc={(val) => updateByPath(["Hero", "title"], val)}
          styling="defaultStyle"
        />

        <FormField
          txttype="text"
          label="Hero Subtitle"
          val={contactData.Hero.subtitle}
          changeFunc={(val) => updateByPath(["Hero", "subtitle"], val)}
          styling="defaultStyle"
        />
      </div>

      <div className="vertical-layout__inner">
        <div className="vertical-layout__inner">
          <SubTitle subtitle="Location" />
          <SeparatorLine />
        </div>

        <div className="vertical-layout__inner">
          <FormField
            txttype="text"
            label="Address"
            val={Address}
            changeFunc={(val) => updateByPath(["Location", "Address"], val)}
            styling="defaultStyle"
          />
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {Object.entries(otherLocData).map(([key, data]) => (
            <div key={key}>
              <FormField
                txttype="text"
                label={key}
                val={data}
                changeFunc={(val) => updateByPath(["Location", key], val)}
                styling="defaultStyle"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="vertical-layout__inner">
        <div className="vertical-layout__inner">
          <SubTitle subtitle="Contact Information" />
          <SeparatorLine />
        </div>

        <div className="vertical-layout__inner">
          {Object.entries(contactData.ContactInformation).map(
            ([contactType, contacts]) => (
              <div key={contactType} className="vertical-layout__inner">
                <div className="flex gap-2.5 items-center">
                  <div className="flex-1">{contactType}</div>
                  <Button
                    buttonText={`+ New ${contactType}`}
                    clickAction={() =>
                      handleAddContactInfo(
                        contactType as keyof Contacts["ContactInformation"],
                      )
                    }
                  />
                </div>
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

                      <button
                        onClick={() =>
                          handleDeleteContactInfo(
                            contactType as keyof Contacts["ContactInformation"],
                            idx,
                          )
                        }
                      >
                        <FontAwesomeIcon icon={["far", "trash-can"]} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      <div className="vertical-layout__outer">
        <div className="flex gap-2.5 items-center">
          <div className="flex-1">
            <SubTitle subtitle="Social Media" />
          </div>

          <Button buttonText="+ Add Platform" clickAction={handleAddSocials} />
        </div>

        <div className="vertical-layout__inner">
          {contactData.Socials.map((socialPlatform, idx) => {
            return (
              <div key={idx} className="flex gap-2.5">
                <div className="w-full vertical-layout__inner">
                  <FormField
                    txttype="text"
                    label=""
                    val={socialPlatform[0]}
                    changeFunc={(val) => updateByPath(["Socials", idx, 0], val)}
                    styling="defaultStyle"
                  />

                  <FormField
                    txttype="text"
                    label=""
                    val={socialPlatform[1]}
                    changeFunc={(val) => updateByPath(["Socials", idx, 1], val)}
                    styling="defaultStyle"
                  />
                </div>

                <button onClick={() => handleDeleteSocials(idx)}>
                  <FontAwesomeIcon icon={["far", "trash-can"]} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="vertical-layout__outer">
        <div className="vertical-layout__inner">
          <SubTitle subtitle="Working Hours" />
          <SeparatorLine />
        </div>

        <div className="vertical-layout__inner">
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
                    hours === null
                      ? { from: "08:00 AM", to: "05:00 PM" }
                      : null,
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2.5 items-center justify-end">
        <ButtonLight buttonText="Reset Changes" clickAction={resetChanges} />
        <Button buttonText="Save All Changes" clickAction={saveAllChanges} />
      </div>
    </div>
  );
}

const SeparatorLine = () => (
  <hr className="border-t border-(--terciary-grey)" />
);

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
