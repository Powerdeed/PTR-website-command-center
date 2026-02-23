"use client";

import ButtonLight from "@/components/ui/Button-light";
import { SubTitle } from "@/components/ui/Title";
import { useState } from "react";

type HeroSectionData = {
  image: string;
  title: string;
  subheading: string;
};

type AboutSummary = {
  image: string;
  title: string;
  description: string;
};

type AboutSummaryData = {
  top: AboutSummary;
  bottom: AboutSummary;
};

export default function HomePage() {
  const [heroSectionData, setHeroSectionData] = useState({} as HeroSectionData);
  const [aboutSummaryData, setAboutSummaryData] = useState<AboutSummaryData>({
    top: {
      image: "",
      title: "",
      description: "",
    },
    bottom: {
      image: "",
      title: "",
      description: "",
    },
  });

  return (
    <div className="text-style__body flex flex-col gap-5">
      <div className="text-style__body flex flex-col gap-5">
        <div>
          <SubTitle subtitle="Hero Section" />
          <hr className="mt-2 border-t border-(--terciary-grey)" />
        </div>

        <div className="flex flex-col gap-2.5">
          Hero Image
          <div className="w-full flex gap-2.5">
            <input
              type="text"
              className="flex-1 bg-(--secondary-grey)/20 rounded-[10px] h-10 p-2"
              value={heroSectionData.image}
              onChange={(e) =>
                setHeroSectionData((prev) => ({
                  ...prev,
                  image: e.target.value,
                }))
              }
            />
            <ButtonLight buttonText="Upload" />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          Hero Title
          <textarea
            className="flex-1 bg-(--secondary-grey)/20 rounded-[10px] min-h-10 h-fit p-2 field-sizing-content"
            value={heroSectionData.title}
            onChange={(e) =>
              setHeroSectionData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>

        <div className="flex flex-col gap-2.5">
          Hero Subtitle
          <textarea
            className="flex-1 bg-(--secondary-grey)/20 rounded-[10px] min-h-10 h-fit p-2 field-sizing-content"
            value={heroSectionData.subheading}
            onChange={(e) =>
              setHeroSectionData((prev) => ({
                ...prev,
                subheading: e.target.value,
              }))
            }
          />
        </div>

        <hr className="border-t border-(--terciary-grey)" />
      </div>

      <div className="text-style__body flex flex-col gap-5">
        <div>
          <SubTitle subtitle="About Sumary - Top Section" />
          <hr className="mt-2 border-t border-(--terciary-grey)" />
        </div>

        <div className="text-(--secondary-grey) text-style__small-text">
          Image on the left, content on the right
        </div>

        <div className="flex flex-col gap-2.5">
          Image (Left Side)
          <div className="w-full flex gap-2.5">
            <input
              type="text"
              className="flex-1 bg-(--secondary-grey)/20 rounded-[10px] h-10 p-2"
              value={aboutSummaryData.top.image}
              onChange={(e) =>
                setAboutSummaryData((prev) => {
                  const topSection = prev.top;
                  const updatedSectionData: AboutSummary = {
                    ...topSection,
                    image: e.target.value,
                  };
                  return { ...prev, top: updatedSectionData };
                })
              }
            />
            <ButtonLight buttonText="Upload" />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          Title (Right Side)
          <textarea
            className="flex-1 bg-(--secondary-grey)/20 rounded-[10px] min-h-10 h-fit p-2 field-sizing-content"
            value={aboutSummaryData.top.title}
            onChange={(e) =>
              setAboutSummaryData((prev) => {
                const topSection = prev.top;
                const updatedSectionData: AboutSummary = {
                  ...topSection,
                  title: e.target.value,
                };
                return { ...prev, top: updatedSectionData };
              })
            }
          />
        </div>

        <div className="flex flex-col gap-2.5">
          Description (Right Side)
          <textarea
            className="flex-1 bg-(--secondary-grey)/20 rounded-[10px] min-h-10 h-fit p-2 field-sizing-content"
            value={aboutSummaryData.top.description}
            onChange={(e) =>
              setAboutSummaryData((prev) => {
                const topSection = prev.top;
                const updatedSectionData: AboutSummary = {
                  ...topSection,
                  description: e.target.value,
                };
                return { ...prev, top: updatedSectionData };
              })
            }
          />
        </div>

        <hr className="border-t border-(--terciary-grey)" />
      </div>
    </div>
  );
}
