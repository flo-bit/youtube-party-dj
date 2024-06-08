import QRCodeStyling from "https://esm.sh/qr-code-styling@1.6.0-rc.1"

export default function QRCode({code}: {code: string}) {
	const qrCodeBlob = $$(URL.createObjectURL(new Blob(['<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>'], {type: "image/svg+xml"})));

	const generateQRCode = async () => {
	
		const qrCode = new QRCodeStyling({
			data: [new URL(window.location.href).origin, "/client/", code].join("")
		});
	
		const blob = await qrCode.getRawData("svg");
		if (!blob) {
			return;
		}
		qrCodeBlob.val = URL.createObjectURL(new Blob([blob], {type: "image/svg+xml"}));
	}

	effect(() => {
		console.log("new code", code)
		generateQRCode();
	});

 return (
    <div class="aspect-square w-3/4 md:w-full flex items-center justify-center">
      <div class="aspect-square h-full text-white bg-white/5 border border-white/10 rounded-xl z-10 overflow-hidden">
				<img class="h-full" src={qrCodeBlob} alt={code} />
			</div>
    </div>
	);
}