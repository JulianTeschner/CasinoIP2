import { ThemeProvider } from "@emotion/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import defaultTheme from "./themes/default";

export const AllProviders = ({ children }) => (
    <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
)