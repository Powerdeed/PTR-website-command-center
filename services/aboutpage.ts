import { DraftifyBlock } from "draftify";

export type AboutUs = {
  title: string;
  description: DraftifyBlock[] | string[] | string;
};

export const aboutUs: AboutUs[] = [
  {
    title: "Company Overview",
    description: [
      {
        id: "b805a61f-2527-477e-8c72-1b8256784929",
        type: "paragraph",
        createdAt: "2026-01-22T13:06:05.776Z",
        data: {
          text: "Welcome to Powerdeed Engineering Services, your trusted partner in electrical engineering and renewable energy solutions. Established in 2014, Powerdeed has grown from humble beginnings in Nairobi to a reputable force in Nyeri, Kenya, where we now proudly serve individuals, businesses, and institutions across commercial, residential, and industrial sectors.",
        },
      },
      {
        id: "9ccaac1f-9470-478d-b525-d09c54e53299",
        type: "paragraph",
        createdAt: "2026-01-22T13:06:10.144Z",
        data: {
          text: "At the heart of Powerdeed is a commitment to innovation, quality, sustainability, and integrity. From custom electrical installations to cutting-edge solar energy systems, our solutions are designed to be reliable, efficient, and environmentally responsible.",
        },
      },
      {
        id: "28cd952a-1d50-4983-9c5f-568f600c3f6a",
        type: "paragraph",
        createdAt: "2026-01-22T13:06:20.063Z",
        data: {
          text: "Backed by a skilled team of engineers and technicians, and certified by both the Energy and Petroleum Regulatory Authority (EPRA) and the National Construction Authority (NCA), we consistently meet the highest standards of safety and performance.",
        },
      },
      {
        id: "9c9ba01f-6dee-462d-861c-14f980f77c65",
        type: "paragraph",
        createdAt: "2026-01-22T13:06:32.575Z",
        data: {
          text: "Whether you’re upgrading your home’s wiring, powering your business with solar, or securing your premises with alarm systems, Powerdeed offers turnkey solutions, from design to installation and maintenance, tailored to your unique needs.",
        },
      },
      {
        id: "06dde98b-4007-4a3b-b5d9-a80c7e4aa7bd",
        type: "paragraph",
        createdAt: "2026-01-22T13:06:40.166Z",
        data: {
          text: "Join us as we light the way toward a smarter, greener future, one project at a time.\nPowerdeed: Powering Progress, Empowering Communities.",
        },
      },
    ],
  },
  {
    title: "Mission",
    description:
      "To provide sustainable, safe, and innovative energy and security solutions that empower our clients and communities.",
  },
  {
    title: "Vision",
    description:
      "To be the most reliable and forward-thinking engineering service provider in Africa, recognized for excellence, safety, and environmental responsibility.",
  },
  {
    title: "Why Choose Powerdeed?",
    description: [
      "15+ years of proven industry experience",
      "Multidisciplinary team of expert engineers",
      "Commitment of sustainable practices",
      "Client-focused approach",
      "500+ successfully completed projects",
      "Complipance with safety regulations",
      "Our quality materials ensure long-lasting results",
      "reliable partner from consultation to completion",
    ],
  },
];
