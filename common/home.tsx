export default function App() {

  return (
    <div class="bg-white dark:bg-gray-950 min-h-screen">
      <img class="absolute top-6 left-6 lg:top-8 lg:left-8 h-8 w-auto" src="./rsc/logo.svg" alt="" />

      <div class="relative isolate">
        <div class="mx-auto max-w-7xl px-6 py-24 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
          <div class="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">

            <h1 class="mt-10 max-w-lg text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-gray-50">Like Youtube but with friends</h1>
            <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">Take the hassle out of starting a watch party. Just let your friends vote for the next song and have your party run on autopilot.</p>
            <div class="mt-10 flex items-center gap-x-6">
              <a href="/player" class="rounded-md bg-accent-600 dark:bg-accent-500 dark:hover:bg-accent-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600">Start new party</a>
              <a href="/welcome" class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50">Join party <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div class="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
            <svg viewBox="0 0 366 729" role="img" class="mx-auto w-[22.875rem] max-w-full drop-shadow-xl">
              <title>App screenshot</title>
              <path fill="#4B5563" d="M363.315 64.213C363.315 22.99 341.312 1 300.092 1H66.751C25.53 1 3.528 22.99 3.528 64.213v44.68l-.857.143A2 2 0 0 0 1 111.009v24.611a2 2 0 0 0 1.671 1.973l.95.158a2.26 2.26 0 0 1-.093.236v26.173c.212.1.398.296.541.643l-1.398.233A2 2 0 0 0 1 167.009v47.611a2 2 0 0 0 1.671 1.973l1.368.228c-.139.319-.314.533-.511.653v16.637c.221.104.414.313.56.689l-1.417.236A2 2 0 0 0 1 237.009v47.611a2 2 0 0 0 1.671 1.973l1.347.225c-.135.294-.302.493-.49.607v377.681c0 41.213 22 63.208 63.223 63.208h95.074c.947-.504 2.717-.843 4.745-.843l.141.001h.194l.086-.001 33.704.005c1.849.043 3.442.37 4.323.838h95.074c41.222 0 63.223-21.999 63.223-63.212v-394.63c-.259-.275-.48-.796-.63-1.47l-.011-.133 1.655-.276A2 2 0 0 0 366 266.62v-77.611a2 2 0 0 0-1.671-1.973l-1.712-.285c.148-.839.396-1.491.698-1.811V64.213Z" />
              <path fill="#343E4E" d="M16 59c0-23.748 19.252-43 43-43h246c23.748 0 43 19.252 43 43v615c0 23.196-18.804 42-42 42H58c-23.196 0-42-18.804-42-42V59Z" />
              <foreignObject class="w-[316px] h-[684px] translate-x-[24px] translate-y-[24px] rounded-[36px]">
                <img src="https://play-lh.googleusercontent.com/bI-pgtsjIayXCf_MwFghKtzytEwXyu9_-41TtbtzHavQOXU3CxAwGQCreZ_V_Co8Y3OB=w5120-h2880-rw" alt="" class="h-full w-full" />
              </foreignObject>
            </svg>
          </div>
        </div>
      </div>
    </div>)

}
