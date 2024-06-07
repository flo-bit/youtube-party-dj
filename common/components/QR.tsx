import QRCodeStyling from "https://esm.sh/qr-code-styling@1.6.0-rc.1"

export default function QRCode({code}: {code: string}) {
	const qrCodeBlob = $$("");

	const generateQRCode = async () => {
	
		const qrCode = new QRCodeStyling({
			data: [new URL(window.location.href).origin, "/client/", code].join(""),
			type: "svg",
		});
	
		const blob = await qrCode.getRawData("svg");
		if (!blob) {
			return;
		}
		qrCodeBlob.val = URL.createObjectURL(new Blob([blob], {type: "image/svg+xml"}));
	}

	effect(() => {
		generateQRCode();
	});

 return (
    <div class="aspect-square w-3/4 md:w-full bg-white/5 border border-white/10 rounded-xl z-10">
      <div class="w-full h-full flex items-center justify-center text-white rounded-xl overflow-hidden">
				<img class="w-full h-full" src={qrCodeBlob} alt={code} />
			</div>
    </div>);
}