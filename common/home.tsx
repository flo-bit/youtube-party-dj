export default function App() {
  return (
    <main class="w-screen h-screen relative text-white">
      <div
        class="absolute w-full"
        style="padding: 20px 48px; background: #3d3b47;"
      >
        <img src="./rsc/logo_white.svg" alt="Logo" style="height: 48px;"></img>
      </div>
      <div class="w-full h-full md:flex md:flex-row">
        <div class="md:h-full w-full md:w-1/2 lg:w-2/3 flex flex-col place-content-center place-items-center gap-6 p-12">
          <h1
            class="w-full font-semibold text-rose-200 leading-tight"
            style="font-size: 3em;"
          >
            Like YouTube<br></br>but
            <span class="text-rose-500 font-bold"> with friends.</span>
          </h1>
          <p class="w-full text-rose-200 text-lg">
            Take the hassle out of starting a watch party. Just let your friends
            vote for the next song and have your party run on autopilot.
          </p>
          <div class="min-w-full">
            <button class="bg-rose-500 hover:bg-rose-600 w-fit text-white font-medium gap-2 rounded-full font-lg py-3 px-6 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                  clip-rule="evenodd"
                />
              </svg>
              Get started
            </button>
          </div>
        </div>
        <div class="md:h-full w-full md:w-1/2 lg:w-1/3 flex items-center justify-center">
          <div
            class="absolute w-80 h-80 bg-rose-300 rounded-full"
            style="z-index: -5"
          ></div>
          <img
            class="w-56 border-4 border-rose-500 rounded-lg flex justify-center rotate-6"
            /* TO-DO: Change mockup once final client user interface is ready */
            src="https://play-lh.googleusercontent.com/bI-pgtsjIayXCf_MwFghKtzytEwXyu9_-41TtbtzHavQOXU3CxAwGQCreZ_V_Co8Y3OB=w5120-h2880-rw"
            alt="Screenshot of YouTube Party DJ"
          ></img>
        </div>
      </div>
    </main>
  );
}
