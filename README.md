# youtube party dj

play a youtube queue on one device and other devices can add songs to the queue, as well as vote on songs. highest voted song plays next. wip.

Made with [UIX](https://uix.unyt.org/).

## demo

short demo video (left player, right a client)


https://github.com/flo-bit/youtube-party-dj/assets/45694132/ac43fc09-d47f-4611-9991-0aa098f1105a


## development

1. clone the repository

```bash
git clone https://github.com/flo-bit/youtube-party-dj.git
```

2. install [deno](https://docs.deno.com/runtime/manual/getting_started/installation)

3. install uix

```bash
deno install --import-map https://cdn.unyt.org/uix/importmap.json -Aq -n uix https://cdn.unyt.org/uix/run.ts
```

4. install [node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) if you haven't already

5. install node modules, run this in the root directory of the project:

```bash
npm install
```

6. run development server, run this in the root directory of the project:

```bash
npm run dev
```

7. open the browser and navigate to `http://localhost`

## license

mit