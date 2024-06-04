import QRCodeStyling from "https://esm.sh/qr-code-styling@1.6.0-rc.1"

export default function QRCode() {
  const qrCode = new QRCodeStyling({
    width: 256,
    height: 256,
    data: "google.com"
  })

  setTimeout(() => {
    const target = document.getElementById("qr-code-target")
    console.log(target)
    // if target is empty, append it
    if (target?.children.length === 0) {
      qrCode.append(document.getElementById("qr-code-target"))
    }
  }, 0)
 return (
    <div class="aspect-square w-3/4 md:w-full bg-white/5 border border-white/10 rounded-xl z-10">
      <div id="qr-code-target" class="w-full h-full flex items-center justify-center text-white">
      </div>
    </div>);
}
