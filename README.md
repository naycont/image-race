# image-race

This SPA showcases the Alegra sellers competing to present users with the best images in the world. The winner seller is the one who gets more likes in their images.

1. **Homew view**: Displays instructions to the user. Display a button to start
2. **Race view**: Allows users to search images by name, then the results are given for each seller. User likes a image from the seller and the seller gets 3 points.
   The winner is the first seller who gets 21 points
3. **Ranking component**: Provides score information from each seller
4. **Images component**: Display the result of the searching on a list of images
5. **Admin View**: CRUD operations for sellers

## Built with

- [Vue.js v3](https://vuejs.org/guide/introduction.html)
- [Vuetify](https://vuetifyjs.com/en/getting-started/installation/)
- [Vue Router](https://router.vuejs.org/guide/)
- [Pinia](https://pinia.vuejs.org/introduction.html)
- [Google material design icons](https://fonts.google.com/icons)

3rd party library to access image content
- https://www.pexels.com/api/documentation/

## Prerequisites

- Node.js (version 22.14.X)
- npm (version 10.0.X)
- IDE

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Installation

1. Clone repository:

```sh
git clone git@github.com:naycont/image-race.git
```

2. Navigate to the project directory:

```sh
cd image-race
```

3. Install dependencies:

```sh
npm install
```

4. Start the development server:

```sh
npm run dev
```

5. Run the development server and open http://localhost:5173/image-race in your browser.

### Run Unit Tests with [Vitest](https://vitest.dev/)
 
(TBA)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Type-Check, Compile and Minify for Production

1. Use the following commands to build and deploy the project:

```sh
npm run deploy
```

## deployed application

https://naycont.github.io/image-race/

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Contact

Nayeli Contreras - naycont@gmail.com

## Roadmap

### Improvements needed

1. Implement AUTH for sellers CRUD operations
2. Global notifications when catching errors
3. Complete unit testing
4. Improve workflow on the logic when a seller wins the prize(invoice)
5. Implement zoom on images
6. Implement 404 page
7. Skelenton loaders needed
