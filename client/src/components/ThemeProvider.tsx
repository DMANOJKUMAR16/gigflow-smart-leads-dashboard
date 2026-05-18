import {
  ThemeProvider as NextThemesProvider,
} from "next-themes";

import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ThemeProvider = ({
  children,
}: Props) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;