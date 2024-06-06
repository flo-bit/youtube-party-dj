
export default function QRCode({url}) {
	if(!url){
		url="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
	}
		const src="https://api.qrserver.com/v1/create-qr-code/?data="+url+"&amp;size=250x250&format=svg&color=13-13-13";
	
	return (	
<div class="aspect-square w-3/4 md:w-full bg-white/5 border border-white/10 rounded-xl z-10">
	
	<div class="w-full h-full flex items-center justify-center text-white">
		<img class=" lg:object-scale-down" src={src} alt="" title="" />
	</div>
</div>);
}