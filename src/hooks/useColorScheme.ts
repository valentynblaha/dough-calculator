import { useEffect, useMemo, useState } from "react";

export function useColorScheme() {
  const systemPrefersDark = Boolean(window.matchMedia?.('(prefers-color-scheme: dark)').matches);

  const [isDark, setIsDark] = useState(systemPrefersDark);
  const value = useMemo(
    () => (isDark ?? !!systemPrefersDark),
    [isDark, systemPrefersDark]
  );

  useEffect(() => {
    if (value) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [value]);

  return {
    isDark: value,
    setIsDark,
  };
}