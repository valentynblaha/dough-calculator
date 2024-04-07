import { useColorScheme } from "../hooks/useColorScheme";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function ThemeSwitch() {
  const { isDark, setIsDark } = useColorScheme();

  return (
    <div className="switch-container">
      <DarkModeSwitch checked={isDark} onChange={(checked) => setIsDark(checked)} size="2rem" moonColor="#dcd7c9" />
    </div>
  );
}
