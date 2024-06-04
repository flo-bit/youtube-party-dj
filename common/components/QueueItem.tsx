import { Component } from "uix/components/Component.ts";


type Item = {
    title: string;
    thumbnail: string;
    duration: string;
    url : string;
    likes: number;
}

@template<Item>((item) => {     
 
  return <>
    <img src={item.thumbnail} alt=" " style={"display:inline"} />
    <p>{item.title} </p>
    <p>{item.duration} minutes</p>
    </>
})

export class  QueueItem extends Component<Item>{};

