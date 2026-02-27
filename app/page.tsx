import { redirect } from "next/navigation";

import { menuItems } from "@utils/constants/UI-data-constants";
import { convertLabelToLink } from "@utils/conversions";

export default function Home() {
  redirect(convertLabelToLink(menuItems[0].label));
}
