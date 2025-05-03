import { createTheme, PaletteColorOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface PaletteColor {
    extraLight?: string;
  }
  interface SimplePaletteColorOptions {
    extraLight?: string;
  }
  interface PaletteOptions {
    gradient?: PaletteColorOptions;
  }

  interface Palette {
    gradient: PaletteColor;
  }
}

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "0.875rem",
          whiteSpace: "nowrap",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
        },
        h1: {
          fontSize: "3rem",
          fontWeight: 600,
          letterSpacing: "-0.025em",
          lineHeight: 1.2,
        },
        h2: {
          fontSize: "2.25rem",
          fontWeight: 600,
          letterSpacing: "-0.025em",
          lineHeight: 1.2,
        },
        h3: {
          fontSize: "1.875rem",
          fontWeight: 600,
          letterSpacing: "-0.025em",
          lineHeight: 1.3,
        },
        h4: {
          fontSize: "1.5rem",
          fontWeight: 600,
          letterSpacing: "-0.025em",
          lineHeight: 1.4,
        },
        h5: {
          fontSize: "1.25rem",
          fontWeight: 600,
          letterSpacing: "-0.025em",
          lineHeight: 1.5,
        },
        h6: {
          fontSize: "1rem",
          fontWeight: 600,
          letterSpacing: "-0.025em",
          lineHeight: 1.6,
        },
        body1: {
          fontSize: "0.875rem",
          lineHeight: 1.5,
        },
        body2: {
          fontSize: "0.875rem",
          lineHeight: 1.5,
          color: "rgba(84, 86, 90, 0.6)",
        },
        subtitle1: {
          fontSize: "0.875rem",
          lineHeight: 1.5,
          fontWeight: 500,
        },
        subtitle2: {
          fontSize: "0.75rem",
          lineHeight: 1.5,
          fontWeight: 500,
        },
        caption: {
          fontSize: "0.75rem",
          lineHeight: 1.5,
          fontWeight: 500,
        },
        inherit: {
          fontSize: "inherit",
        }
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
          fontWeight: 500,
          fontSize: "0.875rem",
          "& .MuiChip-label": {
            overflow: "initial",
          },
        },
        sizeSmall: {
          height: "1.5rem",
          fontSize: "0.75rem",
        },
      },
      defaultProps: {
        size: "small", // Set 'small' as the default size
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          "@media (min-width: 600px)": {
            maxWidth: "100%",
          },

          // Need to rewrite the default rules so that they have higher specificity
          "@media (min-width: 900px)": {
            maxWidth: "900px",
          },
          "@media (min-width: 1200px)": {
            maxWidth: "1200px",
          },
          "@media (min-width: 1536px)": {
            maxWidth: "1536px",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: "1rem",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          },
          "& .MuiTabs-indicator": {
            height: "4px",
            bottom: "-2px",
          },
          "& .MuiTabs-scroller": {
            overflow: "visible !important",
          },
          borderBottom: 2,
          borderStyle: "solid",
          overflow: "initial",
          borderColor: "rgba(0, 0, 0, 0.12)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          lineHeight: "1.25rem"
        },
      },
    },
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "inherit",
        }
      }
    },
    MuiFormControl: {
      defaultProps: {
        size: "small",
      }
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          variants: [
            {
              props: { size: "small" },
              style: {
                "& .MuiInputLabel-shrink": {
                  transform: "translate(12px, -9px) scale(0.85)"
                }
              },
            }
          ]
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
        }
      }
    }
  },
  palette: {
    primary: {
      light: "#4A82C3",
      main: "#203A90",
      dark: "#102774",
      extraLight: "#F0F5FF"
    },
    secondary: {
      light: "rgba(84, 86, 90, 0.6)",
      main: "#54565A",
      dark: "#202124",
    },
    text: {
      primary: "#54565A",
      secondary: "rgba(84, 86, 90, 0.6)",
    },
    success: {
      light: "#F0FDF4",
      main: "#00B035",
      contrastText: "#fff",
    },
    gradient: {
      main: "linear-gradient(90deg, rgba(59, 130, 246, 1), rgba(30, 58, 138, 1))"
    }
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
  },
  spacing: 16,
  cssVariables: true,
});

export default theme;
