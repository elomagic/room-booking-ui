# Room Booking UI

A tool that ...

---

[![Apache License, Version 2.0, January 2004](https://img.shields.io/github/license/apache/maven.svg?label=License)][license]
[![build workflow](https://github.com/elomagic/room-booking-ui/actions/workflows/release.yml/badge.svg)](https://github.com/elomagic/room-booking-ui/actions)
[![GitHub issues](https://img.shields.io/github/issues-raw/elomagic/room-booking-ui)](https://github.com/elomagic/room-booking-ui/issues)
[![Latest](https://img.shields.io/github/release/elomagic/room-booking-ui.svg)](https://github.com/elomagic/room-booking-ui/releases)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/elomagic/room-booking-ui/graphs/commit-activity)
[![Buymeacoffee](https://badgen.net/badge/icon/buymeacoffee?icon=buymeacoffee&label)](https://www.buymeacoffee.com/elomagic)

---

# Installation

This UI is part of the https://github.com/elomagic/room-booking-backend project. Docker image can also be found there.

# Build web app

```commandline
npm run build
```

# Run as dev

```commandline
npm run dev
```

Enjoy

---

# React + TypeScript + Vite

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

[license]: https://www.apache.org/licenses/LICENSE-2.0
