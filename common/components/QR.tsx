import { Pointer } from "unyt_core/runtime/pointers.ts";

export default function QRCode({ code }: { code: Pointer<string> & string}) {
  const qrCode = always(() => {
    if (code == "XXXX") {
      const text = "Loading QR Code ";
      const loadingText = $$(text);

      let i = 0;
      setInterval(() => {
        loadingText.val += ".";
        if (i < 3) {
          i++;
        } else {
          i = 0;
          loadingText.val = text;
        }
      }, 500);

      return <span style={{color: "black"}}>{loadingText}</span>;
    } else {
      const qrCodeSrc = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent([new URL(window.location.href).origin, "/client/", code].join(""))}&format=svg`
  
      return <img class="w-full h-full" src={qrCodeSrc} alt="QR code" />;
    }
  });

  return (
    <div class="aspect-square w-3/4 md:w-full border border-white/10 rounded-xl z-10 overflow-hidden bg-white p-4">
      <div class="w-full h-full flex items-center justify-center text-white">
        {qrCode}
      </div>
    </div>
  );
}