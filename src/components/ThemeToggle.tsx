'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, ChevronDown, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themes: Array<{ value: 'light' | 'dark' | 'system'; label: string; icon: LucideIcon }> = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  const currentTheme = themes.find(t => t.value === theme);
  const CurrentIcon = currentTheme?.icon || Sun;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors duration-200"
        aria-label="Toggle theme"
      >
        <CurrentIcon size={18} className="text-slate-900 dark:text-slate-100" />

        <ChevronDown
          size={16}
          className={`text-slate-600 dark:text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 py-1 z-50 shadow-lg">
          {themes.map((themeOption) => {
            const ThemeIcon = themeOption.icon;
            return (
              <button
                key={themeOption.value}
                onClick={() => {
                  setTheme(themeOption.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 flex items-center space-x-3 ${
                  theme === themeOption.value
                    ? 'bg-slate-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400'
                    : 'text-slate-900 dark:text-slate-100'
                }`}
              >
                <ThemeIcon size={18} />
                <span>{themeOption.label}</span>
                {theme === themeOption.value && (
                  <Check size={16} className="ml-auto text-blue-600 dark:text-blue-400" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
