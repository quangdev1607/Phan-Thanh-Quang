import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ToggleDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "light") setIsDarkMode(false);
    }, []);

    useEffect(() => {
        if (!isDarkMode) {
            document.body.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            localStorage.setItem("theme", "dark");
        }
    }, [isDarkMode]);

    return (
        <div className="flex gap-x-2 items-center">
            <Switch
                className=""
                id="darkmode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                onClick={() => document.body.classList.toggle("dark")}
            />
            {isDarkMode ? <Moon className="dark:text-primary-foreground" /> : <Sun className="dark:text-primary-foreground" />}
        </div>
    );
}
