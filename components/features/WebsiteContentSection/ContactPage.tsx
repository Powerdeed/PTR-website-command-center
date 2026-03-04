"use client";

import Button, { ButtonLight } from "@components/ui/Button";
import { SubTitle } from "@components/ui/Title";
import useContactPage from "@hooks/Website content/useContactPage";
import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome/dist";

export default function ContactPage() {
  const {
    contactData,
    updateHeroOrLocation,
    updatePhoneOrEmail,
    updateWorkingHours,
    updateSocialMedia,
    handleImageUpload,
  } = useContactPage();

  const { Address, ...otherLocData } = contactData.Location;

  const resetChanges = () => {};
  const saveAllChanges = () => {};

  return (
    <div className="vertical-layout__outer">
      <div className="vertical-layout__outer">
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
              onChange={(e) =>
                updateHeroOrLocation("Hero", "image", e.target.value)
              }
            />

            <div onClick={handleImageUpload}>
              <ButtonLight buttonText="Upload" />
            </div>
          </div>
        </div>

        <div className="vertical-layout__inner">
          Hero Title
          <textarea
            className="flex-1 input-style field-sizing-content"
            value={contactData.Hero.title}
            onChange={(e) =>
              updateHeroOrLocation("Hero", "title", e.target.value)
            }
          />
        </div>

        <div className="vertical-layout__inner">
          Hero Subtitle
          <textarea
            className="flex-1 input-style field-sizing-content"
            value={contactData.Hero.subtitle}
            onChange={(e) =>
              updateHeroOrLocation("Hero", "subtitle", e.target.value)
            }
          />
        </div>
      </div>

      <div className="vertical-layout__outer">
        <div className="vertical-layout__inner">
          <SubTitle subtitle="Location" />
          <SeparatorLine />
        </div>

        <div className="vertical-layout__inner">
          <div className="vertical-layout__inner">
            Address
            <input
              type="text"
              className="input-style"
              value={Address}
              onChange={(e) =>
                updateHeroOrLocation("Location", "Address", e.target.value)
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {Object.entries(otherLocData).map(([key, data]) => (
            <div key={key} className="vertical-layout__inner">
              {key}
              <input
                type="text"
                className="input-style"
                value={data}
                onChange={(e) =>
                  updateHeroOrLocation(
                    "Location",
                    key as "Country" | "City" | "Town",
                    e.target.value,
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="vertical-layout__outer">
        <div className="vertical-layout__inner">
          <SubTitle subtitle="Contact Information" />
          <SeparatorLine />
        </div>

        <div className="vertical-layout__inner">
          {Object.entries(contactData.ContactInformation).map(
            ([contactType, contacts]) => (
              <div key={contactType} className="vertical-layout__inner">
                {contactType}
                <div className="vertical-layout__inner">
                  {contacts.map((contact, idx) => (
                    <div key={idx} className="flex gap-2.5 items-center">
                      <input
                        type="text"
                        className="flex-1 input-style"
                        value={contact}
                        onChange={(e) =>
                          updatePhoneOrEmail(
                            contactType as "Phone" | "Email",
                            idx,
                            e.target.value,
                          )
                        }
                      />

                      <div>
                        <FontAwesomeIcon icon={["far", "trash-can"]} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      <div className="vertical-layout__outer">
        <div className="vertical-layout__inner">
          <SubTitle subtitle="Social Media" />
          <SeparatorLine />
        </div>

        <div className="vertical-layout__inner">
          {Object.entries(contactData.Socials).map(
            ([socialPlatform, socialLink]) => (
              <div key={socialPlatform} className="vertical-layout__inner">
                <div className="flex gap-2.5">
                  <div className="flex-1 vertical-layout__inner">
                    {socialPlatform}

                    <textarea
                      className="flex-1 input-style"
                      value={socialLink}
                      onChange={(e) =>
                        updateSocialMedia(socialPlatform, e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <FontAwesomeIcon icon={["far", "trash-can"]} />
                  </div>
                </div>
              </div>
            ),
          )}
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
              {days}

              {hours ? (
                <div className="flex gap-2.5 items-center">
                  from:
                  <input
                    type="time"
                    className="input-style"
                    value={hours.from}
                    onChange={(e) =>
                      updateWorkingHours(days, "from", e.target.value)
                    }
                  />
                  to:
                  <input
                    type="time"
                    className="input-style"
                    value={hours.to}
                    onChange={(e) =>
                      updateWorkingHours(days, "to", e.target.value)
                    }
                  />{" "}
                </div>
              ) : (
                <div>Closed</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2.5 items-center justify-end">
        <div onClick={resetChanges}>
          <ButtonLight buttonText="Reset Changes" />
        </div>

        <div onClick={saveAllChanges}>
          <Button buttonText="Save All Changes" />
        </div>
      </div>
    </div>
  );
}

function SeparatorLine() {
  return <hr className="border-t border-(--terciary-grey)" />;
}
