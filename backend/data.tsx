import { Innertube } from "https://deno.land/x/youtubei@v10.0.0-deno/deno.ts";

const youtube = await Innertube.create();

export async function search(q: string) {
  try {

    const result = await youtube.search(q, {type: 'video', sort_by: 'relevance'})

    // filter out videos without duration (live?), then get first 10 videos
    // @ts-ignore - no type for duration
    const videos = result.videos.filter((item) => item.duration?.seconds).slice(0, 10);

    return videos.map((item) => {
      return {
        title: item.title.text ?? 'Untitled',
        // @ts-ignore - no type for thumbnails
        thumbnail: item.thumbnails?.[0].url,
        // @ts-ignore - no type for id
        id: item.id,
        likes: $$(new Set<string>()),
        added: Date.now(),
        // @ts-ignore - no type for duration
        duration: item.duration?.text ?? '-',
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

// effect(() => {
//   // sort by likes, then by time added
//   sampleQueue.sort((a, b) => {
//     if (a.likes > b.likes) return -1;
//     if (a.likes < b.likes) return 1;
//     if (a.added > b.added) return 1;
//     if (a.added < b.added) return -1;
//     return 0;
//   });
// });


//yt api puts duration in format P{days}T{{hours}H}{minutes}M{seconds}S. converts this format to int seconds just in case its needed for more than the search
//function getDurationFromStr(strIn: string){
//  	let durationStrings = strIn.split(/PT|P|T|H|M|S/);
//	let durInSecs = 0;
//	//split returns more chars than just the numbers; backwards to handle that P{nDays}T{{nHours}H} thing
//	assert(durationStrings.length < 8);
//	for (let i = durationStrings.length-2; i > 0; i--){
//   	if (durationStrings.length == 6 && i == 1){  //longer than a day?
//        	durInSecs += Number(durationStrings[i])* 24*3600;
//    	}else{										 //hours 60**2 s, minutes 60 s, seconds 60**0 (=1)s
//       		durInSecs += Number(durationStrings[i])*(60**(durationStrings.length-2-i));
//    	}
//  }
//	assert(durInSecs > 0);
//
//	return durInSecs;
//}

//open new request to video api. Search supports search queries, video only ids etc.
//async function addInfo(items: array){
//	for (let i = 0; i < items.length; i++){
//		try{
//		  //channel does not have video id and sometimes shows up in search results
//			if (typeof items[i].id == 'undefined'){	
//				continue;
//			}
//		  //for more: https://developers.google.com/youtube/v3/docs/videos
//	  		const secondResp = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${items[i].id}&key=${key}`);
//			const secondJson = await secondResp.json();
//		  //all selected categories are in one(1) list entry within items! => [...].items[0].[...]
//			items[i].views =  secondJson.items[0].statistics.viewCount;
//		  //search view wants mm:ss string
//			let durSecs = getDurationFromStr(secondJson.items[0].contentDetails.duration);
//			items[i].duration = String((durSecs-(durSecs%60)) / 60) + ':'+ String(durSecs%60);
//		}catch(error){
//			console.error(errror);
//			continue;
//		}
//	}
//    return items;
//}
