import Image from "next/image";

export default function SponsoredPost() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        <Image
          src="https://storage.googleapis.com/a1aa/image/nf6UeGftOILhiJXiH77CJ08HcSYeRgCqDwdvXubSlK45wwuPB.jpg"
          alt="JetBrains Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="font-semibold">
            JetBrains <span className="text-gray-500">Sponsored</span>
          </p>
        </div>
      </div>
      <p className="mt-2 font-semibold">Level up your code with IntelliJ IDEA.</p>
      <p className="mt-2 text-gray-700">
        An IDE built for professional development. Make developing enjoyable!
      </p>
      <Image
        src="https://storage.googleapis.com/a1aa/image/exCjfUBHJtlT7UHwHckXtk7Xdv5Fjxz8f8TfPTLBFP1DxwuPB.jpg"
        alt="IntelliJ IDEA JetBrains IDE"
        width={600}
        height={200}
        className="mt-2 rounded-lg"
      />
    </div>
  );
}
