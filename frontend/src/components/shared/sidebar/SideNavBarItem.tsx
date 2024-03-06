import type { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

interface Props {
  href: string;
  Icon: IconType;
  title: string;
  subTitle: string;
}

export const SideBarNavItem = ({ href, Icon, title, subTitle }: Props) => {
  return (
    <NavLink key={href} to={href} end>
      <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
        <Icon className="text-2xl text-gray-600 group-hover:text-white " />
        <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
          {title}
        </h3>
      </div>
    </NavLink>
  );
};
