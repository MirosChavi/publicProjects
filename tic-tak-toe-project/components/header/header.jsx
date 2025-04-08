import logoSrc from "./logo.svg";
import Image from "next/image";
import { Profile } from "../profile/profile";
import ArrowDownIcon from "./icons/arrowDownIcon";
import { UiButton } from "../uikit/uiButton";

export function Header() {
  return (
    <div className="flex h-24 items-center px-8 bg-white shadow-md">
      <Image src={logoSrc} alt="logo" />
      <div className="w-px h-8 bg-slate-200 mx-6" />
      <UiButton className="w-44" variant="primary" size="lg">
        Играть
      </UiButton>
      <button className="ml-auto flex items-center gap-2 text-start text-teal-600 ">
        <Profile name={"Miros"} rating={"1240"} />
        <ArrowDownIcon />
      </button>
    </div>
  );
}
