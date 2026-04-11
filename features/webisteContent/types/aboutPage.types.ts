import { DraftifyBlock } from "draftify";

export type AboutUs = {
  _id: string;
  title: string;
  description: DraftifyBlock[] | string | string[] | string[][];
};

export type AboutUsFormatted = {
  title: string;
  description: DraftifyBlock[] | string | string[] | string[][];
};

export type CompanyStructure = {
  id: string;
  levelName: string;
  positions: string[];
};
