// src/theme.d.ts
// import { PaletteColorOptions, PaletteColor } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColor {
    extraLight?: string;
  }
  interface PaletteColorOptions {
    extraLight?: string;
  }
}