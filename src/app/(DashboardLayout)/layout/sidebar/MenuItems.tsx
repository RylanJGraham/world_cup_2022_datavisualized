import {
  IconAperture,
  IconLayoutDashboard,
  IconMoodHappy,
  IconSitemap,
  IconSoccerField,
  IconSword,
  IconTrophy,
  IconUserPlus,
  IconUsersGroup,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Overview",
    icon: IconSoccerField,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Tournament Overview",
  },
  {
    id: uniqueId(),
    title: "Bracket",
    icon: IconSitemap,
    href: "/utilities/typography",
  },
  {
    id: uniqueId(),
    title: "Teams",
    icon: IconUsersGroup,
    href: "/utilities/shadow",
  },
  {
    navlabel: true,
    subheader: "Winner Analysis",
  },
  {
    id: uniqueId(),
    title: "Argentina",
    icon: IconTrophy,
    href: "/authentication/login",
  },
  {
    navlabel: true,
    subheader: "Compare",
  },
  {
    id: uniqueId(),
    title: "Team Matchups",
    icon: IconSword,
    href: "/icons",
  },
];

export default Menuitems;
