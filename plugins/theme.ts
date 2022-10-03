/**
 * theme.tsx
 * @author soltia48
 * @date 2021-05-17
 */

import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

export let theme = createTheme({
  palette: {
    primary: { light: "#A96469", main: "#F29097", dark: "#F4A6AB", contrastText: "#F1F1F1" },
    secondary: { light: "#E3f69", main: "#595B97", dark: "#7A7BAB", contrastText: "#1C1C1C" },
  },
});
theme = responsiveFontSizes(theme);
