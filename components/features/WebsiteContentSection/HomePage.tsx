"use client";

import { useState } from "react";

import { SubTitle } from "@components/ui/Title";

import {
  AboutIntro,
  aboutIntro,
  hero,
  Testimonial,
  testimonials,
} from "@services/homepage";
import Button, { ButtonLight } from "@components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HomePage() {
  const [heroSectionData, setHeroSectionData] = useState(hero);
  const [aboutSummaryData, setAboutSummaryData] =
    useState<AboutIntro[]>(aboutIntro);
  const [testimonialData, setTestimonialData] = useState(testimonials);

  const emptyTestimonial: Testimonial = {
    id: crypto.randomUUID(),
    name: "",
    position: "",
    industry: "",
    testimonial: "",
    profilePic: "",
  };

  const updateHeroContent = (key: string, data: string) =>
    setHeroSectionData((prev) => ({
      ...prev,
      [key]: data,
    }));

  const updateAboutIntro = (
    key: string,
    data: string | boolean,
    section: number,
  ) =>
    setAboutSummaryData((prev) => {
      const sectionData = prev[section];

      const updatedSectionData: AboutIntro = {
        ...sectionData,
        [key]: data,
      };

      return [updatedSectionData, prev[section === 0 ? 1 : 0]];
    });

  const updateTestimonial = (
    key: string,
    data: string,
    testimonialId: string,
  ) =>
    setTestimonialData((prev) => {
      const updatedTestimonials = prev.map((testimonial) => {
        if (testimonial.id === testimonialId) {
          return {
            ...testimonial,
            [key]: data,
          };
        }
        return testimonial;
      });

      return updatedTestimonials;
    });

  const handleAddTestimonial = () => {
    setTestimonialData((prev) => [...prev, emptyTestimonial]);
  };

  const handleDeleteTestimonial = (testimonialId: string) =>
    setTestimonialData((prev) =>
      prev.filter((testimonial) => testimonial.id !== testimonialId),
    );

  const resetChanges = () => {
    setHeroSectionData(hero);
    setAboutSummaryData(aboutIntro);
    setTestimonialData(testimonials);
  };

  const saveAllChanges = () => {};

  const handleImageUpload = () => {};

  return (
    <div className="text-style__body vertical-layout__outer">
      {/* HERO SECTION EDIT */}
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
              value={heroSectionData.image}
              onChange={(e) => updateHeroContent("image", e.target.value)}
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
            value={heroSectionData.title}
            onChange={(e) => updateHeroContent("title", e.target.value)}
          />
        </div>

        <div className="vertical-layout__inner">
          Hero Subtitle
          <textarea
            className="flex-1 input-style field-sizing-content"
            value={heroSectionData.subtitle}
            onChange={(e) => updateHeroContent("subtitle", e.target.value)}
          />
        </div>

        <SeparatorLine />
      </div>

      {/* ABOUT US SUMMARY */}
      {aboutSummaryData.map((about: AboutIntro, index) => (
        <div key={index} className="text-style__body vertical-layout__outer">
          <div className="vertical-layout__inner">
            <SubTitle
              subtitle={`About Sumary - ${index === 0 ? "Top" : "Bottom"} Section`}
            />
            <SeparatorLine />
          </div>

          <em className="text-(--secondary-grey) text-style__small-text">
            Image on the {index === 0 ? "left" : "right"}, content on the{" "}
            {index === 0 ? "right" : "left"}
          </em>

          <div className="vertical-layout__inner">
            Image
            <div className="w-full flex gap-2.5">
              <input
                type="text"
                className="flex-1 input-style"
                value={about.image}
                onChange={(e) =>
                  updateAboutIntro("image", e.target.value, index)
                }
              />

              <div onClick={handleImageUpload}>
                <ButtonLight buttonText="Upload" />
              </div>
            </div>
          </div>

          <div className="vertical-layout__inner">
            Title
            <textarea
              className="flex-1 input-style field-sizing-content"
              value={about.title}
              onChange={(e) => updateAboutIntro("title", e.target.value, index)}
            />
          </div>

          <div className="vertical-layout__inner">
            Description
            <textarea
              className="flex-1 input-style field-sizing-content"
              value={about.description}
              onChange={(e) =>
                updateAboutIntro("description", e.target.value, index)
              }
            />
          </div>

          <SeparatorLine />
        </div>
      ))}

      {/* TESTIMONIALS SECTION */}
      <div className="vertical-layout__outer">
        <div className="flex gap-2.5 items-center">
          <div className="flex-1">
            <SubTitle subtitle="Testimonial Section" />
          </div>

          <div onClick={handleAddTestimonial}>
            <Button buttonText="+ Add Testimonial" />
          </div>
        </div>

        <div className="vertical-layout__inner border border-(--terciary-grey) rounded-[10px] p-2.5 h-100 overflow-y-auto section-scrollbar">
          {testimonialData.map((testimonial, index) => (
            <div
              key={index}
              className="vertical-layout__inner container-layout"
            >
              <div className="text-style__big-text flex">
                <div className="flex-1"> Testimonial {index + 1}</div>

                <div
                  className="text-(--secondary-red) cursor-pointer"
                  onClick={() => handleDeleteTestimonial(testimonial.id)}
                >
                  <FontAwesomeIcon icon={["far", "trash-can"]} />
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-1">
                  Profile Image
                  <div className="flex gap-2.5 items-center">
                    <input
                      type="text"
                      className="flex-1 input-style"
                      value={testimonial.profilePic}
                      onChange={(e) =>
                        updateTestimonial(
                          "profilePic",
                          e.target.value,
                          testimonial.id,
                        )
                      }
                    />

                    <div
                      className="py-1.5 px-2 h border border-(--secondary-grey) bg-white rounded-[10px] w-fit hover:bg-(--terciary-grey)/30 duration-100"
                      onClick={handleImageUpload}
                    >
                      <FontAwesomeIcon
                        icon={["fas", "arrow-up-from-bracket"]}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  Name
                  <input
                    type="text"
                    className="flex-1 input-style"
                    value={testimonial.name}
                    onChange={(e) =>
                      updateTestimonial("name", e.target.value, testimonial.id)
                    }
                  />
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-1 flex flex-col">
                  Position
                  <input
                    type="text"
                    className="flex-1 input-style"
                    value={testimonial.position}
                    onChange={(e) =>
                      updateTestimonial(
                        "position",
                        e.target.value,
                        testimonial.id,
                      )
                    }
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  Industry / Project
                  <input
                    type="text"
                    className="flex-1 input-style"
                    value={testimonial.industry}
                    onChange={(e) =>
                      updateTestimonial(
                        "industry",
                        e.target.value,
                        testimonial.id,
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                Testimonial Text
                <textarea
                  className="flex-1 input-style"
                  value={testimonial.testimonial}
                  onChange={(e) =>
                    updateTestimonial(
                      "testimonial",
                      e.target.value,
                      testimonial.id,
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <SeparatorLine />
      </div>

      <div className="flex gap-2.5 items-center justify-end">
        <div onClick={resetChanges}>
          <ButtonLight buttonText="Reset Changes" />
        </div>
        <div onClick={saveAllChanges}>
          <Button buttonText="Save Changes" />
        </div>
      </div>
    </div>
  );
}

function SeparatorLine() {
  return <hr className="border-t border-(--terciary-grey)" />;
}
