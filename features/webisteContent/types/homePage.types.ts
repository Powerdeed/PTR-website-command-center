export type NewTestimonial = {
  name: string;
  position: string;
  industry: string;
  testimonial: string;
  profilePic: string;
};

export type Testimonial = {
  _id: string;
  name: string;
  position: string;
  industry: string;
  testimonial: string;
  profilePic: string;
};

export type Hero = {
  title: string;
  subtitle: string;
  image: string;
};

export type AboutIntro = {
  title: string;
  description: string;
  image: string;
  flipped: boolean;
};

export type Homepage = {
  hero: Hero;
  aboutIntro: AboutIntro[];
};
