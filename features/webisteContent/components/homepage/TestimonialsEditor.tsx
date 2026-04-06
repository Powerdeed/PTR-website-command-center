"use client";

import FormWrapper, {
  InputArea,
  SeparatorLine,
} from "@global components/layout/FormWrapper";
import Button, {
  DeleteIconBtn,
  UploadIconBtn,
} from "@global components/ui/Button";

import useHomePage from "@features/webisteContent/hooks/homepage/useHomepage";

export default function TestimonialsEditor() {
  const { state, actions } = useHomePage();

  if (!state.testimonials) return;

  return (
    <FormWrapper
      subtitle="Testimonial Section"
      subtitleChildren={
        <Button
          buttonText="+ Add Testimonial"
          clickAction={actions.handleAddTestimonial}
        />
      }
    >
      <div className="border border-(--terciary-grey) rounded-[10px] p-2.5 h-100 overflow-y-auto section-scrollbar">
        {state.testimonials.map((testimonial, index) => (
          <div key={index} className="vertical-layout__inner container-layout">
            <div className="text-style__big-text flex">
              <div className="flex-1"> Testimonial {index + 1}</div>

              <DeleteIconBtn
                deleteFunc={() =>
                  actions.handleDeleteTestimonial(testimonial.id)
                }
              />
            </div>

            <div className="flex gap-5">
              <InputArea
                label="Profile Image"
                val={testimonial.profilePic}
                changeFunc={(val) =>
                  actions.updateTestimonial("profilePic", val, testimonial.id)
                }
              >
                <UploadIconBtn uploadFunc={actions.handleImageUpload} />
              </InputArea>

              <InputArea
                label="Name"
                val={testimonial.name}
                changeFunc={(val) =>
                  actions.updateTestimonial("name", val, testimonial.id)
                }
              />
            </div>

            <div className="flex gap-5">
              <InputArea
                label="Position"
                val={testimonial.position}
                changeFunc={(val) =>
                  actions.updateTestimonial("position", val, testimonial.id)
                }
              />
              <InputArea
                label="Industry / Project"
                val={testimonial.industry}
                changeFunc={(val) =>
                  actions.updateTestimonial("industry", val, testimonial.id)
                }
              />
            </div>

            <InputArea
              label="Testimonial Text"
              val={testimonial.testimonial}
              changeFunc={(val) =>
                actions.updateTestimonial("testimonial", val, testimonial.id)
              }
            />
          </div>
        ))}

        <SeparatorLine />
      </div>
    </FormWrapper>
  );
}
