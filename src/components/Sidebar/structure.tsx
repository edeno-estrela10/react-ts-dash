import React from "react";

import { HelpOutline as FAQIcon, Home as HomeIcon } from "@material-ui/icons";

// import { Dot } from "../Dot";

export type IStructureSidebar =
  | {
      id: number;
      label: string;
      link: string;
      icon: JSX.Element;
    }
  | {
      id: number;
      label: string;
      link: string;
      icon: JSX.Element;
      children: {
        label: string;
        link: string;
      }[];
    }
  | { id: number; type: "divider" }
  | { id: number; type: "title"; label: string };

const structure = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "Temp",
    link: "/app/temp",
    icon: <FAQIcon />,
  },
  // { id: 5, type: "divider" },
  // { id: 6, type: "title", label: "HELP" },
  // { id: 7, label: "Library", link: "", icon: <FAQIcon /> },
  // {
  //   id: 14,
  //   label: "Background",
  //   link: "",
  //   icon: <Dot size="small" color="secondary" />,
  // },
];

export default structure;
