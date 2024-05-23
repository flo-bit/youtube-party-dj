# Youtube Party DJ

## Development

1. Clone the repository

```bash
git clone https://github.com/flo-bit/youtube-party-dj.git
```

2. Install [deno](https://docs.deno.com/runtime/manual/getting_started/installation)

3. Install UIX

```bash
deno install --import-map https://cdn.unyt.org/uix/importmap.json -Aq -n uix https://cdn.unyt.org/uix/run.ts
```

4. Install [node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) if you haven't already

5. Install node modules, run this in the root directory of the project:

```bash
npm install
```

6. Run development server, run this in the root directory of the project:

```bash
npm run dev
```

7. Open the browser and navigate to `http://localhost`






## UIX Base Project

This repository provides a simple UIX setup, including backend, frontend and configuration files.

*[UIX Docs](https://docs.unyt.org/manual/uix/getting-started)*

## Project Structure

### Directories
The source code is split into three directories. 

The `backend` directory contains the backend logic that runs on [Deno](https://deno.com/).

The `frontend` directory contains the code for the frontend clients (running in the web browser).

The default export of the `backend/entrypoint.ts` and `frontend/entrypoint.ts` determine what content
gets displayed when visiting a page in the browser.

The `common` directory contains common modules that can be initialized both in the browser and in the deno backend - they can be imported from modules in the `backend` and `frontend` directory.

The directory names (`backend`, `frontend`, `common`) are important to tell UIX which code runs in which context. The default names can also be changed in the `app.dx` config file.

### app.dx

The `app.dx` configuration file is required for a UIX app to run. It needs to contain at least the app name.
The `app.dx` has to be placed next to the app directories (`frontend`, `backend` and `common`) in the default configuration.

## Cross realm imports

Frontend and common modules can import exported values from backend modules.
In the background, special interface module files are generated, making sure that the backend source code is never exposed to the frontend endpoints.

Access to these exports can be limited by setting DATEX permission filters.

## Development

Compilation of the TS files is not required. The project can be deployed as is.
There is a devcontainer set up, containing the latest deno version.

To run the project, Deno has to be installed:
hit `CTRL`+`F5` to launch the project with the launch configuration.

With the `--live` option, frontend browser tabs are automatically reloaded when a file has changed, which is useful for development, but should not be used in production.

This command starts the backend endpoint and also exposes a web server on port 80 or another available port.

---

<sub>&copy; unyt 2024 • [unyt.org](https://unyt.org)</sub>