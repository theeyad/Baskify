"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Cloud, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface CoolThemeToggleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function CoolThemeToggle({
  className,
  size = "md",
}: CoolThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted)
    return (
      <div
        className={cn(
          "inline-flex rounded-full bg-muted",
          size === "sm" ? "h-6 w-12" : size === "md" ? "h-8 w-16" : "h-10 w-20",
        )}
      />
    );

  const sizes = {
    sm: {
      button: "w-12 h-6",
      thumb: "w-4 h-4",
      icon: "w-2.5 h-2.5",
      padding: "p-1",
      translateX: 24,
      cloudSize: "w-3 h-3",
    },
    md: {
      button: "w-16 h-8",
      thumb: "w-6 h-6",
      icon: "w-4 h-4",
      padding: "p-1",
      translateX: 32,
      cloudSize: "w-5 h-5",
    },
    lg: {
      button: "w-20 h-10",
      thumb: "w-8 h-8",
      icon: "w-5 h-5",
      padding: "p-1",
      translateX: 40,
      cloudSize: "w-6 h-6",
    },
  };

  const currentSize = sizes[size];

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative rounded-full transition-colors duration-500 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 overflow-hidden",
        isDark ? "bg-slate-900" : "bg-sky-300",
        currentSize.button,
        currentSize.padding,
        className,
      )}
      aria-label="Toggle theme"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-full">
        <motion.div
          initial={false}
          animate={{
            opacity: !isDark ? 1 : 0,
            y: !isDark ? 0 : 10,
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex items-center justify-end pr-2 text-white"
        >
          <Cloud
            className={cn("text-white/80 fill-white/80", currentSize.cloudSize)}
          />
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            y: isDark ? 0 : -10,
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex items-center justify-start pl-2"
        >
          <div className="relative w-full h-full">
            <Star
              className={cn(
                "absolute top-1 left-2 text-yellow-100 fill-yellow-100 opacity-70",
                size === "lg" ? "w-2 h-2" : "w-1 h-1",
              )}
            />
            <Star
              className={cn(
                "absolute bottom-2 left-4 text-yellow-100 fill-yellow-100 opacity-50",
                size === "lg" ? "w-3 h-3" : "w-1.5 h-1.5",
              )}
            />
            <Star
              className={cn(
                "absolute top-3 left-6 text-yellow-100 fill-yellow-100 opacity-90",
                size === "lg" ? "w-1.5 h-1.5" : "w-1 h-1",
              )}
            />
          </div>
        </motion.div>
      </div>

      {/* Toggle Thumb */}
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className={cn(
          "relative z-10 flex items-center justify-center rounded-full shadow-md",
          isDark ? "bg-slate-800" : "bg-yellow-400",
          currentSize.thumb,
        )}
        animate={{
          x: isDark ? currentSize.translateX : 0,
        }}
      >
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Sun */}
          <motion.div
            initial={false}
            animate={{
              rotate: isDark ? 180 : 0,
              scale: isDark ? 0 : 1,
              opacity: isDark ? 0 : 1,
            }}
            transition={{ duration: 0.4 }}
            className="absolute"
          >
            <Sun className={cn("text-white fill-white/20", currentSize.icon)} />
          </motion.div>

          {/* Moon */}
          <motion.div
            initial={false}
            animate={{
              rotate: isDark ? 0 : -180,
              scale: isDark ? 1 : 0,
              opacity: isDark ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="absolute flex items-center justify-center"
          >
            <Moon
              className={cn(
                "text-yellow-200 fill-yellow-200",
                currentSize.icon,
              )}
            />
          </motion.div>
        </div>
      </motion.div>
    </button>
  );
}
