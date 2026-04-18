"use client";

import Button, {
  ButtonLight,
  ButtonRed,
  DeleteIconBtn,
} from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";
import { InputArea } from "@global components/layout/FormWrapper";
import Toggle from "@global components/ui/Toggle";

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
          <InputArea
            label={toPascalCase("name")}
            changeFunc={(val) => actions.modifyService("name", val)}
            val={state.selectedService.name}
          />

          <InputArea
            label={toPascalCase("description")}
            changeFunc={(val) => actions.modifyService("description", val)}
            val={state.selectedService.description}
          />

          {state.selectedService.images.map((image, idx) => (
            <div key={idx} className="flex items-center gap-2.5">
              <input
                type="text"
                value={image}
                onChange={(e) =>
                  actions.modifyService("images", e.target.value, idx)
                }
                className="flex-1 input-style"
              />

              <DeleteIconBtn deleteFunc={() => actions.removeImage(idx)} />
            </div>
          ))}

          <ButtonLight
            buttonText="Add Image"
            clickAction={actions.addNewServiceImage}
          />

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
