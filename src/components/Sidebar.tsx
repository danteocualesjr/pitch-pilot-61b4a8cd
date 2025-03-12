
import { FileText, Upload, BarChart, Settings, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: FileText, label: "Analysis", href: "/" },
    { icon: Upload, label: "Upload", href: "/upload" },
    { icon: BarChart, label: "Reports", href: "/reports" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div
      className={cn(
        "h-screen bg-[#1A1F2C] border-r border-gray-800/50 transition-all duration-300 flex flex-col shadow-lg",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
        {!collapsed && (
          <h1 className="text-xl font-bold text-white">
            PitchPilot
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu size={20} className="text-gray-400" />
        </button>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-200 group"
              >
                <item.icon 
                  size={20} 
                  className="text-gray-400 group-hover:text-white transition-colors" 
                />
                {!collapsed && (
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
