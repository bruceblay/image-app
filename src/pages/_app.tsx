import type { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v16-pagesRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({ palette: { mode: 'dark' }});

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <AppCacheProvider {...props}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </AppCacheProvider>
  );
}
