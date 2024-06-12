export default function QRCode({ code }: { code: string }) {
  const qrCodeSrc = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent([new URL(window.location.href).origin, "/client/", code].join(""))}&format=svg`

  return (
    <div class="aspect-square w-3/4 md:w-full border border-white/10 rounded-xl z-10 overflow-hidden bg-white p-4">
      <div id="qr-code-target" class="w-full h-full flex items-center justify-center text-white">
        <img class="w-full h-full" src={qrCodeSrc} alt="QR code" />
      </div>
    </div>
  );
}

