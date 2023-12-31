import * as React from "react";
// import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

const SidebarContext = createContext(true);

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-slate-800 border-r shadow-sm border-slate-800">
        <div className="p-2 pb-2 flex justify-between items-center">
          <span
            className={`overflow-hidden transition-all text-slate-300 font-bold ${
              expanded ? "w-40" : "w-0"
            }`}
          >
            ADD Portal
          </span>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-2 rounded-full bg-slate-800 text-slate-200 hover:bg-slate-700 "
          >
            {/* {expanded ? <ChevronFirst /> : <ChevronLast />} */}
            <MenuOutlinedIcon />
          </button>
        </div>

        <SidebarContext.Provider value={expanded}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertOutlinedIcon />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, to }) {
  const expanded: boolean = useContext(SidebarContext);

  return (
    <li
      className="
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer text-gray-300
        transition-colors group hover:text-slate-800 hover:bg-sky-200"
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-40 ml-3" : "w-0"
        }`}
      >
        <Link to={to}>{text} </Link>
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
