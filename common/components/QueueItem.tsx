import { ObjectRef } from "unyt_core/runtime/pointers.ts";
import { QueueType } from "./Queue.tsx";
import { getSessionWithCode, getUserId, Item, toggleLike} from "backend/sessions.ts";

export async function QueueItem({
  item,
  type,
  code
}: Readonly<{ item: ObjectRef<Item>; type: QueueType; code: string }>) {
  const userId = (await getUserId()).userId;

  const minutes = Math.floor(item.duration / 60).toString();
  const seconds = item.duration % 60;
  let printseconds = seconds.toString();
  if(seconds < 10) printseconds = "0"+seconds.toString(); 
  const duration = minutes + ":" + printseconds;


  async function renderIcon() {
    const session = await getSessionWithCode(code);
    if (!session) return null;

    if (session.queue.some((v) => v.id == item.id) || session.currentlyPlaying?.id == item.id) {
      return (
        <div class="text-black dark:text-green-500 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            class="size-6 items-center justify-center"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 12l5 5L20 7"
            />
          </svg>
        </div>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          class="size-6 dark:stroke-white stroke-black queueicon2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      );
    }
  }
  async function handleButtonClick() {
    const session = await getSessionWithCode(code);
    if (!session) {
      return;
    }
    const button = document.getElementById(`button-${item.id}`);
    if (button) {
      button.innerHTML = `
        <div class="text-black dark:text-green-500 flex items-center justify-center">
          <svg viewBox="0 0 24 24" class="size-6 items-center justify-center">
            <path
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 12l5 5L20 7"
            />
          </svg>
        </div>
      `;
    }
  }

  function getAction() {
    if (type === "player") {
      return (
        <>
          <div class="font-semibold">{always(() => item.likes.val.size)}</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6 ml-1"
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
        </>
      );
    } else if (type === "client") {
      return (
        <button
          onclick={() => {
            toggleLike(code, item.id);
          }}
        >
          {always(() => {
            if (item.likes.val.has(userId))
              return (
                <div class="text-accent-500 fill-accent-500 stroke-accent-500 flex">
                  <div class="font-semibold">{item.likes.val.size}</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6 ml-1 bounce-animation"
                  >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
                </div>
              );
            else
              return (
                <div class="flex">
                  <div class="font-semibold">{item.likes.val.size}</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    class="size-6 ml-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </div>
              );
          })}
        </button>
      );
    } else if (type === "search") {
      return (
        <button
          onclick= {async () => {
            handleButtonClick();
            const session = await getSessionWithCode(code);
            if (!session) { // check if session is null
              return;
            }

            if ((session.queue.some((v) => v.id == item.id) || session.currentlyPlaying?.id == item.id) ) {
              //addLike(code, item.id);
              return;
            }
            session?.$.queue.val.push(item);
            toggleLike(code, item.id);
          }}
          id={`button-${item.id}`}
          class="queueframe bg-white dark:bg-white/5 border border-black dark:border-white/10 rounded-full w-10 h-10 flex items-center justify-center"
        >
          {await renderIcon()}
        </button>
      );
    }
  }

  return (
    <div class="queueframe w-full rounded-xl bg-white dark:bg-white/5 border border-black dark:border-white/10 h-20 overflow-hidden mb-2">
      <div class="queueitem text-black dark:text-white flex items-left h-full">
        <img src={item.thumbnail} class="h-20 w-32 object-cover" alt=" " />
        <div class="flex flex-1 flex-grow justify-between">
          <div class="pl-4 justify-center flex flex-col h-full">
            <p class="line-clamp-2 font-bold text-md leading-6">{item.title}</p>
            <p class="text-xs">{duration} minutes</p>
            <p class="text-xs">{item.type}</p>
          </div>
          <div class="queueicon2 flex h-full justify-center items-center stroke-black dark:stroke-white px-2">
            {getAction()}
            
          </div>
        </div>
      </div>
    </div>
  );
}