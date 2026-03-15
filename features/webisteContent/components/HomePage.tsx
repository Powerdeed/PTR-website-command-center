"use client";

import Button, {
  ButtonLight,
  DeleteIconBtn,
  UploadIconBtn,
} from "@global components/ui/Button";
import FormWrapper, {
  InputArea,
  SeparatorLine,
} from "@global components/layout/FormWrapper";

import useHomePage from "@features/webisteContent/hooks/useHomePage";

export default function HomePage() {
  const {
    heroSectionData,
    aboutSummaryData,
    testimonialData,
    updateAboutIntro,
    updateHeroContent,
    updateTestimonial,
    handleAddTestimonial,
    handleDeleteTestimonial,
    resetChanges,
    saveAllChanges,
    handleImageUpload,
  } = useHomePage();

  return (
    <div className="text-style__body vertical-layout__outer">
      {/* HERO SECTION EDIT */}
      <FormWrapper subtitle="Hero Section">
        <InputArea
          label="Hero Image"
          val={heroSectionData.image}
          changeFunc={(val) => updateHeroContent("image", val)}
        >
          <ButtonLight buttonText="Upload" clickAction={handleImageUpload} />
        </InputArea>

        <InputArea
          label="Hero Title"
          val={heroSectionData.title}
          changeFunc={(val) => updateHeroContent("title", val)}
        />

        <InputArea
          label="Hero Subtitle"
          val={heroSectionData.subtitle}
          changeFunc={(val) => updateHeroContent("subtitle", val)}
        />

        <SeparatorLine />
      </FormWrapper>

      {/* ABOUT US SUMMARY */}
      {aboutSummaryData.map((about, index) => (
        <FormWrapper
          key={index}
          keyVal={index}
          subtitle={`About Summary - ${index === 0 ? "Top" : "Bottom"} Section`}
        >
          <em className="text-(--secondary-grey) text-style__small-text">
            Image on the {index === 0 ? "left" : "right"}, content on the{" "}
            {index === 0 ? "right" : "left"}
          </em>

          <InputArea
            label="Image"
            val={about.image}
            changeFunc={(val) => updateAboutIntro("image", val, index)}
          >
            <ButtonLight buttonText="Upload" clickAction={handleImageUpload} />
          </InputArea>

          <InputArea
            label="Title"
            val={about.title}
            changeFunc={(val) => updateAboutIntro("title", val, index)}
          />

          <InputArea
            label="Description"
            val={about.description}
            changeFunc={(val) => updateAboutIntro("description", val, index)}
          />

          <SeparatorLine />
        </FormWrapper>
      ))}

      {/* TESTIMONIALS SECTION */}
      <FormWrapper
        subtitle="Testimonial Section"
        subtitleChildren={
          <Button
            buttonText="+ Add Testimonial"
            clickAction={handleAddTestimonial}
          />
        }
      >
        <div className="border border-(--terciary-grey) rounded-[10px] p-2.5 h-100 overflow-y-auto section-scrollbar">
          {testimonialData.map((testimonial, index) => (
            <div
              key={index}
              className="vertical-layout__inner container-layout"
            >
              <div className="text-style__big-text flex">
                <div className="flex-1"> Testimonial {index + 1}</div>

                <DeleteIconBtn
                  deleteFunc={() => handleDeleteTestimonial(testimonial.id)}
                />
              </div>

              <div className="flex gap-5">
                <InputArea
                  label="Profile Image"
                  val={testimonial.profilePic}
                  changeFunc={(val) =>
                    updateTestimonial("profilePic", val, testimonial.id)
                  }
                >
                  <UploadIconBtn uploadFunc={handleImageUpload} />
                </InputArea>

                <InputArea
                  label="Name"
                  val={testimonial.name}
                  changeFunc={(val) =>
                    updateTestimonial("name", val, testimonial.id)
                  }
                />
              </div>

              <div className="flex gap-5">
                <InputArea
                  label="Position"
                  val={testimonial.position}
                  changeFunc={(val) =>
                    updateTestimonial("position", val, testimonial.id)
                  }
                />
                <InputArea
                  label="Industry / Project"
                  val={testimonial.industry}
                  changeFunc={(val) =>
                    updateTestimonial("industry", val, testimonial.id)
                  }
                />
              </div>

              <InputArea
                label="Testimonial Text"
                val={testimonial.testimonial}
                changeFunc={(val) =>
                  updateTestimonial("testimonial", val, testimonial.id)
                }
              />
            </div>
          ))}

          <SeparatorLine />
        </div>
      </FormWrapper>

      <div className="flex gap-2.5 items-center justify-end">
        <ButtonLight buttonText="Reset Changes" clickAction={resetChanges} />
        <Button buttonText="Save All Changes" clickAction={saveAllChanges} />
      </div>
    </div>
  );
}
