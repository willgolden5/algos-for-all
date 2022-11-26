// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const colors = {
  colors: {
    black: '#16161D',
    yellow: {
      50: '#fde766',
      100: '#fddf33',
      200: '#fcdb1a',
      300: '#fcd700',
      400: '#e3c200',
      500: '#caac00',
      600: '#b09700',
    }
  }
}

// 3. extend the theme
const theme = extendTheme({ config, colors })

export default theme;