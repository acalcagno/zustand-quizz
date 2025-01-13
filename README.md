# Small Javascript quizz 

Used to test zustand, this app shows a few questions to the user, and
evaluates its performance.

![alt text]({3CD162C8-E00F-4D39-9252-48239E7BDD1F}.png)


## inspiration
followed this guide: https://www.youtube.com/watch?v=p2wF2wRjcN0

this repo:
https://github.com/midudev/aprendiendo-react/blob/master/projects/13-javascript-quiz-con-zustand/public/data.json

this is one of this projects: https://www.javascript100.dev/

and the original midu's project: https://github.com/midudev/preguntas-entrevista-react

## how to run it

`pnpm run dev`

## additional notes.

don't forget to try (as midu explians in the referenced video) the Redux develoer tools that also work for zustand. (see minute 01:31:07). And also (a bit before), how to write middleware for zustand.



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

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
