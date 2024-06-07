export type Item = {
    title: string;
    thumbnail: string;
    duration: string;
    id: string;
    likes: number;
    liked?: boolean;
    added: number;
}

export const sampleQueue: Item[] = $$([
    {
        title: 'Welcome to the Internet - Bo Burnham (from "Inside" -- ALBUM OUT NOW)',
        thumbnail: 'https://i.ytimg.com/vi/k1BneeJTDcU/default.jpg',
        duration: '4:20',
        likes: 0,
        id: 'k1BneeJTDcU',
        added: Date.now()
    },
    {
        title: 'Rick Astley - Never Gonna Give You Up (Video)',
        thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg',
        duration: '3:33',
        likes: 0,
        id: 'dQw4w9WgXcQ',
        added: Date.now() + 100
    },
    {
        title: 'LCD Soundsystem - New York, I Love You But You\'re Bringing Me Down',
        thumbnail: 'https://i.ytimg.com/vi/-eohHwsplvY/default.jpg',
        duration: '2:57',
        likes: 0,
        id: '-eohHwsplvY',
        added: Date.now() + 200
    },
]);

effect(() => {
    // sort by likes, then by time added
    sampleQueue.sort((a, b) => {
        if (a.likes > b.likes) return -1;
        if (a.likes < b.likes) return 1;
        if (a.added > b.added) return 1;
        if (a.added < b.added) return -1;
        return 0;
    });
})