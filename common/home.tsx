export default function App() {
  return (
    <main class="w-screen h-screen relative text-white bg-gray-950">
      <div class="absolute w-full bg-[#1f1f26] py-8 px-12">
        <img src="./rsc/logo_white.svg" alt="Logo" class="h-12"></img>
      </div>
      <div class="w-full h-full md:flex md:flex-row pt-32">
        <div class="md:h-full w-full md:w-1/2 flex flex-col place-content-center place-items-center gap-6 p-12">
          <h1
            class="w-full font-semibold text-rose-200 leading-tight"
            style="font-size: 3em;"
          >
            Like YouTube<br></br>but
            <span class="text-rose-500 font-bold"> with friends.</span>
          </h1>
          <div class="w-full">
            <p class="max-w-[34rem] text-rose-200 text-lg">
              Take the hassle out of starting a watch party. Just let your
              friends vote for the next song and have your party run on
              autopilot.
            </p>
          </div>
          <div class="min-w-full">
            <a href="/player" rel="noopener noreferrer">
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
            </a>
          </div>
        </div>
        <div class="md:h-full w-full md:w-1/2 flex items-center justify-center pt-12 md:pt-0">
          <div class="absolute w-80 h-80 bg-rose-300 rounded-full z-[-5]"></div>
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
