import { ChefHat, Globe, PartyPopper } from "lucide-react";
import { ReactNode } from "react";

interface iAppProps {
  name: string;
  title: string;
  image: ReactNode;
  id: number;
}

export const caategoryItems: iAppProps[] = [
  {
    id: 1,
    name: "template",
    title: "Template",
    image: <Globe />,
  },
  {
    id: 2,
    name: "uikit",
    title: "Ui Kit",
    image: <ChefHat />,
  },
  {
    id: 3,
    name: "icon",
    title: "Icon",
    image: <PartyPopper />,
  },
];
