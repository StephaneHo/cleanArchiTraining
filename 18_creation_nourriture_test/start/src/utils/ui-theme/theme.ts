import { GlobalStyles } from "@chakra-ui/theme-tools";
import { ChakraTheme, extendTheme } from "@chakra-ui/react";

export const global = {
  global: {
    html: {
      fontSize: "62.5% !important",
      overflowY: "overlay",
      width: "100vw",
      overflowX: "hidden",
    },
    body: {
      fontSize: "1.6rem",
      background: "gray.100", // background color
    },
    "::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 14px 14px transparent",
      border: "solid 4px transparent",
    },
    "::-webkit-scrollbar": {
      width: "1.4rem",
      height: "1.4rem",
    },
    "::-webkit-scrollbar-thumb": {
      borderRadius: "1rem",
      boxShadow: "inset 0 0 14px 14px #A7A5A6",
      border: "4px solid transparent",
    },
  },
} as GlobalStyles;

type AgTypography = Partial<
  Pick<
    ChakraTheme,
    "fonts" | "fontSizes" | "fontWeights" | "lineHeights" | "letterSpacings"
  >
>;

export const typography: AgTypography = {
  fonts: {
    heading:
      '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
};

export const colors = {
  primary: {
    0: "#FFFFFF",
    950: "#111111",
  },
};

export const theme = extendTheme({
  colors,
  typography,
  styles: { ...global },
});

type ThemeType = typeof theme;
declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends ThemeType {}
}
