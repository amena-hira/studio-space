"use client";
import { useTheme } from 'next-themes';
import React from 'react';
import { Button } from "@/components/ui/button";
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
    const {theme, setTheme} = useTheme();
    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            <Sun className="hidden size-5 dark:block"></Sun>
            <Moon className="size-5 dark:hidden"></Moon>
        </Button>
    );
};

export default ThemeToggle;