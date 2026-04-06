"use client";

import Toggle from "@global components/ui/Toggle";
import FormWrapper from "@global components/layout/FormWrapper";

import { to12Hour, to24Hour } from "../../utils/conversions";

import FormField from "./FormField";

import useContactPage from "../../hooks/contactpage/useContactPage";

export default function WorkingHours() {
  const { state, actions } = useContactPage();

  return (
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
                  hours === null ? { from: "08:00 AM", to: "05:00 PM" } : null,
                )
              }
            />
          </div>
        ),
      )}
    </FormWrapper>
  );
}
