import type { IconType } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import {
  IoAccessibilityOutline,
  IoHeartOutline,
  IoListOutline,
  IoLogOutOutline,
  IoPawOutline,
  IoSpeedometerOutline,
} from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { SideBarNavItem } from "./SideNavBarItem";
import { useAuthStore } from "../../../stores";

interface MenuItem {
  title: string;
  subTitle: string;
  href: string;
  Icon: IconType;
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    subTitle: "Visualizar data",
    href: "/dashboard",
    Icon: IoSpeedometerOutline,
  },
  {
    title: "Osos",
    subTitle: "Manejador de osos",
    href: "/dashboard/bears",
    Icon: IoPawOutline,
  },
  {
    title: "Persona",
    subTitle: "Nombre y apellido",
    href: "/dashboard/person",
    Icon: IoAccessibilityOutline,
  },
  {
    title: "Tareas",
    subTitle: "Listado de tareas",
    href: "/dashboard/tasks",
    Icon: IoListOutline,
  },
  {
    title: "Boda",
    subTitle: "Invitados a la boda",
    href: "/dashboard/wedding-invitation",
    Icon: IoHeartOutline,
  },
];

export function SideNavbar() {
  const logout = useAuthStore((state) => state.logoutUser);

  return (
    <div>
      <Disclosure as="nav">
        <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group md:hidden">
          <GiHamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 md:left-0 md:w-60 peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
              Menú
            </h1>
            <div className=" my-4 border-b border-gray-100 pb-4">
              {menuItems.map((item) => (
                <SideBarNavItem key={item.href} {...item} />
              ))}
            </div>
            <div className=" my-4 border-b border-gray-100 pb-4">
              <NavLink to={"/configuraciones"} className="mt-10">
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Config
                  </h3>
                </div>
              </NavLink>
            </div>
            <div className=" my-4">
              <a onClick={logout} className="mt-10">
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Salir
                  </h3>
                </div>
              </a>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}
