import { lazy, Suspense } from "react";
import { useTheme } from "./use-theme";

const DarkTheme = lazy(() => import("./dark-theme"));
const LightTheme = lazy(() => import("./light-theme"));

export const ThemeProviderOwn = ({ children }:any) => {
  const [darkMode] = useTheme();

  return (
    <>
      <Suspense fallback={<span />}>
        {darkMode ? <DarkTheme /> : <LightTheme />}
      </Suspense>
      {children}
    </>
  );
};
