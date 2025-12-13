### CV Creator Frontend

A frontend application for creating and previewing CVs/resumes. Built with Vue 3, Vite, TypeScript, Quasar Framework, and Pinia for state management.

#### Overview
- Stack:
  - Language: TypeScript
  - Framework: Vue 3 (Composition API)
  - Build tool/dev server: Vite
  - UI framework: Quasar 2 with Material Icons
  - State management: Pinia
- Entry point: `index.html` → `src/main.ts` → `src/App.vue`
- Purpose: Provides an editor panel, sections selector, and live preview to compose a CV.

#### Requirements
- Node.js 18+ and npm (project contains `package-lock.json`, indicating npm is used)
- Modern browser for development/testing

#### Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   Vite will print a local URL (usually http://localhost:5173). Open it in your browser.
3. Type-check and build for production:
   ```bash
   npm run build
   ```
4. Preview the production build locally:
   ```bash
   npm run preview
   ```

#### Development Notes
- Aliases: `@` resolves to `./src` (see `vite.config.ts`).
- State: Pinia is registered in `src/main.ts` and used via `src/stores/editorStore.ts`.
- Sections & forms: Components under `src/components/editor` drive the UI for section selection, data entry, and live preview.
- Icon set: `@quasar/extras` (Material Icons, Roboto font)
- Global Quasar CSS imported from `quasar/src/css/index.sass`
- To customize Quasar variables, see the comment in `vite.config.ts` and the Quasar docs.
