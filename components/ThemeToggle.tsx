"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { SunIcon, MoonIcon } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 hover:opacity-80 group"
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      {theme === "dark" ? (
        <SunIcon size={24} className="text-white" />
      ) : (
        <MoonIcon size={24} className="text-gray-900" />
      )}
      <span className="absolute hidden group-hover:block right-0 top-full mt-2 px-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm rounded-md whitespace-nowrap">
        Toggle theme ({isMac ? "⌘ /" : "Ctrl + /"})
      </span>
    </button>
  );
}
