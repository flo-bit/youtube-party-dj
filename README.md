# Youtube Party DJ

Play a youtube queue on one device and other devices can add songs to the queue, as well as vote on songs. Highest voted song plays next. WIP.

## demo

short demo video (left player, right a client)


https://github.com/flo-bit/youtube-party-dj/assets/45694132/ac43fc09-d47f-4611-9991-0aa098f1105a


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

6. Get a youtube api key and add a `.env` file in the root directory of the project with the following content:

```env
YOUTUBE_API_KEY=<your api key>
```

7. Run development server, run this in the root directory of the project:

```bash
npm run dev
```

8. Open the browser and navigate to `http://localhost`
