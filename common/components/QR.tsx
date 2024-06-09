export default function QRCode({ url }) {
  const qrCodeSrc = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}&format=svg`

  return (
    <div className="aspect-square w-3/4 md:w-full bg-white/5 border border-white/10 rounded-xl z-10">
      <div id="qr-code-target" className="w-full h-full flex items-center justify-center text-white">
        <img className="w-full h-full" src={qrCodeSrc} alt="QR code" />
      </div>
    </div>
  );
}

