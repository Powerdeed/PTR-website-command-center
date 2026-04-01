import { redirect } from "next/navigation";

import { menuItems } from "@global utils/constants/NAV_MENU_AND_LABELS";
import { convertLabelToLink } from "@global utils/conversions/urlConversions";

export default function Home() {
  redirect(convertLabelToLink(menuItems[0].label));
}
