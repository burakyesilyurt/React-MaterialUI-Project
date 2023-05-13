"use client";
import './globals.css'
import { Montserrat } from 'next/font/google'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme/themes"

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: "600"
})



export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.className}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body style={{ margin: "0 50px 0 50px" }}>{children}</body>
      </ThemeProvider>
    </html>
  )
}
