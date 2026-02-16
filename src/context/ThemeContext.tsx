"use client";
import React, { createContext, useContext, useState } from "react";
import data from "@/data/data.json";

type ThemeContextType = {
    backgroundColor: string;
    setBackgroundColor: (c: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // initialize with first flavor color so navbar has a color immediately
    const initial = data && data.length ? data[0].backgroundColor : "transparent";
    const [backgroundColor, setBackgroundColor] = useState<string>(initial);

    return (
        <ThemeContext.Provider value={{ backgroundColor, setBackgroundColor }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return ctx;
}

export default ThemeContext;
