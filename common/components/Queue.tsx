import { Component } from "uix/components/Component.ts"; 
import {QueueItem} from "./QueueItem.tsx";

type Item = {
    title: string;
    thumbnail: string;
    duration: string;
    url : string;
    likes: number;
  }


type QueueElement = {
    items: Item[],
    type: 'player' | 'client'
}


@template<QueueElement>((queue) => {
  
  const items = $$(queue.items);
  
  const isPlayer = $$(false);
  if(queue.type == 'player') isPlayer.val = true;
  const isClient = $$(false);
  if(queue.type == 'client') isClient.val = true;
  

  return <div class="space-y-4">{    
    items.$.map((item) => {

      const hasLiked = $$(false);
  
      hasLiked.observe((checked)=>{
        if (checked) { item.$.likes.val++; } 
        else { item.$.likes.val--; }
      })
        
      return <div class="w-full rounded-xl bg-white/5 border border-white/10 h-20">
		<div class="text-white flex items-center justify-center h-full">
			<QueueItem {...item.$}></QueueItem> 
	  		{
				toggle(isClient,<>
				<input type="checkbox" id="liked" disabled={isPlayer} checked={hasLiked}/>
				<label for="liked">{item.$.likes}</label>
				</>)
			}
			{
				toggle(isPlayer,<>{item.$.likes}</>)
			}

      	</div>   
	  </div> 
      })}
    </div>
    
})
export class Queue extends Component<QueueElement>{};