"use client";

import Button, { ButtonRed } from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";
import { InputArea } from "@global components/layout/FormWrapper";
import Toggle from "@global components/ui/Toggle";

import { SERVICE_FIELDS } from "../constants/defaultService";

import useService from "../hooks/useService";

import { toPascalCase } from "@global utils/conversions/toPascalCase";

export default function ServiceEditor() {
  const { state, actions } = useService();

  return (
    <div className="flex-1 feature-container-vertical text-style__body">
      <div className="text-style__subheading">
        {state.isNewService ? "Add New Service" : "Edit Service"}
      </div>

      {state.selectedService ? (
        <div className="vertical-layout__outer">
          {SERVICE_FIELDS.map((field) => {
            return (
              <InputArea
                key={field}
                label={toPascalCase(field)}
                changeFunc={(val) => actions.modifyService(field, val)}
                val={actions.selectValue(field) || ""}
              />
            );
          })}

          <div className="flex">
            <div className="flex-1 text-style__body">Set as active</div>

            <Toggle
              state={state.selectedServiceStatus}
              stateSetter={state.setSelectedServiceStatus}
            />
          </div>

          <div className="flex justify-between">
            <Button
              buttonText={state.isNewService ? "Add Service" : "Save Changes"}
              clickAction={
                state.isNewService
                  ? actions.handleUploadNewService
                  : actions.handleUploadServiceChanges
              }
              disabled={state.isUploading}
            >
              {state.isUploading && <Loader />}
            </Button>

            <ButtonRed
              buttonText="Delete Service"
              clickAction={actions.handleDeleteService}
              disabled={state.isDeleting}
            >
              {state.isDeleting && <Loader />}
            </ButtonRed>
          </div>

          {state.error && (
            <div className="text-(--primary-red)">*{state.error}*</div>
          )}
        </div>
      ) : (
        <div>Select a service to start editing</div>
      )}
    </div>
  );
}
